import React, { useEffect } from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import { Fade } from 'react-awesome-reveal';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectSignInError, setAlertData } from '../../store/usersSlice';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectSignInError);

  useEffect(() => {
    if (error) {
      dispatch(setAlertData({ message: error.error, type: 'error' }));
    }
  }, [error, dispatch]);

  return (
    <div className="container">
      <Fade>
        <SignInForm />
      </Fade>
    </div>
  );
};

export default SignInPage;
