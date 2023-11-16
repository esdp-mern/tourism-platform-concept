import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { disableAlert, selectAlerts } from '@/containers/users/usersSlice';
import { IAlert } from '@/type';

const Alerts = () => {
  const alerts = useAppSelector(selectAlerts);
  const dispatch = useAppDispatch();

  return (
    <div className="alerts">
      {alerts.map((alert: IAlert) => (
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
