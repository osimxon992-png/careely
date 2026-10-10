import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

// Role picked on the sign-up page, kept across the Google OAuth redirect.
const PENDING_ROLE_KEY = "careerly:pending-role";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const pendingProfile = useRef(null);

  async function loadProfile(userId) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) return null;
    return data;
  }

  // OAuth sign-ups skip signUp(), so create their profile row on first login.
  async function ensureProfile(sessionUser) {
    const existing = await loadProfile(sessionUser.id);
    if (existing) return existing;

    let role = "seeker";
    try {
      const stored = localStorage.getItem(PENDING_ROLE_KEY);
      if (stored === "employer") role = "employer";
      localStorage.removeItem(PENDING_ROLE_KEY);
    } catch {
      // storage unavailable — fall back to seeker
    }

    const meta = sessionUser.user_metadata || {};
    const { error } = await supabase.from("profiles").insert({
      id: sessionUser.id,
      email: sessionUser.email,
      role,
      full_name: meta.full_name || meta.name || null,
    });
    if (!error) setIsNewUser(true);
    return loadProfile(sessionUser.id);
  }

  // getSession and onAuthStateChange both fire on login; share one lookup.
  function syncProfile(sessionUser) {
    if (pendingProfile.current?.id !== sessionUser.id) {
      const promise = ensureProfile(sessionUser).finally(() => {
        if (pendingProfile.current?.promise === promise) pendingProfile.current = null;
      });
      pendingProfile.current = { id: sessionUser.id, promise };
    }
    return pendingProfile.current.promise;
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) setProfile(await syncProfile(sessionUser));
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);
        // Defer Supabase calls out of the callback to avoid an auth-lock deadlock.
        setTimeout(async () => {
          setProfile(sessionUser ? await syncProfile(sessionUser) : null);
        }, 0);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signUp({ email, password, role }) {
    if (!supabase) throw new Error("Supabase is not configured.");
    // The auth listener may create the profile first; make it use this role too.
    try {
      localStorage.setItem(PENDING_ROLE_KEY, role || "seeker");
    } catch {
      // storage unavailable — the insert below still sets the role
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        role: role || "seeker",
      });
    }
    return data;
  }

  async function signIn({ email, password }) {
    if (!supabase) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async function signInWithGoogle({ role } = {}) {
    if (!supabase) throw new Error("Supabase is not configured.");
    try {
      if (role) localStorage.setItem(PENDING_ROLE_KEY, role);
      else localStorage.removeItem(PENDING_ROLE_KEY);
    } catch {
      // storage unavailable — new accounts default to seeker
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  async function sendPasswordReset(email) {
    if (!supabase) throw new Error("Supabase is not configured.");
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  const value = {
    user,
    profile,
    role: profile?.role ?? null,
    loading,
    isNewUser,
    isConfigured: isSupabaseConfigured,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    sendPasswordReset,
    refreshProfile: async () => {
      if (user) setProfile(await loadProfile(user.id));
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
