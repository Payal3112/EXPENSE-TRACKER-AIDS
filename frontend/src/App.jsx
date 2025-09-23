import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import DashboardLayout from "./components/layouts/DashboardLayout";
import UserProvider from "./context/UserContext";
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Root redirect based on auth */}
          <Route path="/" element={<Root />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Redirect old /income URL to /dashboard/income */}
          <Route path="/income" element={<Navigate to="/dashboard/income" />} />

          {/* Redirect old /expense URL to /dashboard/expense */}
          <Route path="/expense" element={<Navigate to="/dashboard/expense" />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="income" element={<Income />} />
            <Route path="expense" element={<Expense />} />
          </Route>
        </Routes>
      </Router>
      <Toaster 
          toastOptions={{
            classname: "",
            style: {
              fontSize: '13px'
            },
          }}
        />
    </UserProvider>
  );
};

export default App;

// Redirect root based on auth
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
