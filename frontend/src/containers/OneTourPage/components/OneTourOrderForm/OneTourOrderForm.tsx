import React, { useEffect, useState } from 'react';
import './OneTourOrderForm.css';
import TextField from '../../../../components/UI/TextField/TextField';
import { IOrder } from '../../../../type';
import { useAppSelector } from '../../../../app/hook';
import { selectUser } from '../../../../store/usersSlice';
import penIcon from '../../../../assets/images/pen-icon.svg';
import calendarIcon from '../../../../assets/images/calendar-order-icon.svg';
import peopleIcon from '../../../../assets/images/people-icon.svg';
import emailIcon from '../../../../assets/images/email-icon.svg';
import phoneIcon from '../../../../assets/images/phone-icon.svg';

const initialState: IOrder = {
  fullName: '',
  date: '',
  people: '',
};

const OneTourOrderForm = () => {
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<IOrder>(initialState);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setState((prevState) => ({ ...prevState, email: '', phone: '' }));
    }
  }, [user]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendData = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmit(true);
  };

  return (
    <form className="one-tour-order-form" onSubmit={sendData}>
      <h4 className="one-tour-order-form-title">Book Now</h4>

      <div className="one-tour-order-form-inputs">
        <TextField
          name="fullName"
          type="text"
          value={state.fullName}
          onChange={changeValue}
          icon={penIcon}
          label="Full Name"
          required
          isSubmit={isSubmit}
        />

        <TextField
          name="date"
          type="text"
          value={state.date}
          onChange={changeValue}
          icon={calendarIcon}
          label="Pick Up Date"
          required
          isSubmit={isSubmit}
        />

        <TextField
          name="people"
          type="text"
          value={state.people}
          onChange={changeValue}
          icon={peopleIcon}
          label="People"
          required
          isSubmit={isSubmit}
        />

        {!!user && state.email !== undefined && state.phone !== undefined && (
          <>
            <TextField
              name="email"
              type="email"
              value={state.email}
              onChange={changeValue}
              icon={emailIcon}
              label="E-mail"
              isSubmit={isSubmit}
              required
            />

            <TextField
              name="phone"
              type="text"
              value={state.phone}
              onChange={changeValue}
              icon={phoneIcon}
              label="Phone"
              isSubmit={isSubmit}
              required
            />
          </>
        )}
      </div>

      <button type="submit" className="one-tour-order-form-btn">
        Book this tour
      </button>
    </form>
  );
};

export default OneTourOrderForm;
