import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTours } from '@/containers/tours/toursThunk';
import { selectAllTours } from '@/containers/tours/toursSlice';
import TourItem from '@/components/TourListItem/TourListItem';
import PageLoader from '@/components/Loaders/PageLoader';
import { setIsLightMode } from '@/containers/config/configSlice';
import TourFilter from '@/components/Filters/TourFilter';

const AllToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);
  const [toursPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecord = currentPage * toursPerPage;
  const indexOfFirstRecord = indexOfLastRecord - toursPerPage;
  const currentRecords = tours.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(tours.length / toursPerPage);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    dispatch(fetchTours());
  }, [dispatch]);

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filterTour = (type: string) => {};

  return (
    <div className="all-tours">
      <PageLoader />
      <div style={{ margin: '134px 0' }}></div>
      <TourFilter fetching={filterTour} />
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
                pathname={'/tours/all/'}
                nPages={nPages}
                currentPage={currentPage}
                onSetCurrentPage={onSetCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllToursPage;
