import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";

export default function AppShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
