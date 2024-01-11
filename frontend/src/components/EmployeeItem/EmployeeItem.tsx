import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllEmployees } from '@/containers/about/aboutSlice';
import { apiUrl, userRoles } from '@/constants';
import { deleteEmployees, fetchEmployees } from '@/containers/about/aboutThunk';
import Link from 'next/link';
import { selectUser } from '@/containers/users/usersSlice';
import { T } from '@/store/translation';

const EmployeeItem = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const employees = useAppSelector(selectAllEmployees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      await dispatch(deleteEmployees(id));
      dispatch(fetchEmployees());
    }
  };

  return (
    <div className="about-page-team-cards">
      {employees.map((empl) => (
        <div className="about-page-team-card" key={empl._id}>
          <img
            className="about-page-team-card-img"
            src={apiUrl + '/' + empl.image}
            alt={empl.name}
          />
          <div className="about-page-team-card-position">
            {T('/about', `${empl.role}`)}
          </div>
          <h6 className="about-page-team-card-title">{empl.name}</h6>
          <div className="about-page-team-card-phone">{empl.number}</div>
          {user && user.role === userRoles.admin ? (
            <div className="about-page-team-btns">
              <button
                className="btn-delete-tour"
                type="button"
                onClick={() => onDelete(empl._id)}
              >
                Delete
              </button>
              <Link
                href={`/employees/edit/${empl._id}`}
                className="btn-tour-edit"
              >
                Edit
              </Link>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default EmployeeItem;
