import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectAllTours, selectFetchAllLoading } from '../../store/toursSlice';
import { fetchTours } from '../../store/toursThunk';
import TourItem from '../../components/TourItem/TourItem';
import Pagination from '../../components/Pagination/Pagination';
import PageLoader from '../../components/Loaders/PageLoader';

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
      <PageLoader />
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
