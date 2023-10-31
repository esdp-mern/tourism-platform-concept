import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import SignInPage from "./containers/SignUpPage/SignInPage";
import ToursPage from "./containers/ToursPage/ToursPage";
import AllToursPage from "./containers/ToursPage/AllToursPage";

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    <Route path="/tours/all" element={<AllToursPage />} />
    <Route path="/" element={<ToursPage />} />
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
