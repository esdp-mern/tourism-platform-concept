import React, { useEffect, useState } from 'react';
import { IOrder, IOrderForm } from '@/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { createOrder } from '@/containers/tours/toursThunk';
import TextField from '@/components/UI/TextField/TextField';
import guideIcon from '../../assets/images/guide-icon.svg';
import calendarIcon from '../../assets/images/calendar-icon.svg';
import emailIcon from '../../assets/images/email-icon.svg';
import phoneIcon from '../../assets/images/phone-icon.svg';

export interface IChangeEvent {
  target: { name: string; value: string };
}

const initialState: IOrderForm = {
  guide: '',
  date: '',
};

const OneTourOrderForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tour = useAppSelector(selectOneTour);
  const { orderButtonLoading } = useAppSelector((state) => state.tours);

  const [state, setState] = useState<IOrderForm>(initialState);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setState((prevState) => ({ ...prevState, email: '', phone: '' }));
    }
  }, [user]);

  const changeValue = (e: IChangeEvent) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmit(true);

    const keys = Object.keys(state) as (keyof IOrderForm)[];

    const isNotValid = keys.find(
      (key: keyof IOrderForm) => state[key]?.length === 0,
    );

    if (isNotValid || !tour) return;

    try {
      const order: IOrder = {
        ...state,
        tour: tour._id,
        price: tour.price,
      };

      if (user) {
        order.user = user._id;
      }

      await dispatch(createOrder(order));
    } catch (e) {
      // nothing
    }
  };

  return (
    <form className="one-tour-order-form" onSubmit={sendData}>
      <h4 className="one-tour-order-form-title">Book Now</h4>

      <div className="one-tour-order-form-inputs">
        <TextField
          name="guide"
          type="select"
          value={state.guide}
          onChange={changeValue}
          icon={guideIcon.src}
          label="Select guide"
          required
          isSubmit={isSubmit}
        />

        <TextField
          name="date"
          type="date"
          value={state.date}
          onChange={changeValue}
          icon={calendarIcon.src}
          label="Pick Up Date"
          required
          isSubmit={isSubmit}
        />

        {!user && state.email !== undefined && state.phone !== undefined && (
          <>
            <TextField
              name="email"
              type="email"
              value={state.email}
              onChange={changeValue}
              icon={emailIcon.src}
              label="E-mail"
              isSubmit={isSubmit}
              required
            />

            <TextField
              name="phone"
              type="text"
              value={state.phone}
              onChange={changeValue}
              icon={phoneIcon.src}
              label="Phone"
              isSubmit={isSubmit}
              required
            />
          </>
        )}
      </div>

      <button
        type="submit"
        className={`one-tour-order-form-btn`}
        disabled={orderButtonLoading}
      >
        {orderButtonLoading ? 'Booking...' : 'Book this tour'}
      </button>
    </form>
  );
};

export default OneTourOrderForm;
