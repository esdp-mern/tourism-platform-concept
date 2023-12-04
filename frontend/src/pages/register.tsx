import React, { useEffect } from 'react';
import SignUpForm from '@/components/Forms/SignUpForm/SignUpForm';
import { setIsLightMode } from '@/containers/config/configSlice';
import { useAppDispatch } from '@/store/hooks';

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
