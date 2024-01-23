import ToursPage from '@/containers/tours/ToursPage';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home - Akim Tourism</title>
        <meta name="description" content="Home - Akim Tourism" />
      </Head>
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
