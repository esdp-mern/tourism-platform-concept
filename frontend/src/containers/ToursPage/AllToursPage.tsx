import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { selectAllTours, selectFetchAllLoading } from "../../store/toursSlice";
import { fetchTours } from "../../store/toursThunk";
import TourItem from "../../components/TourItem/TourItem";

const AllToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);
  const toursLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  if (toursLoading) {
    return <div className="container">...Spinner</div>;
  }

  return (
    <div className="container">
      <div className="tours-page">
        {tours.map((tour) => (
          <TourItem tour={tour} key={tour._id} />
        ))}
      </div>
    </div>
  );
};

export default AllToursPage;
