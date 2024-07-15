//// Page imports
// Home
import HomePage from "./pages/home/HomePage";
import HomeGuest from "./pages/home/HomeGuest";

// Auth
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";

// Forum
import Forum from "./pages/forum/Forum";
import PostDetail from "./pages/forum/PostDetail";
import EditPost from "./pages/forum/EditPost";
import AddPost from "./pages/forum/AddPost";
import ManageCategories from "./pages/forum/ManageCategories";

// Jobs
import Market from "./pages/jobs/Market";
import Jobs from "./pages/home/Jobs";
import EnlistJob from "./pages/jobs/EnlistJob";
import JobDetail from "./pages/jobs/JobDetail";
import MyJobs from "./pages/jobs/MyJobs";
import EditJob from "./pages/jobs/EditJob";
import ConfirmJob from "./pages/jobs/ConfirmJob";
import ApplyJob from "./pages/jobs/ApplyJob";
import ActiveJob from "./pages/jobs/ActiveJob";
import CreatedJobDetail from "./pages/jobs/CreatedJobDetail";
import AppliedJobDetail from "./pages/jobs/AppliedJobDetail";

// Technical
import PageNotFound from "./pages/technical/PageNotFound";
import Dashboard from "./pages/home/Dashboard";

// Users
import Security from "./pages/profile/Security";
import EditProfile from "./pages/profile/EditProfile";
import WorkExperience from "./pages/profile/WorkExperience";
import Profile from "./pages/profile/Profile";

// Components
import HomeFooter from "./components/HomeFooter";
// import HomeNavbar from "./components/HomeNavbar";
import AppNavbar from "./components/Navbar";

// Misc
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import React from "react";

// import ErrorPage from "./pages/error/ErrorPage";
import CreateTicketPage from "./pages/user/CreateTicket";
import {AuthProvider} from "./context/AuthContext";
import PaymentPortal from "./pages/payment/PaymentPortal";
import {ForumProvider} from "./context/ForumContext";
import UserInformationProvider from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
          <UserInformationProvider>
    <AuthProvider className="page">
      <ForumProvider>
            <AppNavbar className="mb-auto" />
            <div className="min-vh-100 mt-5">
              <Routes>
                {/* AUTH ROUTES */}
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/reset-password" element={<ResetPassword />} />

                {/* HOME ROUTES */}
                <Route exact path="/" element={<HomeGuest />} />
                <Route exact path="/home" element={<HomePage />} />

                {/* FORUM ROUTES */}
                <Route exact path="/forum" element={<Forum />} />
                <Route exact path="/posts/:id" element={<PostDetail />} />
                <Route exact path="/forum/add" element={<AddPost />} />
                <Route exact path="/forum/edit/:id" element={<EditPost />} />
                <Route exact path="/forum/categories" element={<ManageCategories />} />

                {/* JOBS ROUTES */}
                <Route exact path="/market" element={<Market />} />
                <Route exact path="/jobs" element={<Jobs />} />
                <Route exact path="/jobs/:id" element={<JobDetail />} />
                <Route exact path="/jobs/add" element={<EnlistJob />} />
                <Route exact path="/myjobs" element={<MyJobs />} />
                <Route exact path="/jobs/edit/:id" element={<EditJob />} />
                <Route exact path="/confirm-job" element={<ConfirmJob />} />
                <Route exact path="/apply/:job_id" element={<ApplyJob />} />
                <Route exact path="/active-job" element={<ActiveJob />} />
                <Route
                  exact
                  path="/created-job-details/:job_id"
                  element={<CreatedJobDetail />}
                />
                <Route
                  exact
                  path="/applied-job-details/:job_id"
                  element={<AppliedJobDetail />}
                />

                {/* PAYMENT ROUTES */}
                <Route exact path="/payment" element={<PaymentPortal />} />

            {/* USERS ROUTES */}
            <Route exact path="/editprofile/:userId" element={<EditProfile />} />
            <Route exact path="/profile/:userId" element={<Profile />} />
            <Route exact path="/workexperience/:userId" element={<WorkExperience />} />
            <Route exact path="/security" element={<Security />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/settings" element={<Setting />} />
            <Route exact path="/ticket" element={<CreateTicketPage />} />

                {/* TECHNICAL ROUTES */}
                <Route exact path="*" element={<PageNotFound />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
            <HomeFooter />
      </ForumProvider>
    </AuthProvider>
          </UserInformationProvider>
        </BrowserRouter>
  );
}

export default App;
export const API_URL = "http://localhost:8000/api";
export const SOCKET_URL = "http://localhost:8000/";
