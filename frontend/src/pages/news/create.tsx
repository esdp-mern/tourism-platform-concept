import React from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import NewsForm from '@/components/Forms/NewsForm/NewsForm';

const Create = () => {
  return (
    <div className="container news-create-page">
      <PageLoader />
      <NewsForm />
    </div>
  );
};

export default Create;
