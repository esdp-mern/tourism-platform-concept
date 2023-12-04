import React, { useEffect } from 'react';
import { wrapper } from '@/store/store';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useParams } from 'next/navigation';
import { fetchTour } from '@/containers/tours/toursThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import PageLoader from '@/components/Loaders/PageLoader';
import TourForm from '@/components/Forms/TourForm/TourForm';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { setIsLightMode } from '@/containers/config/configSlice';

const EditTour: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const dispatch = useAppDispatch();
  const tour = useAppSelector(selectOneTour);
  const { editID } = useParams() as {
    editID: string;
  };
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (editID) {
      dispatch(fetchTour(editID));
    }
  }, [editID, dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  let editingTour;

  if (tour) {
    const guides = tour.guides.map((guide) => {
      return guide._id;
    });

    editingTour = {
      name: tour.name,
      country: tour.country,
      mainImage: null,
      duration: tour.duration.toString(),
      price: tour.price.toString(),
      description: tour.description,
      destination: tour.destination,
      arrival: tour.arrival,
      departure: tour.departure,
      dressCode: tour.dressCode,
      included: tour.included,
      category: tour.category,
      galleryTour: null,
      plan: tour.plan,
      guides: guides,
    };
  }

  return (
    <div className="container sign-up-page">
      <PageLoader />
      {editingTour && (
        <TourForm isEdit existingTour={editingTour} idTour={tour?._id} />
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

      await store.dispatch(fetchTour(editID));
      return { props: {} };
    },
);
export default EditTour;
