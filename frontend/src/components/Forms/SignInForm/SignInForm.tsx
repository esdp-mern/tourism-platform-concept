import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signInMutation } from '@/type';
import { GoogleLogin } from '@react-oauth/google';
import { AxiosError } from 'axios';
import { googleLogin, signIn } from '@/containers/users/usersThunk';
import {
  addAlert,
  selectSignInLoading,
  selectUser,
} from '@/containers/users/usersSlice';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import Link from 'next/link';
import PageLoader from '@/components/Loaders/PageLoader';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [state, setState] = useState<signInMutation>({
    username: '',
    password: '',
  });
  const user = useAppSelector(selectUser);
  const signInLoading = useAppSelector(selectSignInLoading);

  useEffect(() => {
    if (user) {
      void router.push('/');
    }
  }, [user, router]);

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
        <h2 className="form-title">Login Form</h2>
        <div className="form-wrap-google">
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
          <input
            autoComplete="off"
            type="text"
            className="form-control username"
            name="username"
            id="username"
            value={state.username}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="username" className="form-label">
            Username
          </label>
        </div>
        <div className="input-wrap">
          <input
            autoComplete="off"
            type="password"
            className="form-control password"
            name="password"
            id="password"
            value={state.password}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>
        <div className="form-wrap-btn">
          <button className="form-btn" type="submit" disabled={signInLoading}>
            {signInLoading ? <ButtonLoader size={18} /> : 'Login'}
          </button>
          <Link className="link-btn" href="/register">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
