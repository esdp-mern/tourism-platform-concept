import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAdminTours, fetchTours } from '@/containers/tours/toursThunk';
import { selectAllTours } from '@/containers/tours/toursSlice';
import TourItem from '@/components/TourListItem/TourListItem';
import PageLoader from '@/components/Loaders/PageLoader';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { setIsLightMode } from '@/containers/config/configSlice';

const AllToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);
  const user = useAppSelector(selectUser);
  const [toursPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTours, setCurrentTours] = useState<
    'all' | 'published' | 'nonPublished'
  >('all');

  const indexOfLastRecord = currentPage * toursPerPage;
  const indexOfFirstRecord = indexOfLastRecord - toursPerPage;
  const currentRecords = tours.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(tours.length / toursPerPage);

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  useEffect(() => {
    switch (currentTours) {
      case 'all':
        dispatch(fetchAdminTours(true));
        break;
      case 'nonPublished':
        dispatch(fetchAdminTours());
        break;
      case 'published':
        dispatch(fetchTours());
        break;
      default:
        dispatch(fetchAdminTours(true));
        break;
    }
  }, [currentTours, dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="all-tours">
      <PageLoader />
      <div>
        <div className="container">
          <div style={{ margin: '100px auto 0 0' }}>
            <div className="buttons-admin-tour">
              <button
                className="btn-admin-fetch-tour btn-admin-all"
                type="button"
                onClick={() => setCurrentTours('all')}
              >
                all
              </button>
              <button
                className="btn-admin-fetch-tour btn-admin-pub"
                type="button"
                onClick={() => setCurrentTours('published')}
              >
                published
              </button>
              <button
                className="btn-admin-fetch-tour btn-admin-non-pub"
                type="button"
                onClick={() => setCurrentTours('nonPublished')}
              >
                non published
              </button>
            </div>
            {!tours || tours.length <= 0 ? (
              <div className="title-none-tour">
                Unfortunately, there are no {currentTours} tours.
              </div>
            ) : (
              <div>
                <div className="tours-admin-page">
                  {currentRecords.map((tour) => (
                    <TourItem tour={tour} key={tour._id} isAdmin />
                  ))}
                </div>
                <div className="tours-page-paginate">
                  <Pagination
                    pathname={'/admin/tours/'}
                    nPages={nPages}
                    currentPage={currentPage}
                    onSetCurrentPage={onSetCurrentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllToursPage;
