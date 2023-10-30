import React from "react";
import "./alert.css";
import { useAppSelector } from "../../app/hook";
import { selectAlertData } from "../../store/usersSlice";

interface IProps {
  message: string;
  type: string;
}

const Alert: React.FC<IProps> = ({ message, type }) => {
  const alertData = useAppSelector(selectAlertData);

  return (
    <div className={`alert alert-${type} ${!alertData && "alert-disabled"}`}>
      {message}
    </div>
  );
};

export default Alert;
