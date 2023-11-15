import React, { useState } from 'react';
import { RegisterMutation } from '@/type';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectSignUpError,
  selectSignUpLoading,
} from '@/containers/users/usersSlice';
import { signUp } from '@/containers/users/usersThunk';
import { useRouter } from 'next/router';
import FileInput from '@/components/UI/FileInput/FileInput';

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
      // dispatch(addAlert({ message: 'You have signed in!', type: 'info' }));
    } catch (e) {
      // dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
    }
  };

  return (
    <div className="form-block">
      <form className="form" onSubmit={submitFormHandler}>
        <h2 className="form-title">Registration</h2>
        <div className="input-wrap">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          {Boolean(getFieldError('username')) && (
            <span className="error">{getFieldError('username')}</span>
          )}
          <input
            type="text"
            className={
              getFieldError('username') ? 'form-control-error' : 'form-control'
            }
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
          {Boolean(getFieldError('password')) && (
            <span className="error">{getFieldError('password')}</span>
          )}
          <input
            type="password"
            className={
              getFieldError('password') ? 'form-control-error' : 'form-control'
            }
            name="password"
            id="password"
            value={state.password}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="displayName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="displayName"
            id="displayName"
            value={state.displayName}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={state.email}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="input-wrap">
          <label className="form-label">Avatar</label>
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
      </form>
    </div>
  );
};

export default SignUpForm;
