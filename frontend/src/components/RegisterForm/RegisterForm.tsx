import React, { useState } from "react";
import { RegisterMutation } from "../../type";
import { useAppDispatch } from "../../app/hook";
import { useSelector } from "react-redux";
import { selectRegisterError } from "../../store/usersSlice";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/usersThunk";

const RegisterForm = () => {
  const [state, setState] = useState<RegisterMutation>({
    username: "",
    password: "",
    displayName: "",
    email: "",
  });
  const dispatch = useAppDispatch();
  const error = useSelector(selectRegisterError);
  const navigate = useNavigate();
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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
      await dispatch(register(state)).unwrap();
      alert("Congrats, you are registered!");
      navigate("/");
    } catch (e) {
      alert("Something is wrong!");
    } finally {
      setState(() => ({
        username: "",
        password: "",
        displayName: "",
        email: "",
      }));
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <h2 className="form-title">Registration</h2>
      <div className="input-wrap">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        {Boolean(getFieldError("username")) && (
          <span className="error">{getFieldError("username")}</span>
        )}
        <input
          type="text"
          className={
            getFieldError("username") ? "form-control-error" : "form-control"
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
        {Boolean(getFieldError("password")) && (
          <span className="error">{getFieldError("password")}</span>
        )}
        <input
          type="password"
          className={
            getFieldError("password") ? "form-control-error" : "form-control"
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
      <button type="submit" className="form-btn">
        Sign up
      </button>
    </form>
  );
};

export default RegisterForm;
