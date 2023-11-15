import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTours } from '@/containers/tours/toursThunk';
import {
  selectAllTours,
  selectFetchAllLoading,
} from '@/containers/tours/toursSlice';
import TourItem from '@/components/TourListItem/TourListItem';

const AllToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);
  const toursLoading = useAppSelector(selectFetchAllLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage] = useState(6);

  const indexOfLastRecord = currentPage * toursPerPage;
  const indexOfFirstRecord = indexOfLastRecord - toursPerPage;
  const currentRecords = tours.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(tours.length / toursPerPage);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  if (toursLoading) {
    return <div className="container">...Spinner</div>;
  }

  return (
    <div className="container">
      <div>
        <div>
          <div className="tours-page">
            {currentRecords.map((tour) => (
              <TourItem tour={tour} key={tour._id} />
            ))}
          </div>
          <div className="tours-page-paginate">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllToursPage;
