import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useLocale } from "../../i18n/LocaleContext";
import LanguageSwitcher from "../../components/LanguageSwitcher";

export default function Settings() {
  const { signOut, user } = useAuth();
  const { t } = useLocale();

  return (
    <div className="max-w-4xl">
      <h1 className="page-title">Settings</h1>

      <div className="mt-6 card p-6">
        <p className="text-sm font-semibold text-text">Account email</p>
        <p className="mt-1 text-sm text-muted">{user?.email}</p>
      </div>

      <div className="mt-4 card p-6">
        <p className="mb-2 text-sm font-semibold text-text">Language</p>
        <LanguageSwitcher />
      </div>

      <div className="mt-4 card p-6">
        <p className="mb-2 text-sm font-semibold text-text">Account actions</p>
        <button
          onClick={signOut}
          className="btn btn-secondary"
        >
          Sign out
        </button>
        <button
          onClick={() => toast("Account deletion requires confirmation via support for now.")}
          className="ml-2 btn btn-danger"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}
