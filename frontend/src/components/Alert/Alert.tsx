import React from 'react';
import './alert.css';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectAlertData, setAlertData } from '../../store/usersSlice';

interface IProps {
  message: string;
  type: string;
}

const Alert: React.FC<IProps> = ({ message, type }) => {
  const alertData = useAppSelector(selectAlertData);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`alert alert-${type} ${!alertData && 'alert-disabled'}`}
      onClick={() => dispatch(setAlertData(null))}
    >
      {message}
    </div>
  );
};

export default Alert;
