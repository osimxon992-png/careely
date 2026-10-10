import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/AuthLayout";
import GoogleButton from "../../components/GoogleButton";

export default function Login() {
  const { signIn, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn({ email, password });
      toast.success("Welcome back!");
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch (err) {
      toast.error(err.message || "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome back" sub="Log in to your Careerly account.">
      {!isConfigured && (
        <p className="notice-warning mb-6">
          Supabase is not configured yet. Authentication is disabled in demo mode.
          See README for setup instructions.
        </p>
      )}

      <GoogleButton />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label" htmlFor="login-email">Email</label>
          <input
            id="login-email"
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
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-semibold text-text" htmlFor="login-password">Password</label>
            <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" disabled={loading || !isConfigured} className="btn btn-primary btn-lg w-full">
          {loading ? "Signing in…" : "Log In"}
        </button>
      </form>

      <p className="mt-8 text-center text-muted">
        Don't have an account?{" "}
        <Link to="/signup" className="link">Create one</Link>
      </p>
    </AuthLayout>
  );
}
