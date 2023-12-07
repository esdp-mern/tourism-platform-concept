import React, { useState } from 'react';
import { IEmployeeMutation } from '@/type';
import { useAppDispatch } from '@/store/hooks';
import { useSelector } from 'react-redux';
import { selectPostTourError } from '@/containers/tours/toursSlice';
import { useRouter } from 'next/router';
import { editEmployees, postEmployees } from '@/containers/about/aboutThunk';
import FileInput from '@/components/UI/FileInput/FileInput';
import { addEmployee } from '@/containers/about/aboutSlice';

interface Props {
  existingEmployee?: IEmployeeMutation;
  isEdit?: boolean;
  idEmployee?: string;
}

const initialState = {
  name: '',
  number: '',
  role: '',
  image: null,
};
const EmployeeForm: React.FC<Props> = ({
  isEdit,
  existingEmployee = initialState,
  idEmployee,
}) => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const routers = useRouter();
  const [state, setState] = useState<IEmployeeMutation>(existingEmployee);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && idEmployee) {
        const obj = {
          id: idEmployee,
          employeeMutation: state,
        };
        await dispatch(editEmployees(obj)).unwrap();
        dispatch(addEmployee(state));
        routers.push('/about').then((r) => r);
      } else {
        await dispatch(postEmployees(state)).unwrap();
      }
      routers.push('/about').then((r) => r);
    } catch (e) {
      alert('Invalid field');
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch {
      return undefined;
    }
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      console.log(e.target.files, e.target.name);
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form className="form-employees" onSubmit={submitFormHandler}>
      <h2 className="form-employees-title">
        {isEdit ? 'Save Employee' : 'Create Employee'}
      </h2>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('name') ? 'form-control-error' : 'form-control'
          }
          name="name"
          id="name"
          value={state.name}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="name" className="form-label">
          Employee name:
        </label>
        {Boolean(getFieldError('name')) && (
          <span className="error">{getFieldError('name')}</span>
        )}
      </div>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('number') ? 'form-control-error' : 'form-control'
          }
          name="number"
          id="number"
          value={state.number}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="number" className="form-label">
          Employee number:
        </label>
        {Boolean(getFieldError('number')) && (
          <span className="error">{getFieldError('number')}</span>
        )}
      </div>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('role') ? 'form-control-error' : 'form-control'
          }
          name="role"
          id="role"
          value={state.role}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="role" className="form-label">
          Employee role:
        </label>
        {Boolean(getFieldError('role')) && (
          <span className="error">{getFieldError('role')}</span>
        )}
      </div>
      <div className="input-wrap">
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
      <div className="form-wrap-btn">
        <button type="submit" className="form-btn">
          {isEdit ? 'Save employee' : 'Create employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
