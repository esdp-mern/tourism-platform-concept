import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTours } from '@/containers/tours/toursThunk';
import {
  selectAllTours,
  selectAllToursLength,
} from '@/containers/tours/toursSlice';
import TourItem from '@/components/TourListItem/TourListItem';
import PageLoader from '@/components/Loaders/PageLoader';
import { setIsLightMode } from '@/containers/config/configSlice';
import TourFilter from '@/components/Filters/TourFilter';

const AllToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);
  const allToursLength = useAppSelector(selectAllToursLength);

  const [currentPage, setCurrentPage] = useState(1);

  const toursPerPage = 6;

  const indexOfLastRecord = currentPage * toursPerPage;
  const indexOfFirstRecord = indexOfLastRecord - toursPerPage;
  const nPages = Math.ceil(allToursLength / toursPerPage);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    dispatch(
      fetchTours({
        skip: indexOfFirstRecord,
        limit: toursPerPage,
      }),
    );
  }, [dispatch, currentPage]);

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="all-tours">
      <PageLoader />
      <div className="fixed-toolbar"></div>

      <TourFilter />
      <div className="container">
        <div>
          <div>
            <div className="tours-page">
              {tours.map((tour) => (
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
