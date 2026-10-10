import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="bg-linear-to-r from-primary to-accent bg-clip-text font-display text-8xl font-extrabold text-transparent sm:text-9xl">
        404
      </p>
      <h1 className="mt-6 text-3xl font-extrabold text-text">Page not found</h1>
      <p className="mt-3 max-w-md text-lg text-muted">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-secondary btn-lg">
          <ArrowLeft className="h-4 w-4" /> Go home
        </Link>
        <Link to="/jobs" className="btn btn-primary btn-lg">
          <Search className="h-4 w-4" /> Browse jobs
        </Link>
      </div>
    </div>
  );
}
