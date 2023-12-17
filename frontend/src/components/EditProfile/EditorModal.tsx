import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addAlert,
  selectEditLoading,
  selectEditorModal,
  selectUser,
  setEditorModal,
} from '@/containers/users/usersSlice';
import peopleIcon from '@/assets/images/people-icon.svg';
import penIcon from '@/assets/images/pen-icon.svg';
import emailIcon from '@/assets/images/email-icon.svg';
import TextField from '@/components/UI/TextField/TextField';
import FileInput from '@/components/UI/FileInput/FileInput';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import { IEditProfile } from '@/type';
import { editProfile } from '@/containers/users/usersThunk';
import { AxiosError } from 'axios';

const EditorModal = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const modal = useAppSelector(selectEditorModal);
  const editLoading = useAppSelector(selectEditLoading);
  const [state, setSate] = useState<IEditProfile>({
    id: '',
    username: '',
    displayName: '',
    email: '',
    avatar: null,
  });

  useEffect(() => {
    if (!user) return;
    setSate((prevState) => ({
      ...prevState,
      id: user._id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    }));
  }, [user]);

  const onChange = (e: IChangeEvent) => {
    const { name, value } = e.target;
    setSate((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setSate((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(editProfile(state)).unwrap();
      dispatch(addAlert({ message: 'Changes are saved', type: 'info' }));
      dispatch(setEditorModal());
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  return (
    <div
      className={`editor-modal ${modal ? 'editor-modal-open' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setEditorModal());
      }}
    >
      <div className="editor-modal-inner" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <h2>Edit profile</h2>
          <TextField
            name="username"
            type="text"
            value={state.username}
            onChange={onChange}
            icon={peopleIcon.src}
            label="username"
            required
          />
          <TextField
            name="displayName"
            type="text"
            value={state.displayName}
            onChange={onChange}
            icon={penIcon.src}
            label="nickname"
            required
          />
          <TextField
            name="email"
            type="text"
            value={state.email}
            onChange={onChange}
            icon={emailIcon.src}
            label="email"
            required
          />
          <div className="input-wrap" style={{ marginTop: '15px' }}>
            <label className="form-label-avatar avatar" htmlFor="image">
              Image
            </label>
            <FileInput
              onChange={onFileChange}
              name="avatar"
              image={state.avatar}
              className="form-control"
            />
          </div>
          <div>
            <button
              type="submit"
              className="form-tour-btn"
              style={{ margin: 0 }}
            >
              {editLoading ? <ButtonLoader size={18} /> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditorModal;
