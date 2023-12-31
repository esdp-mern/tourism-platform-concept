import React, { useState } from 'react';
import { IOrder, IOrderForm } from '@/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearOrderError,
  selectOneTour,
  selectOrderError,
} from '@/containers/tours/toursSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { createOrder } from '@/containers/tours/toursThunk';
import TextField from '@/components/UI/TextField/TextField';
import guideIcon from '@/assets/images/guide-icon.svg';
import calendarIcon from '@/assets/images/calendar-order-icon.svg';
import emailIcon from '@/assets/images/email-icon.svg';
import Link from 'next/link';
import { T } from '@/store/translation';
import { useRouter } from 'next/router';

export interface IChangeEvent {
  target: { name: string; value: string };
}

const authorizedUserFields = {
  guide: '',
  date: '',
};
const unAuthorizedUserFields = {
  ...authorizedUserFields,
  email: '',
  phone: '',
};

const OneTourOrderForm = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectOrderError);
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const tour = useAppSelector(selectOneTour);
  const { orderButtonLoading } = useAppSelector((state) => state.tours);

  const [state, setState] = useState<IOrderForm>(
    user ? authorizedUserFields : unAuthorizedUserFields,
  );

  const changeValue = (e: IChangeEvent) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    dispatch(clearOrderError());
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tour) return;

    try {
      const order: IOrder = {
        ...state,
        tour: tour._id,
        price: tour.price,
      };

      if (user) {
        order.user = user._id;
        order.email = user.email;
        order.phone = user.phone;
      }

      await dispatch(createOrder(order)).unwrap();
      void router.push('/');
    } catch (e) {
      // nothing
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const getTextField = (
    name: keyof IOrderForm,
    label: string,
    icon?: string,
    type?: React.HTMLInputTypeAttribute,
  ) => (
    <TextField
      name={name}
      label={label}
      type={type || 'text'}
      value={state[name]!}
      onChange={changeValue}
      icon={icon}
      errorMessage={getFieldError(name)}
      required
    />
  );

  const isNotUser =
    !user && state.email !== undefined && state.phone !== undefined;

  return (
    <form className="one-tour-order-form" onSubmit={sendData}>
      <h4 className="one-tour-order-form-title">
        {T('/oneTourPage', 'tour_order_form_title')}
      </h4>
      <div className="one-tour-order-form-inputs">
        {getTextField('guide', 'Select guide', guideIcon.src, 'select')}
        {getTextField('date', 'Pick Up Date', calendarIcon.src, 'date')}
        {isNotUser && (
          <>
            {getTextField('email', 'E-mail', emailIcon.src, 'email')}
            {getTextField('phone', 'Phone', undefined, 'phone')}
          </>
        )}
      </div>

      <button
        type="submit"
        className={`one-tour-order-form-btn`}
        disabled={orderButtonLoading}
      >
        <Link href="/" className="one-tour-order-form-nav-link">
          {orderButtonLoading
            ? T('/oneTourPage', 'tour_order_form_button_loading')
            : T('/oneTourPage', 'tour_order_form_button')}
        </Link>
      </button>
    </form>
  );
};

export default OneTourOrderForm;
