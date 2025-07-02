import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddProblem from "./pages/AddProblem";
import { userAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import AdminRoute from "./components/AdminRoute";
import Layout from "./layout/Layout";
import ProblemPage from "./pages/ProblemPage";
import Profile from "./pages/Profile";
import LeetCodeInterface from "./pages/SampleLeetcode";
import UnderDevelopmentPage from "./pages/UnderDevelopment";
import ProblemPage2 from "./pages/ProblemPage2";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = userAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
          
            <Route
              index
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
          </Route>

          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />

          <Route
            path="/problem/:problemId"
            element={authUser ? <ProblemPage2 /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/sample/:problemId"
            element= {<LeetCodeInterface />}
          />
          
          <Route element={<AdminRoute />}>
            <Route 
              path="/add-problem"
              element={<AddProblem />} 
            />
          </Route>

          <Route 
            path="/leaderboard" 
            element={authUser ? <UnderDevelopmentPage /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/contests" 
            element={authUser ? <UnderDevelopmentPage /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/settings" 
            element={authUser ? <UnderDevelopmentPage /> : <Navigate to="/login" />} 
          />

        </Routes>
      </div>
    </>
  );
}

export default App;
