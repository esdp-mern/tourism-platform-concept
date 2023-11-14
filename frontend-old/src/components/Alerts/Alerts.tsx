import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { disableAlert, selectAlerts } from '../../store/usersSlice';
import './alert.css';

const Alerts = () => {
  const alerts = useAppSelector(selectAlerts);
  const dispatch = useAppDispatch();

  return (
    <div className="alerts">
      {alerts.map((alert) => (
        <div
          className={`alert alert-${alert.type} ${alert.className}`}
          key={alert.id}
          onClick={() => dispatch(disableAlert(alert.id))}
        >
          <span>{alert.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Alerts;
