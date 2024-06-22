//// Page imports
// Home
import HomePage from "./pages/home/HomePage";
import HomeGuest from "./pages/home/HomeGuest";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";

// Forum
import Forum from "./pages/forum/Forum";
import PostDetail from "./pages/forum/PostDetail";
import EditPost from "./pages/forum/EditPost";
import AddPost from "./pages/forum/AddPost";

// Jobs
import Market from "./pages/jobs/Market";
import Jobs from "./pages/home/Jobs";
import EnlistJob from "./pages/jobs/EnlistJob";
import JobDetail from "./pages/jobs/JobDetail";
import MyJobs from "./pages/jobs/MyJobs";

// Technical
import PageNotFound from "./pages/technical/PageNotFound";
import Dashboard from "./pages/home/Dashboard";


// Users
// import Setting from "./pages/home/Setting";
// import Users from "./pages/home/Users";
  import Security from "./pages/profile/Security";
  import Profile from "./pages/profile/Profile";

// Components
import HomeFooter from "./components/HomeFooter";
import HomeNavbar from "./components/HomeNavbar";

// Misc
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";

// import ErrorPage from "./pages/error/ErrorPage";
import CreateTicketPage from "./pages/user/CreateTicket";

function App() {
  return (
    <BrowserRouter>
      <HomeNavbar />
      <div className="content">
        <Routes>
          
          {/* AUTH ROUTES */}
          <Route exact path="/login" element={<Login />} />
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

          {/* JOBS ROUTES */}
          <Route exact path="/market" element={<Market />} />
          <Route exact path="/jobs" element={<Jobs />} />
          <Route exact path="/jobs/:id" element={<JobDetail />} />
          <Route exact path="/jobs/add" element={<EnlistJob />} />
          <Route exact path="/myjobs" element={<MyJobs />} />

          {/* USERS ROUTES */}
           <Route exact path="/profile" element={<Profile />} /> 
           <Route exact path="/security" element={<Security />} /> 
          {/* <Route exact path="/users" element={<Users />} /> */}
          {/* <Route exact path="/settings" element={<Setting />} /> */}
          <Route exact path="/ticket" element={<CreateTicketPage />} />

          
          {/* TECHNICAL ROUTES */}
          <Route exact path="*" element={<PageNotFound />} />
          <Route exact path="/dashboard" element={<Dashboard />} />

        </Routes>
      </div>
      <HomeFooter />
    </BrowserRouter>
  );
}
export default App;