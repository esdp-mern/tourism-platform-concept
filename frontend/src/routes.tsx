import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUpPage from './containers/SignUpPage/SignUpPage';
import SignInPage from './containers/SignInPage/SignInPage';
import ToursPage from './containers/ToursPage/ToursPage';
import AllToursPage from './containers/ToursPage/AllToursPage';

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    <Route path="/tours/all" element={<AllToursPage />} />
    <Route path="/" element={<ToursPage />} />
    {/* Route for everything */}
    {!isAuthenticated ? (
      <>
        <Route path="/tours/all" element={<AllToursPage />} />
        <Route path="/" element={<ToursPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
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
