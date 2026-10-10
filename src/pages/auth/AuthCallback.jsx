import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

// Google OAuth lands here; the Supabase client reads the session from the URL.
export default function AuthCallback() {
  const { user, profile, role, loading, isNewUser } = useAuth();
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search + window.location.hash.replace("#", "&"));
  const oauthError = params.get("error_description") || params.get("error");

  useEffect(() => {
    if (oauthError) toast.error(oauthError);
  }, [oauthError]);

  useEffect(() => {
    if (loading || !user) return;
    if (isNewUser) navigate("/onboarding", { replace: true });
    else navigate(role === "employer" ? "/employer" : "/dashboard", { replace: true });
  }, [loading, user, profile, role, isNewUser, navigate]);

  if (oauthError || (!loading && !user)) return <Navigate to="/login" replace />;

  return (
    <div className="container-x flex min-h-[50vh] items-center justify-center py-20">
      <p className="text-lg text-muted">Signing you in…</p>
    </div>
  );
}
