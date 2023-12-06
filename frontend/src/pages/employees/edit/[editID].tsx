import React, { useEffect } from 'react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { wrapper } from '@/store/store';
import { fetchOneNews } from '@/containers/news/newsThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';
import { selectOneEmployee } from '@/containers/about/aboutSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { fetchOneEmployee } from '@/containers/about/aboutThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import EmployeeForm from '@/components/Forms/EmployeeForm/EmployeeForm';

const EditTeam: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const dispatch = useAppDispatch();
  const employee = useAppSelector(selectOneEmployee);
  const { editID } = useParams() as {
    editID: string;
  };

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (editID) {
      dispatch(fetchOneEmployee(editID));
    }
  }, [editID, dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  let editingEmployee;

  if (employee) {
    editingEmployee = {
      name: employee.name,
      number: employee.number,
      role: employee.role,
      image: null,
    };
  }

  return (
    <div className="container">
      <PageLoader />
      <div className="form-block">
        {editingEmployee && (
          <EmployeeForm
            isEdit
            existingEmployee={editingEmployee}
            idEmployee={employee?._id}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const editID = params?.editID;

      if (!editID || Array.isArray(editID)) {
        throw new Error('Param id must be a string');
      }

      await store.dispatch(fetchOneNews(editID));
      return { props: {} };
    },
);
export default EditTeam;
