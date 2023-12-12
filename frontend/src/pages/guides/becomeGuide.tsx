import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TextField from '@/components/UI/TextField/TextField';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import { becomeGuide } from '@/containers/guides/guidesThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { ISendGuideRequest } from '@/type';
import peopleIcon from '@/assets/images/people-icon.svg';
import phoneIcon from '@/assets/images/phone-icon.svg';
import { selectGuideRequestLoading } from '@/containers/guides/guidesSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';

const BecomeGuide = () => {
  const initialState = {
    name: '',
    surname: '',
    number: '',
    message: '',
  };
  const dispatch = useAppDispatch();
  const guideRequestLoading = useAppSelector(selectGuideRequestLoading);
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const [state, setSate] = useState<ISendGuideRequest>(initialState);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  const onChange = (e: IChangeEvent) => {
    const { name, value } = e.target;
    setSate((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(becomeGuide(state));
      dispatch(addAlert({ message: 'Request is sent', type: 'info' }));
      setSate(initialState);
      void router.push('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  return (
    <div className="container">
      <PageLoader />
      <div className="become-guide">
        <form onSubmit={onSubmit} className="become-guide-form">
          <h2>Become a guide</h2>
          <TextField
            name="name"
            type="text"
            value={state.name}
            onChange={onChange}
            icon={peopleIcon.src}
            label="name*"
            required
          />
          <TextField
            name="surname"
            type="text"
            value={state.surname}
            onChange={onChange}
            icon={peopleIcon.src}
            label="surname*"
            required
          />
          <TextField
            name="number"
            type="text"
            value={state.number}
            onChange={onChange}
            icon={phoneIcon.src}
            label="phone number*"
            required
          />
          <textarea
            className="guide-request-description"
            value={state.message}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? '' : 'describe yourself*'}
            name="message"
            required
          />
          <button type="submit" className="form-tour-btn">
            {guideRequestLoading ? <ButtonLoader size={18} /> : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeGuide;
