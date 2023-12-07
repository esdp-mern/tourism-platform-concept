import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllEmployees } from '@/containers/about/aboutSlice';
import { apiUrl, userRoles } from '@/constants';
import { deleteEmployees, fetchEmployees } from '@/containers/about/aboutThunk';
import Link from 'next/link';
import { selectUser } from '@/containers/users/usersSlice';
import { useRouter } from 'next/router';

const EmployeeItem = () => {
  const router = useRouter();
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
    <div className="about-page-team">
      <h3 className="about-page-team-title">Meet Our Team</h3>
      <p className="about-page-team-txt">
        Duis aute irure dolor in reprehenderit in voluptate velit
      </p>
      {user && user.role === userRoles.admin && (
        <Link href="/employees/create" className="about-page-team-link">
          Add new member
        </Link>
      )}
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
            {user && user.role === userRoles.admin ? (
              <div className="about-page-team-btns">
                <button
                  className="btn-delete-tour"
                  type="button"
                  onClick={() => onDelete(empl._id)}
                >
                  Delete
                </button>
                <button
                  className="btn-tour-edit"
                  type="button"
                  onClick={() => {
                    router.push(`/employees/edit/${empl._id}`).then((r) => r);
                  }}
                >
                  Edit
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeItem;
