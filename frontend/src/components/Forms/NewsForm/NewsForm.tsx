import React, { useState } from 'react';
import { INewsMutation } from '@/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useSelector } from 'react-redux';
import {
  selectPostTourError,
  selectPostTourLoading,
} from '@/containers/tours/toursSlice';
import { useRouter } from 'next/router';
import { editNews, postNews } from '@/containers/news/newsThunk';
import FilesInput from '@/components/UI/FileInput/FilesInput';
import ButtonLoader from '@/components/Loaders/ButtonLoader';

interface Props {
  existingNews?: INewsMutation;
  isEdit?: boolean;
  idNews?: string;
}

const initialState = {
  title: '',
  description: '',
  category: [],
  images: null,
};

const NewsForm: React.FC<Props> = ({
  isEdit,
  existingNews = initialState,
  idNews,
}) => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const loading = useAppSelector(selectPostTourLoading);
  const routers = useRouter();
  const [state, setState] = useState<INewsMutation>(existingNews);

  const [images, setImages] = useState<File[]>(existingNews.images || []);
  const [category, setCategory] = useState<string[]>(
    existingNews.category || [],
  );

  const inputChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      state.category = category;
      state.images = images;
      if (isEdit && idNews) {
        const obj = {
          id: idNews,
          newsMutation: state,
        };
        await dispatch(editNews(obj)).unwrap();
      } else {
        await dispatch(postNews(state)).unwrap();
      }
      routers.push('/').then((r) => r);
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
      setImages(Array.from(files));
    }
  };

  const addOneItem = () => {
    setCategory((prevState) => [...prevState, '']);
  };

  const removeOneItem = (index: number) => {
    setCategory((prevState) => {
      const updatedCategories = [...prevState];
      updatedCategories.splice(index, 1);
      return updatedCategories;
    });
  };

  const inputChangeHandlerMassive = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number,
  ) => {
    const { name, value } = event.target;

    setCategory((prevState) => {
      const updatedCategory = [...prevState];
      updatedCategory[index] = value;
      return updatedCategory;
    });
  };

  return (
    <form className="form-news" onSubmit={submitFormHandler}>
      <h2 className="form-news-title">
        {isEdit ? 'Save News' : 'Create News'}
      </h2>
      <div className="input-news-wrap">
        <input
          type="text"
          className={
            getFieldError('title')
              ? 'form-news-control-error'
              : 'form-news-control'
          }
          name="title"
          id="title"
          value={state.title}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="title" className="form-news-label">
          News title:
        </label>
        {Boolean(getFieldError('title')) && (
          <span className="error-news">{getFieldError('title')}</span>
        )}
      </div>
      <div className="input-news-wrap">
        <textarea
          className={
            getFieldError('name') ? 'form-news-error' : 'form-news-control'
          }
          name="description"
          id="description"
          value={state.description}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="description" className="form-news-label-two">
          Description:
        </label>
        {Boolean(getFieldError('description')) && (
          <span className="error-tour">{getFieldError('description')}</span>
        )}
      </div>
      <div className="input-news-wrap">
        <FilesInput
          onChange={changeFileValue}
          name="images"
          className="form-news-control"
        />
        <label
          htmlFor="images"
          className="form-images-label form-news-label-image"
        >
          News Images:
        </label>
      </div>
      <div className="form-news-included">
        <h5 className="form-news-title">Categories:</h5>
        <button
          type="button"
          className="form-news-btn-add"
          onClick={() => addOneItem()}
        >
          Add Category
        </button>
        {category.map((category, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
            <span className="form-news-center">{index + 1}:</span>
            <input
              type="text"
              className="form-news-control form-news-center"
              name={`in${index}`}
              id={`in${index}`}
              value={category}
              onChange={(event) => inputChangeHandlerMassive(event, index)}
              required
            />

            <button
              type="button"
              onClick={() => removeOneItem(index)}
              className="news-btn-remove"
            >
              -
            </button>
          </div>
        ))}
      </div>
      <button type="submit" className="form-news-btn">
        {loading ? (
          <ButtonLoader size={18} />
        ) : isEdit ? (
          'Save News'
        ) : (
          'Create News'
        )}
      </button>
    </form>
  );
};

export default NewsForm;
