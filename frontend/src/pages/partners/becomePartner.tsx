import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TextField from '@/components/UI/TextField/TextField';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import PageLoader from '@/components/Loaders/PageLoader';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { addAlert } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { IPartnerOrderMutation } from '@/type';
import peopleIcon from '@/assets/images/people-icon.svg';
import phoneIcon from '@/assets/images/phone-icon.svg';
import { selectPostOrderLoading } from '@/containers/partners/partnersSlice';
import { createPartnerOrder } from '@/containers/partners/partnersThunk';
import FileInput from '@/components/UI/FileInput/FileInput';

const BecomePartner = () => {
  const initialState = {
    name: '',
    number: '',
    message: '',
    link: '',
    image: null,
  };
  const dispatch = useAppDispatch();
  const partnerRequestLoading = useAppSelector(selectPostOrderLoading);
  const router = useRouter();
  const [state, setState] = useState<IPartnerOrderMutation>(initialState);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  const onChange = (e: IChangeEvent) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!(state.name || state.image)) {
      dispatch(
        addAlert({
          message: 'NAME or IMAGE must be filled',
          type: 'error',
        }),
      );
      return;
    }

    if (!state.number) {
      dispatch(
        addAlert({
          message: 'Number is required',
          type: 'error',
        }),
      );
      return;
    }

    try {
      await dispatch(createPartnerOrder(state));
      dispatch(addAlert({ message: 'Request is sent', type: 'info' }));
      setState(initialState);
      void router.push('/admin');
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <div className="container">
      <PageLoader />
      <div className="become-guide">
        <form onSubmit={onSubmit} className="become-guide-form">
          <h2>Become a partner</h2>
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
            name="number"
            type="text"
            value={state.number}
            onChange={onChange}
            icon={phoneIcon.src}
            label="phone number*"
            required
          />
          <TextField
            name="link"
            type="text"
            value={state.link}
            onChange={onChange}
            icon={phoneIcon.src}
            label="link*"
          />
          <textarea
            className="guide-request-description"
            value={state.message}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? '' : 'message*'}
            name="message"
          />
          <div className="input-wrap" style={{ marginTop: '15px' }}>
            <label className="form-label-avatar avatar" htmlFor="image">
              Image
            </label>
            <FileInput
              onChange={onFileChange}
              name="image"
              image={state.image}
              className="form-control"
            />
          </div>
          <button type="submit" className="form-tour-btn">
            {partnerRequestLoading ? <ButtonLoader size={18} /> : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomePartner;
