import ToursPage from '@/containers/tours/ToursPage';
import { GetServerSideProps } from 'next';

const Home = () => {
  return (
    <>
      <ToursPage />
    </>
  );
};

export default Home;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
