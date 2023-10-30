import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import SignInPage from "./containers/SignUpPage/SignInPage";

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    {/* Route for everything */}
    {!isAuthenticated ? (
      <>
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </>
    ) : (
      <>{/* Route for authorized users only */}</>
    )}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default useRoutes;
