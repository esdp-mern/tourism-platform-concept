import React from "react";
import { User } from "../../../type";

interface IProps {
  user: User;
}

const UserMenu: React.FC<IProps> = ({ user }) => {
  return (
    <div>Hello, {user.displayName ? user.displayName : user.username}</div>
  );
};

export default UserMenu;
