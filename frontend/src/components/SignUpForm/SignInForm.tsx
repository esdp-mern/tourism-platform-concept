import React, {useState} from 'react';
import {useAppDispatch} from "../../app/hook";
import {useNavigate} from "react-router-dom";
import {signIn} from "../../store/usersThunk";
import {signInMutation} from "../../type";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<signInMutation>({
    username: "",
    password: "",
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signIn(state)).unwrap();
      navigate("/");
    } catch (e) {
      // nothing
    }
  };

  return (
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
  );
};

export default SignInForm;