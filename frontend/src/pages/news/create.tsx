import React from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import NewsForm from '@/components/Forms/NewsForm/NewsForm';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const Create = () => {
  return (
    <>
      <Head>
        <title>Create news</title>
        <meta name="description" content="Create news" />
      </Head>
      <div className="container news-create-page">
        <PageLoader />
        <NewsForm />
      </div>
    </>
  );
};

export default Create;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
