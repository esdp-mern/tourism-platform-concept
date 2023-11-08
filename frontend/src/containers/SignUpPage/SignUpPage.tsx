import React, { useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Fade } from 'react-awesome-reveal';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="container sign-up-page">
      <Fade>
        <SignUpForm />
      </Fade>
    </div>
  );
};

export default SignUpPage;
