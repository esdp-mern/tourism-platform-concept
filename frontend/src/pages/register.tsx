import React, { useEffect } from 'react';
import SignUpForm from '@/components/Forms/SignUpForm/SignUpForm';
import { setIsLightMode } from '@/containers/config/configSlice';
import { useAppDispatch } from '@/store/hooks';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const Register = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Sign</title>
        <meta name="description" content="Sign" />
      </Head>
      <div>
        <SignUpForm />
      </div>
    </>
  );
};

export default Register;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
