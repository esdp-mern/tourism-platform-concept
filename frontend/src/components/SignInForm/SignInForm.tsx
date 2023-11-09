import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { signInMutation } from '../../type';
import { googleLogin, signIn } from '../../store/usersThunk';
import { addAlert, selectSignInLoading } from '../../store/usersSlice';
import ButtonLoader from '../Loaders/ButtonLoader';
import { GoogleLogin } from '@react-oauth/google';
import { AxiosError } from 'axios';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<signInMutation>({
    username: '',
    password: '',
  });
  const signInLoading = useAppSelector(selectSignInLoading);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signIn(state)).unwrap();
      dispatch(addAlert({ message: 'You have signed in!', type: 'info' }));
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  return (
    <div className="form-block">
      <form className="form" onSubmit={submitFormHandler}>
        <h2 className="form-title">Sign in</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>

        <div className="input-wrap">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            value={state.username}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={state.password}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <button className="form-btn" type="submit" disabled={signInLoading}>
          {signInLoading ? <ButtonLoader size={18} /> : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
