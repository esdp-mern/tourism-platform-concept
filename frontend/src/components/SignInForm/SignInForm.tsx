import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { signInMutation } from '../../type';
import { signIn } from '../../store/usersThunk';
import { setAlertData } from '../../store/usersSlice';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<signInMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signIn(state)).unwrap();
      dispatch(setAlertData({ message: 'You have signed in!', type: 'info' }));
      navigate('/');
    } catch (e) {
      dispatch(setAlertData({ message: 'Something is wrong!', type: 'error' }));
    }
  };

  return (
    <div className="form-block">
      <form className="form" onSubmit={submitFormHandler}>
        <h2 className="form-title">Sign in</h2>
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
        <button type="submit" className="form-btn">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
