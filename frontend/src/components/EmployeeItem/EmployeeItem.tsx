import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllEmployees } from '@/containers/about/aboutSlice';
import { apiUrl } from '@/constants';
import { fetchEmployees } from '@/containers/about/aboutThunk';

const EmployeeItem = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectAllEmployees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="about-page-team">
      <h3 className="about-page-team-title">Meet Our Team</h3>
      <p className="about-page-team-txt">
        Duis aute irure dolor in reprehenderit in voluptate velit
      </p>
      <div className="about-page-team-cards">
        {employees.map((empl) => (
          <div className="about-page-team-card" key={empl._id}>
            <img
              className="about-page-team-card-img"
              src={apiUrl + '/' + empl.image}
              alt={empl.name}
            />
            <div className="about-page-team-card-position">{empl.role}</div>
            <h6 className="about-page-team-card-title">{empl.name}</h6>
            <div className="about-page-team-card-phone">{empl.number}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeItem;
