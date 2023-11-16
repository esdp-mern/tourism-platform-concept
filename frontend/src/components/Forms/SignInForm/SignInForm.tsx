import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signInMutation } from '@/type';
import { GoogleLogin } from '@react-oauth/google';
import { AxiosError } from 'axios';
import { googleLogin, signIn } from '@/containers/users/usersThunk';
import { addAlert, selectSignInLoading } from '@/containers/users/usersSlice';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import PageLoader from '@/components/PageLoader/PageLoader';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
    try {
      await dispatch(googleLogin(credential)).unwrap();
      await router.push('/');
      dispatch(addAlert({ message: 'You have signed in!', type: 'info' }));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signIn(state)).unwrap();
      await router.push('/');
      dispatch(addAlert({ message: 'You have signed in!', type: 'info' }));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  return (
    <div className="form-block">
      <PageLoader />
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
