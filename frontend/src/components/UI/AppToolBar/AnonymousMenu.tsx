import React from "react";
import { Link } from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <div>
      <Link to="/register" className="register-link">
        Sign up
      </Link>
      <Link to="/login" className="login-link">
        Sign in
      </Link>
    </div>
  );
};

export default AnonymousMenu;
