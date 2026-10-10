import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LocaleProvider } from "./i18n/LocaleContext";
import { AuthProvider } from "./context/AuthContext";
import AppShell from "./components/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import Home from "./pages/public/Home";
import Jobs from "./pages/public/Jobs";
import JobDetails from "./pages/public/JobDetails";
import Internships from "./pages/public/Internships";
import {
  About,
  Contact,
  Privacy,
  Terms,
  Pricing,
  Companies,
  CareerAdvice,
  ArticleDetail,
} from "./pages/public/StaticPages";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Onboarding from "./pages/auth/Onboarding";

import Dashboard from "./pages/seeker/Dashboard";
import Profile from "./pages/seeker/Profile";
import Applications from "./pages/seeker/Applications";
import SavedJobs from "./pages/seeker/SavedJobs";
import Settings from "./pages/seeker/Settings";

import EmployerDashboard from "./pages/employer/EmployerDashboard";
import CompanyProfile from "./pages/employer/CompanyProfile";
import JobsList from "./pages/employer/JobsList";
import JobForm from "./pages/employer/JobForm";
import JobApplications from "./pages/employer/JobApplications";

import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/career-advice" element={<CareerAdvice />} />
              <Route path="/career-advice/:slug" element={<ArticleDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />

              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["seeker"]}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute allowedRoles={["seeker"]}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/applications"
                  element={
                    <ProtectedRoute allowedRoles={["seeker"]}>
                      <Applications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/saved-jobs"
                  element={
                    <ProtectedRoute allowedRoles={["seeker"]}>
                      <SavedJobs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/employer"
                  element={
                    <ProtectedRoute allowedRoles={["employer"]}>
                      <EmployerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/company"
                  element={
                    <ProtectedRoute allowedRoles={["employer"]}>
                      <CompanyProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs"
                  element={
                    <ProtectedRoute allowedRoles={["employer"]}>
                      <JobsList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs/new"
                  element={
                    <ProtectedRoute allowedRoles={["employer"]}>
                      <JobForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs/:jobId/edit"
                  element={
                    <ProtectedRoute allowedRoles={["employer"]}>
                      <JobForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs/:jobId/applications"
                  element={
                    <ProtectedRoute allowedRoles={["employer"]}>
                      <JobApplications />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LocaleProvider>
  );
}
