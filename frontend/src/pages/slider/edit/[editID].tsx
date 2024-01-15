import React, { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { wrapper } from '@/store/store';
import { fetchOneSlider } from '@/containers/slider/sliderThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';
import { selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import {
  addSlider,
  selectOneMainSliders,
} from '@/containers/slider/sliderSlice';
import PageLoader from '@/components/Loaders/PageLoader';
import MainSliderForm from '@/components/Forms/MainSliderForm/MainSliderForm';

const EditSlider: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const dispatch = useAppDispatch();
  const slider = useAppSelector(selectOneMainSliders);
  const { editID } = useParams() as {
    editID: string;
  };

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    dispatch(addSlider(null));
    if (editID) {
      dispatch(fetchOneSlider(editID));
    }
  }, [editID, dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  let editingSlider;

  if (slider && editID) {
    editingSlider = {
      country: slider.country,
      image: null,
    };
  }
  return (
    <div className="container">
      <PageLoader />
      <div className="form-block">
        {editingSlider && (
          <MainSliderForm
            isEdit
            existingSlider={editingSlider}
            idSlider={slider?._id}
          />
        )}
      </div>
    </div>
  );
};

export default EditSlider;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
