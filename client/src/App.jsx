//// Page imports
// Home
import HomeGuest from "./pages/home/HomeGuest";
import HomePage from "./pages/home/HomePage";
import HomeUser from "./pages/home/HomeUser";

// Auth
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";

// Forum
import AddPost from "./pages/forum/AddPost";
import EditPost from "./pages/forum/EditPost";
import Forum from "./pages/forum/Forum";
import ManageCategories from "./pages/forum/ManageCategories";
import PostDetail from "./pages/forum/PostDetail";

// Jobs
import ApplicationList from "./components/job/ApplicationList";
import Jobs from "./pages/home/Jobs";
import ActiveJob from "./pages/jobs/ActiveJob";
import AppliedJobDetail from "./pages/jobs/AppliedJobDetail";
import ApplyJob from "./pages/jobs/ApplyJob";
import ConfirmJob from "./pages/jobs/ConfirmJob";
import EditJob from "./pages/jobs/EditJob";
import EnlistJob from "./pages/jobs/EnlistJob";
import JobDetail from "./pages/jobs/JobDetail";
import Market from "./pages/jobs/Market";
import MyJobs from "./pages/jobs/MyJobs";

// Technical
import Dashboard from "./pages/home/Dashboard";
import PageNotFound from "./pages/technical/PageNotFound";

// Users

import Posts from "./pages/home/Posts";
import Users from "./pages/home/Users";
import EditEmployer from "./pages/profile/EditEmployer";
import EditProfile from "./pages/profile/EditProfile";
import Employer from "./pages/profile/Employer";
import Profile from "./pages/profile/Profile";
import WorkExperience from "./pages/profile/WorkExperience";
import Settings from "./pages/technical/Settings";

// Components
import HomeNavbar from "./components/home/HomeNavbar";
import HomeFooter from "./components/HomeFooter";

//Payment
import TransferMoney from "./pages/payment/TranferBalance";

