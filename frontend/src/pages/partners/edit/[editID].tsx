import React, { useEffect } from 'react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';
import { selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import PageLoader from '@/components/Loaders/PageLoader';
import { wrapper } from '@/store/store';
import { fetchOnePartner } from '@/containers/partners/partnersThunk';
import { selectOnePartner } from '@/containers/partners/partnersSlice';
import PartnerForm from '@/components/Forms/PartnerForm/PartnerForm';

const EditPartner: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const dispatch = useAppDispatch();
  const partner = useAppSelector(selectOnePartner);
  const { editID } = useParams() as {
    editID: string;
  };

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (editID) {
      dispatch(fetchOnePartner(editID));
    }
  }, [editID, dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  let editingPartner;

  if (partner) {
    editingPartner = {
      name: partner.name,
      link: partner.link,
      image: null,
    };
  }

  return (
    <div className="container sign-up-page">
      <PageLoader />
      {editingPartner && (
        <PartnerForm
          editingPartner={editingPartner}
          idPartner={partner?._id!}
        />
      )}
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

      await store.dispatch(fetchOnePartner(editID));
      return { props: {} };
    },
);
export default EditPartner;
