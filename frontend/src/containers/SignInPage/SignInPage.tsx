import React from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import { Fade } from 'react-awesome-reveal';

const SignInPage = () => {
  return (
    <div className="container">
      <Fade>
        <SignInForm />
      </Fade>
    </div>
  );
};

export default SignInPage;