// Misc
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// import ErrorPage from "./pages/error/ErrorPage";
import { AuthProvider } from "./context/AuthContext";
import { ForumProvider } from "./context/ForumContext";
import UserInformationProvider from "./context/UserContext";
import ActiveAccountPage from "./pages/auth/ActiveAccount";
import DrawBalacePage from "./pages/balance/drawBalance";
import ToLogin from "./pages/error/ToLogin";
import AdminFAQsPage from "./pages/faq/Adminfaqs";
import FaqPage from "./pages/faq/Faq";
import ForumInsights from "./pages/forum/Insights";
import JobHistory from "./pages/jobs/JobHistory";
import ContinuePayment from "./pages/payment/ContinuePayment";
import Deposit from "./pages/payment/Deposit";
import PaymentHistory from "./pages/payment/PaymentHistory";
import PaymentPortal from "./pages/payment/PaymentPortal";
import ReportPage from "./pages/report/report";
import CreateTicketPage from "./pages/user/CreateTicket";
function App() {
  return (
    <BrowserRouter>
      <UserInformationProvider>
        <AuthProvider className="page">
          <ForumProvider>
            {/* <AppNavbar className="mb-auto" /> */}
            <HomeNavbar />
            <div className="min-vh-100 mt-5">
              <Routes>
                {/* AUTH ROUTES */}
                <Route
                  exact
                  path="/login"
                  element={<Login />}
                />
                <Route
                  exact
                  path="/logout"
                  element={<Logout />}
                />
                <Route
                  exact
                  path="/register"
                  element={<Register />}
                />
                <Route
                  exact
                  path="/reset-password"
                  element={<ResetPassword />}
                />
                <Route
                  exact
                  path="/active-account"
                  element={<ActiveAccountPage />}
                />

                <Route
                  exact
                  path="/faq"
                  element={<FaqPage />}
                />

                <Route
                  exact
                  path="/admin-faqs"
                  element={<AdminFAQsPage />}
                />

                <Route
                  exact
                  path="/reports"
                  element={<ReportPage />}
                />
                <Route
                  exact
                  path="/draw-balance"
                  element={<DrawBalacePage />}
                />
                {/* HOME ROUTES */}
                <Route
                  exact
                  path="/"
                  element={<HomeGuest />}
                />
                <Route
                  exact
                  path="/home"
                  element={<HomePage />}
                />
                <Route
                  exact
                  path="/homeuser"
                  element={<HomeUser />}
                />
                {/* <Route
                  exact
                  path="/homeuser"
                  element={<HomeUser />}
                /> */}

                {/* FORUM ROUTES */}
                <Route
                  exact
                  path="/forum"
                  element={<Forum />}
                />
                <Route
                  exact
                  path="/forum/posts/:id"
                  element={<PostDetail />}
                />
                <Route
                  exact
                  path="/forum/add"
                  element={<AddPost />}
                />
                <Route
                  exact
                  path="/forum/edit/:id"
                  element={<EditPost />}
                />
                <Route
                  exact
                  path="/forum/categories"
                  element={<ManageCategories />}
                />
                <Route
                  exact
                  path="/forum/insights"
                  element={<ForumInsights />}
                />

                {/* JOBS ROUTES */}
                <Route
                  exact
                  path="/market"
                  element={<Market />}
                />
                <Route
                  exact
                  path="/jobs"
                  element={<Jobs />}
                />
                <Route
                  exact
                  path="/jobs/:id"
                  element={<JobDetail />}
                />
                <Route
                  exact
                  path="/jobs/add"
                  element={<EnlistJob />}
                />
                <Route
                  exact
                  path="/myjobs"
                  element={<MyJobs />}
                />
                <Route
                  exact
                  path="/myjobs/history"
                  element={<JobHistory />}
                />
                <Route
                  exact
                  path="/jobs/edit/:id"
                  element={<EditJob />}
                />
                <Route
                  exact
                  path="/confirm-job"
                  element={<ConfirmJob />}
                />
                <Route
                  exact
                  path="/apply/:job_id"
                  element={<ApplyJob />}
                />
                <Route
                  exact
                  path="/active-job"
                  element={<ActiveJob />}
                />
                <Route
                  exact
                  path="/applied-job-details/:job_id"
                  element={<AppliedJobDetail />}
                />
                <Route
                  exact
                  path="/myjobs/appliedlist"
                  element={<ApplicationList />}
                />

                {/* PAYMENT ROUTES */}
                <Route
                  exact
                  path="/payment"
                  element={<PaymentPortal />}
                />

                <Route
                  exact
                  path="/deposit"
                  element={<Deposit />}
                />

                <Route
                  exact
                  path="/continue-payment"
                  element={<ContinuePayment />}
                />

                <Route
                  exact
                  path="/payment-history"
                  element={<PaymentHistory />}
                />
                <Route
                  exact
                  path="/transfer"
                  element={<TransferMoney />}
                />

                {/* USERS ROUTES */}
                <Route
                  exact
                  path="/editprofile/:userId"
                  element={<EditProfile />}
                />
                <Route
                  exact
                  path="/profile/:userId"
                  element={<Profile />}
                />
                <Route
                  exact
                  path="/workexperience/:userId"
                  element={<WorkExperience />}
                />
                <Route
                  exact
                  path="/employer"
                  element={<Employer />}
                />
                <Route
                  exact
                  path="/editemployer"
                  element={<EditEmployer />}
                />

                <Route
                  exact
                  path="/users"
                  element={<Users />}
                />
                <Route
                  exact
                  path="/settings"
                  element={<Settings />}
                />
                <Route
                  exact
                  path="/ticket"
                  element={<CreateTicketPage />}
                />
                <Route
                  exact
                  path="/posts"
                  element={<Posts />}
                />

                {/* TECHNICAL ROUTES */}
                <Route
                  exact
                  path="/to-login"
                  element={<ToLogin />}
                />
                <Route
                  exact
                  path="*"
                  element={<PageNotFound />}
                />
                <Route
                  exact
                  path="/dashboard"
                  element={<Dashboard />}
                />
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
