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
import { IContactInfo, IContactsMutation } from '@/type';
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

const ContactUs = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const user = useAppSelector(selectUser);
  const editContactsLoading = useAppSelector(selectEditContactsLoading);
  const [editModalTitle, setEditModalTitle] = useState<boolean>(false);
  const [editModalInfo, setEditModalInfo] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<IContactInfo[]>(
    contacts?.contact || [{ country: '', address: '', phone: '' }],
  );
  const [state, setState] = useState<IContactsMutation>({
    title: '',
    description: '',
    image: null,
    contact: contactInfo,
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

  useEffect(() => {
    if (contacts?.contact) {
      setContactInfo(contacts.contact);
    }
  }, [contacts]);
  const onChange = (e: IChangeEvent) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      state.contact = contactInfo;
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
      const updatedContactInfo = [...contactInfo];

      await dispatch(
        editContacts({
          ...state,
          contact: updatedContactInfo,
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
  const inputChangeHandlerMassive = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = event.target;

    setContactInfo((prevState) => {
      const updatedInfo = [...prevState];
      updatedInfo[index] = {
        ...updatedInfo[index],
        [name]: value,
      };
      return updatedInfo;
    });
  };

  const addOneItem = () => {
    const newContact = { country: '', address: '', phone: '' };
    const updatedInfo = [...contactInfo, newContact];

    console.log(contactInfo);

    setContactInfo(updatedInfo);
    setSelectedCountryIndex(updatedInfo.length - 1);
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
        <img
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
          <div className="contacts-card-main">
            {contacts &&
              contacts.contact &&
              contacts.contact.map((contact, index) => (
                <div
                  className="contacts-card"
                  key={index}
                  onClick={() => onClickCountryInfo(index)}
                >
                  {contact.country ? (
                    <span className="contacts-country">{contact.country}</span>
                  ) : null}
                  {contact.address ? (
                    <span className="contacts-location">{contact.address}</span>
                  ) : null}
                  {contact.phone ? (
                    <span className="contacts-phone">{contact.phone}</span>
                  ) : null}

                  <div
                    className={`editor-modal ${
                      editModalInfo ? 'editor-modal-open' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditModalInfo(false);
                    }}
                  >
                    {selectedCountryIndex !== null && (
                      <div
                        className="editor-modal-inner"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <form onSubmit={onSubmitInfo}>
                          <h2 style={{ margin: '10px 0' }}>
                            Edit contact information
                          </h2>
                          <div className="input-tour-wrap">
                            <input
                              type="text"
                              className="form-tour-control"
                              name={`country`}
                              id={`country`}
                              value={contactInfo[selectedCountryIndex]?.country}
                              onChange={(event) =>
                                inputChangeHandlerMassive(
                                  event,
                                  selectedCountryIndex,
                                )
                              }
                              required
                            />
                            <label
                              htmlFor={`country`}
                              className="form-tour-label"
                            >
                              Country:
                            </label>
                          </div>
                          <div className="input-tour-wrap">
                            <input
                              type="text"
                              className="form-tour-control"
                              name={`address`}
                              id={`address`}
                              value={contactInfo[selectedCountryIndex]?.address}
                              onChange={(event) =>
                                inputChangeHandlerMassive(
                                  event,
                                  selectedCountryIndex,
                                )
                              }
                              required
                            />
                            <label
                              htmlFor={`address`}
                              className="form-tour-label"
                            >
                              Address:
                            </label>
                          </div>
                          <div className="input-tour-wrap">
                            <input
                              type="text"
                              className="form-tour-control"
                              name={`phone`}
                              id={`phone`}
                              value={contactInfo[selectedCountryIndex]?.phone}
                              onChange={(event) =>
                                inputChangeHandlerMassive(
                                  event,
                                  selectedCountryIndex,
                                )
                              }
                              required
                            />
                            <label
                              htmlFor={`phone`}
                              className="form-tour-label"
                            >
                              Phone name:
                            </label>
                          </div>
                          <button
                            type="submit"
                            className="form-btn-delete"
                            onClick={() => {
                              setContactInfo((prevState) => {
                                const updatedInfo = [...prevState];
                                updatedInfo.splice(selectedCountryIndex, 1);
                                return updatedInfo;
                              });
                            }}
                            name="delete-contact-info"
                          >
                            Delete
                          </button>
                          <button
                            type="submit"
                            className="form-tour-btn"
                            style={{ margin: 0 }}
                            name="contacts-title-edit-btn"
                          >
                            {editContactsLoading ? (
                              <ButtonLoader size={18} />
                            ) : (
                              'Save'
                            )}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {admin && (
            <div
              className="add-info"
              onClick={() => {
                if (!contactInfo || contactInfo.length <= 0) {
                  setContactInfo((prevState) => [
                    ...prevState,
                    { country: '', address: '', phone: '' },
                  ]);
                } else {
                  addOneItem();
                }
                setEditModalInfo(true);
              }}
            >
              +
            </div>
          )}
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

      <div className="container">
        <form className="contact-form">
          <h3 className="contact-form-title">Get in Touch</h3>
          <div className="contacts-first-inputs">
            <div className="contact-form-textarea">
              <textarea
                className="contact-form-input-name"
                placeholder="Name"
                required
              />
            </div>
            <div className="contact-form-textarea">
              <textarea
                className="contact-form-input-phone"
                placeholder="Phone"
                required
              />
            </div>
            <div className="contact-form-textarea">
              <textarea
                className="contact-form-input-email"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="contact-form-textarea">
            <textarea
              className="contact-form-input-message"
              placeholder="Message"
              required
            />
          </div>
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
