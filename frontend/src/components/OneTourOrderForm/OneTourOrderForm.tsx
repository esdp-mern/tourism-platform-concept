import React, { useEffect, useState } from 'react';
import { IOrder, IOrderForm } from '@/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { createOrder } from '@/containers/tours/toursThunk';
import TextField from '@/components/UI/TextField/TextField';
import guideIcon from '../../assets/images/guide-icon.svg';
import calendarIcon from '../../assets/images/calendar-order-icon.svg';
import emailIcon from '../../assets/images/email-icon.svg';
import phoneIcon from '../../assets/images/phone-icon.svg';
import Link from 'next/link';
import { TextFieldPhone } from '@/components/UI/TextField/components/TextFieldPhone';
import { T } from '@/store/translation';
import { useRouter } from 'next/router';

export interface IChangeEvent {
  target: { name: string; value: string };
}

const initialState: IOrderForm = {
  guide: '',
  date: '',
};

const OneTourOrderForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const tour = useAppSelector(selectOneTour);
  const { orderButtonLoading } = useAppSelector((state) => state.tours);

  const [state, setState] = useState<IOrderForm>(initialState);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setState((prevState) => ({ ...prevState, email: '', phone: '' }));
    } else {
      setState(initialState);
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

    console.log(isNotValid);
    if (isNotValid || !tour) return;

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

      console.log(order);

      await dispatch(createOrder(order)).unwrap();
      void router.push('/');
    } catch (e) {
      // nothing
    }
  };

  return (
    <form className="one-tour-order-form" onSubmit={sendData}>
      <h4 className="one-tour-order-form-title">
        {T('/oneTourPage', 'tour_order_form_title')}
      </h4>
      <div className="one-tour-order-form-inputs">
        <TextField
          name="guide"
          type="select"
          value={state.guide}
          onChange={changeValue}
          icon={guideIcon.src}
          label={T('/oneTourPage', 'tour_order_form_guide_select')}
          required
          isSubmit={isSubmit}
        />
        <TextField
          name="date"
          type="date"
          value={state.date}
          onChange={changeValue}
          icon={calendarIcon.src}
          label={T('/oneTourPage', 'tour_order_form_date_select')}
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
            <TextFieldPhone
              name="phone"
              value={state.phone}
              onChange={changeValue}
              icon={phoneIcon.src}
              isSubmit={isSubmit}
              label={T('/oneTourPage', 'tour_order_form_phone')}
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
        <NavLink href="/" className="one-tour-order-form-nav-link">
          {orderButtonLoading
            ? T('/oneTourPage', 'tour_order_form_button_loading')
            : T('/oneTourPage', 'tour_order_form_button')}
        </NavLink>
      </button>
    </form>
  );
};

export default OneTourOrderForm;
