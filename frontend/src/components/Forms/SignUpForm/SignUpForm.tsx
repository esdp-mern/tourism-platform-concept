import React, { useEffect, useState } from 'react';
import { RegisterMutation } from '@/type';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addAlert,
  selectSignUpError,
  selectSignUpLoading,
  selectUser,
} from '@/containers/users/usersSlice';
import { signUp } from '@/containers/users/usersThunk';
import { useRouter } from 'next/router';
import FileInput from '@/components/UI/FileInput/FileInput';
import PageLoader from '@/components/PageLoader/PageLoader';
import Link from 'next/link';

const initialState: RegisterMutation = {
  username: '',
  password: '',
  displayName: '',
  email: '',
  avatar: null,
};

const SignUpForm = () => {
  const router = useRouter();
  const [state, setState] = useState<RegisterMutation>(initialState);
  const dispatch = useAppDispatch();
  const error = useSelector(selectSignUpError);
  const signUpLoading = useAppSelector(selectSignUpLoading);
  const user = useAppSelector(selectUser);

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

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signUp(state)).unwrap();
      await router.push('/');
      dispatch(addAlert({ message: 'You have signed in!', type: 'info' }));
    } catch (e) {
      dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
    }
  };

  return (
    <div className="form-block">
      <PageLoader />
      <form className="form" onSubmit={submitFormHandler}>
        <h2 className="form-title">Register Form</h2>
        <div className="input-wrap">
          {Boolean(getFieldError('username')) && (
            <span className="error">{getFieldError('username')}</span>
          )}
          <input
            autoComplete="off"
            type="text"
            className={
              getFieldError('username')
                ? 'form-control-error username'
                : 'form-control username'
            }
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
          {Boolean(getFieldError('password')) && (
            <span className="error">{getFieldError('password')}</span>
          )}
          <input
            autoComplete="off"
            type="password"
            className={
              getFieldError('password')
                ? 'form-control-error password'
                : 'form-control password'
            }
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
        <div className="input-wrap">
          <input
            autoComplete="off"
            type="text"
            className="form-control name"
            name="displayName"
            id="displayName"
            value={state.displayName}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="displayName" className="form-label">
            Name
          </label>
        </div>
        <div className="input-wrap">
          <input
            autoComplete="off"
            type="text"
            className="form-control email"
            name="email"
            id="email"
            value={state.email}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
        </div>
        <div className="input-wrap">
          <label className="form-label-avatar avatar">Avatar</label>
          <FileInput
            onChange={changeFileValue}
            name="avatar"
            image={state.avatar}
            className="form-control"
          />
        </div>
        <button type="submit" className="form-btn">
          {signUpLoading ? 'Loading...' : 'Sign up'}
        </button>
        <Link className="link-btn" href="/login">
          Sign in
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
