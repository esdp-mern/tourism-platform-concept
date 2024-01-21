import React, { FormEvent, useEffect, useState } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLightMode } from '@/containers/config/configSlice';
import {
  editContacts,
  editContactsImage,
  fetchContacts,
} from '@/containers/contacts/contactsThunk';
import {
  selectContacts,
  selectEditContactsLoading,
} from '@/containers/contacts/contactsSlice';
import { IContactsMutation } from '@/type';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { AxiosError } from 'axios';
import { apiUrl, userRoles } from '@/constants';
import TextField from '@/components/UI/TextField/TextField';
import peopleIcon from '@/assets/images/people-icon.svg';
import penIcon from '@/assets/images/pen-icon-green.svg';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import Image from 'next/image';
import FileInput from '@/components/UI/FileInput/FileInput';
import { GetServerSideProps } from 'next';

const ContactUs = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const user = useAppSelector(selectUser);
  const editContactsLoading = useAppSelector(selectEditContactsLoading);
  const [editModalTitle, setEditModalTitle] = useState<boolean>(false);
  const [editModalInfo, setEditModalInfo] = useState<boolean>(false);

  const [state, setState] = useState<IContactsMutation>({
    title: '',
    description: '',
    image: null,
    country: '',
    address: '',
    phone: '',
  });
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<
    number | null
  >(null);

  const admin = user && user.role === userRoles.admin;

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(setIsLightMode(false));
  }, [dispatch]);

  useEffect(() => {
    if (contacts) {
      setState({
        ...contacts,
        image: null,
      });
    }
  }, [contacts]);

  const onChange = (e: IChangeEvent) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      state.image
        ? await dispatch(editContactsImage({ image: state.image })).unwrap()
        : null;
      await dispatch(editContacts(state)).unwrap();
      await dispatch(fetchContacts());
      setEditModalTitle(false);
      dispatch(addAlert({ message: 'Changes are saved', type: 'info' }));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  const onSubmitInfo = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        editContacts({
          ...state,
        }),
      ).unwrap();

      await dispatch(fetchContacts());
      setEditModalInfo(false);
      dispatch(addAlert({ message: 'Changes are saved', type: 'info' }));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  const onClickCountryInfo = (index: number) => {
    setSelectedCountryIndex(index);
    setEditModalInfo(true);
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

  return (
    <div className="contacts-page">
      <PageLoader />
      <div className="contacts-top">
        <Image
          fill
          src={apiUrl + '/' + contacts?.image}
          alt="nature"
          className="contacts-main-img"
        />
        <div className="contacts-top-info">
          <div className="contacts-top-line"></div>
          <p className="contacts-top-title">
            {contacts && contacts.title ? contacts.title : 'Contact Us'}
            {admin && (
              <button
                className="icon-container-edit-contacts"
                onClick={() => setEditModalTitle(true)}
                style={{ background: 'none' }}
                name="main"
              >
                <Image
                  src={penIcon}
                  alt="Pen Icon"
                  width={20}
                  height={20}
                  className="icon-edit"
                />
              </button>
            )}
          </p>
          {contacts && contacts.description ? (
            <p className="contacts-top-txt">{contacts.description}</p>
          ) : null}
        </div>
      </div>
      <div className="contacts-page-location">
        <div className="container">
          {admin && <div className="add-info">+</div>}
        </div>
      </div>

      <div
        className={`editor-modal ${editModalTitle ? 'editor-modal-open' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setEditModalTitle(false);
        }}
      >
        <div
          className="editor-modal-inner"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={onSubmit}>
            <h2>Edit contact info</h2>
            <TextField
              name="title"
              type="text"
              value={state.title}
              onChange={onChange}
              icon={peopleIcon.src}
              label="Title"
              required
            />
            <TextField
              name="description"
              type="text"
              value={state.description}
              onChange={onChange}
              icon={penIcon.src}
              label="Description"
              required
            />
            <div className="input-wrap" style={{ padding: '20px 0' }}>
              <label className="form-label-avatar avatar" htmlFor="image">
                Image
              </label>
              <FileInput
                onChange={changeFileValue}
                name="image"
                image={state.image}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="form-tour-btn"
              style={{ margin: 0 }}
              name="contacts-title-edit-btn"
            >
              {editContactsLoading ? <ButtonLoader size={18} /> : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
