import React, { useEffect } from 'react';
import SignUpForm from '@/components/Forms/SignUpForm/SignUpForm';
import { setIsLightMode } from '@/containers/config/configSlice';
import { useAppDispatch } from '@/store/hooks';
import { GetServerSideProps } from 'next';

const Register = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  return (
    <div>
      <SignUpForm />
    </div>
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
