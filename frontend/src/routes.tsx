import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./containers/RegisterPage/RegisterPage";
import Login from "./containers/SignUpPage/SignInPage";

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    {/* Route for everything */}
    {!isAuthenticated ? (
      <>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </>
    ) : (
      <>{/* Route for authorized users only */}</>
    )}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default useRoutes;
