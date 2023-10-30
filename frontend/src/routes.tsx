import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import SignInPage from "./containers/SignUpPage/SignInPage";

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    {/* Route for everything */}
    {!isAuthenticated ? (
      <>
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </>
    ) : (
      <>{/* Route for authorized users only */}</>
    )}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default useRoutes;
