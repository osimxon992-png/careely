import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Careerly] Supabase is not configured. Copy .env.example to .env and set " +
      "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. The app will run in demo mode " +
      "with no real authentication or data persistence until then."
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null;
