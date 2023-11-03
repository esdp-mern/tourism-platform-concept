import React, { useEffect } from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import { Fade } from 'react-awesome-reveal';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import {
  addAlert,
  resetSignInError,
  selectSignInError,
} from '../../store/usersSlice';
import PageLoader from '../../components/Loaders/PageLoader';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectSignInError);

  useEffect(() => {
    if (error) {
      dispatch(addAlert({ message: error.error, type: 'error' }));
      dispatch(resetSignInError());
    }
  }, [error, dispatch]);

  return (
    <div className="container">
      <PageLoader />
      <Fade>
        <SignInForm />
      </Fade>
    </div>
  );
};

export default SignInPage;
