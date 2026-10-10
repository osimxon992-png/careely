import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MailCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/AuthLayout";

export default function ForgotPassword() {
  const { sendPasswordReset, isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (err) {
      toast.error(err.message || "Could not send reset email.");
    }
  }

  return (
    <AuthLayout title="Reset your password" sub="We'll email you a link to set a new password.">
      {sent ? (
        <div className="rounded-2xl bg-emerald-50 p-6 text-emerald-800">
          <MailCheck className="h-8 w-8" />
          <p className="mt-3 font-semibold">
            If an account exists for that email, a reset link has been sent.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label" htmlFor="reset-email">Email</label>
            <input
              id="reset-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input"
            />
          </div>
          <button disabled={!isConfigured} className="btn btn-primary btn-lg w-full">
            Send reset link
          </button>
        </form>
      )}
      <p className="mt-8 text-center text-muted">
        <Link to="/login" className="link">Back to log in</Link>
      </p>
    </AuthLayout>
  );
}
