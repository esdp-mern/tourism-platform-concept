import { wrapper } from '@/store/store';
import { fetchTours } from '@/containers/tours/toursThunk';
import ToursPage from '@/containers/tours/ToursPage';

const Home = () => {
  return (
    <>
      <ToursPage />
    </>
  );
};

Home.getInitialPageProps = wrapper.getInitialPageProps((store) => async () => {
  await store.dispatch(fetchTours());
  return { props: { name: 'tours' } };
});

export default Home;
