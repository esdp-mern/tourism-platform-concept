import React from "react";
import { User } from "../../../type";

interface IProps {
  user: User;
}

const UserMenu: React.FC<IProps> = ({ user }) => {
  return (
    <div className="user-menu">
      <p>Hello, {user.displayName ? user.displayName : user.username}</p>
      <button className="logout-btn">logout</button>
    </div>
  );
};

export default UserMenu;
