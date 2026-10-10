import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserRound, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/AuthLayout";
import GoogleButton from "../../components/GoogleButton";

const ROLES = [
  ["seeker", "Job Seeker", "I'm looking for a job", UserRound],
  ["employer", "Employer", "I want to hire", Building2],
];

export default function Signup() {
  const { signUp, isConfigured } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp({ email, password, role });
      toast.success("Account created! Check your email to verify your address.");
      navigate("/onboarding");
    } catch (err) {
      toast.error(err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Create your account" sub="It takes less than a minute.">
      {!isConfigured && (
        <p className="notice-warning mb-6">
          Supabase is not configured yet. Sign-up is disabled in demo mode. See
          README for setup instructions.
        </p>
      )}

      <div className="mb-6">
        <p className="label">I am a…</p>
        <div className="grid grid-cols-2 gap-3">
          {ROLES.map(([value, label, hint, Icon]) => (
            <button
              type="button"
              key={value}
              onClick={() => setRole(value)}
              aria-pressed={role === value}
              className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition ${
                role === value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-slate-300"
              }`}
            >
              <Icon className={`h-6 w-6 ${role === value ? "text-primary" : "text-slate-400"}`} />
              <span className="font-bold text-text">{label}</span>
              <span className="text-xs text-muted">{hint}</span>
            </button>
          ))}
        </div>
      </div>

      <GoogleButton role={role} label="Sign up with Google" />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label" htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" disabled={loading || !isConfigured} className="btn btn-primary btn-lg w-full">
          {loading ? "Creating account…" : "Sign Up"}
        </button>
        <p className="text-center text-xs text-muted">
          By signing up you agree to our{" "}
          <Link to="/terms" className="underline">Terms</Link> and{" "}
          <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </form>

      <p className="mt-8 text-center text-muted">
        Already have an account? <Link to="/login" className="link">Log in</Link>
      </p>
    </AuthLayout>
  );
}
