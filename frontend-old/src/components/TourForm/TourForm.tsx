import React, { useState } from 'react';
import { IPlan, ITourMutation } from '../../type';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileInput from '../UI/FileInput/FileInput';
import ButtonLoader from '../Loaders/ButtonLoader';
import {
  selectPostTourError,
  selectPostTourLoading,
} from '../../store/toursSlice';
import { postTour } from '../../store/toursThunk';
import './TourForm.css';
import '../../App.css';

const TourForm = () => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const loading = useAppSelector(selectPostTourLoading);
  const navigate = useNavigate();

  const [state, setState] = useState<ITourMutation>({
    name: '',
    country: '',
    mainImage: null,
    duration: '',
    price: '',
    description: '',
    destination: '',
    arrival: '',
    departure: '',
    included: [],
    dressCode: '',
    category: [],
    galleryTour: null,
    plan: [],
    guide: [],
  });

  const [plan, setPlan] = useState<IPlan[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [guide, setGuide] = useState<string[]>([]);
  const [included, setIncluded] = useState<string[]>([]);
  const [galleryTour, setGalleryTour] = useState<File[]>([]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      state.plan = plan;
      state.category = category;
      state.guide = guide;
      state.included = included;
      state.galleryTour = galleryTour;
      console.log(state);
      await dispatch(postTour(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Invalid field');
    }
  };

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
  const inputChangeHandlerMassive = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number,
    type: 'plan' | 'guide' | 'category' | 'included',
  ) => {
    const { name, value } = event.target;

    switch (type) {
      case 'plan':
        setPlan((prevState) => {
          const updatedPlan = [...prevState];
          updatedPlan[index] = {
            ...updatedPlan[index],
            [name]: value,
          };
          return updatedPlan;
        });
        break;

      case 'guide':
        setGuide((prevState) => {
          const updatedGuide = [...prevState];
          updatedGuide[index] = value;
          return updatedGuide;
        });
        break;

      case 'category':
        setCategory((prevState) => {
          const updatedCategory = [...prevState];
          updatedCategory[index] = value;
          return updatedCategory;
        });
        break;

      case 'included':
        setIncluded((prevState) => {
          const updatedIncluded = [...prevState];
          updatedIncluded[index] = value;
          return updatedIncluded;
        });
        break;

      default:
        break;
    }
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      if (name === 'mainImage') {
        setState((prevState) => ({
          ...prevState,
          [name]: files[0],
        }));
      } else if (name === 'galleryTour') {
        setGalleryTour(Array.from(files));
      }
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch {
      return undefined;
    }
  };

  const addOneItem = (type: 'plan' | 'guide' | 'category' | 'included') => {
    switch (type) {
      case 'plan':
        setPlan((prevState) => [
          ...prevState,
          { title: '', planDescription: '' },
        ]);
        break;

      case 'guide':
        setGuide((prevState) => [...prevState, '']);
        break;

      case 'category':
        setCategory((prevState) => [...prevState, '']);
        break;

      case 'included':
        setIncluded((prevState) => [...prevState, '']);
        break;

      default:
        break;
    }
  };

  const removeOneItem = (index: number, type: string) => {
    switch (type) {
      case 'plan':
        setPlan((prevState) => {
          const updatedPlans = [...prevState];
          updatedPlans.splice(index, 1);
          return updatedPlans;
        });
        break;

      case 'guide':
        setGuide((prevState) => {
          const updatedGuides = [...prevState];
          updatedGuides.splice(index, 1);
          return updatedGuides;
        });
        break;

      case 'category':
        setCategory((prevState) => {
          const updatedCategories = [...prevState];
          updatedCategories.splice(index, 1);
          return updatedCategories;
        });
        break;

      case 'included':
        setIncluded((prevState) => {
          const updatedIncluded = [...prevState];
          updatedIncluded.splice(index, 1);
          return updatedIncluded;
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className="form-block">
      <form className="form-tour" onSubmit={submitFormHandler}>
        <h2 className="form-tour-title">Create Tour</h2>
        <div className="input-tour-wrap">
          <label htmlFor="name" className="form-tour-label">
            Tour name:
          </label>
          {Boolean(getFieldError('name')) && (
            <span className="error-tour">{getFieldError('name')}</span>
          )}
          <input
            type="text"
            className={
              getFieldError('name')
                ? 'form-tour-control-error'
                : 'form-tour-control'
            }
            name="name"
            id="name"
            value={state.name}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="input-tour-wrap">
          <label htmlFor="country" className="form-tour-label">
            Country:
          </label>
          {Boolean(getFieldError('country')) && (
            <span className="error-tour">{getFieldError('country')}</span>
          )}
          <input
            type="text"
            className={
              getFieldError('country')
                ? 'form-tour-control-error'
                : 'form-tour-control'
            }
            name="country"
            id="country"
            value={state.country}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="input-tour-wrap">
          <label htmlFor="duration" className="form-tour-label">
            Duration:
          </label>
          {Boolean(getFieldError('duration')) && (
            <span className="error-tour">{getFieldError('duration')}</span>
          )}
          <input
            type="number"
            className={
              getFieldError('duration')
                ? 'form-tour-control-error'
                : 'form-tour-control'
            }
            name="duration"
            id="duration"
            value={state.duration}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="input-tour-wrap">
          <label htmlFor="price" className="form-tour-label">
            Price:
          </label>
          {Boolean(getFieldError('price')) && (
            <span className="error-tour">{getFieldError('price')}</span>
          )}
          <input
            type="number"
            className={
              getFieldError('price')
                ? 'form-tour-control-error'
                : 'form-tour-control'
            }
            name="price"
            id="price"
            value={state.price}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="input-tour-wrap">
          <label className="form-tour-label">Main picture of the tour:</label>
          <FileInput
            onChange={changeFileValue}
            name="mainImage"
            image={state.mainImage}
            className="form-tour-control"
          />
        </div>

        <div className="input-tour-wrap">
          <label htmlFor="description" className="form-tour-label">
            Description:
          </label>
          {Boolean(getFieldError('description')) && (
            <span className="error-tour">{getFieldError('description')}</span>
          )}
          <textarea
            className={
              getFieldError('name') ? 'form-control-error' : 'form-tour-control'
            }
            name="description"
            id="description"
            value={state.description}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="input-tour-wrap">
          <label htmlFor="destination" className="form-tour-label">
            Destination:
          </label>
          {Boolean(getFieldError('destination')) && (
            <span className="error-tour">{getFieldError('destination')}</span>
          )}
          <input
            type="text"
            className={
              getFieldError('destination')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="destination"
            id="destination"
            value={state.destination}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="input-tour-wrap">
          <label htmlFor="arrival" className="form-tour-label">
            Arrival:
          </label>
          {Boolean(getFieldError('arrival')) && (
            <span className="error-tour">{getFieldError('arrival')}</span>
          )}
          <textarea
            className={
              getFieldError('arrival')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="arrival"
            id="arrival"
            value={state.arrival}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="input-tour-wrap">
          <label htmlFor="departure" className="form-tour-label">
            Departure:
          </label>
          {Boolean(getFieldError('departure')) && (
            <span className="error-tour">{getFieldError('departure')}</span>
          )}
          <textarea
            className={
              getFieldError('departure')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="departure"
            id="departure"
            value={state.departure}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="input-tour-wrap">
          <label htmlFor="dressCode" className="form-tour-label">
            Dress Code:
          </label>
          {Boolean(getFieldError('dressCode')) && (
            <span className="error-tour">{getFieldError('dressCode')}</span>
          )}
          <textarea
            className={
              getFieldError('dressCode')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="dressCode"
            id="dressCode"
            value={state.dressCode}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div
          style={{
            borderTop: '1px solid #000f56',
            borderBottom: '1px solid #000f56',
            textAlign: 'center',
            margin: '10px auto',
            padding: '5px',
          }}
        >
          <h5 className="form-tour-title">What is Included?</h5>

          <button
            type="button"
            className="form-tour-btn-add"
            onClick={() => addOneItem('included')}
          >
            Add tag
          </button>
          {included.map((including, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
              <span className="form-tour-center">{index + 1}:</span>
              <input
                type="text"
                className="form-tour-control form-tour-center"
                name={`in${index}`}
                id={`in${index}`}
                value={including}
                onChange={(event) =>
                  inputChangeHandlerMassive(event, index, 'included')
                }
                required
              />

              <button
                type="button"
                onClick={() => removeOneItem(index, 'included')}
                className="tour-btn-remove"
              >
                -
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid #000f56',
            borderBottom: '1px solid #000f56',
            textAlign: 'center',
            margin: '10px auto',
            padding: '5px',
          }}
        >
          <h5 className="form-tour-title">Categories:</h5>

          <button
            type="button"
            className="form-tour-btn-add"
            onClick={() => addOneItem('category')}
          >
            Add Category
          </button>
          {category.map((category, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
              <span className="form-tour-center">{index + 1}:</span>
              <input
                type="text"
                className="form-tour-control form-tour-center"
                name={`in${index}`}
                id={`in${index}`}
                value={category}
                onChange={(event) =>
                  inputChangeHandlerMassive(event, index, 'category')
                }
                required
              />

              <button
                type="button"
                onClick={() => removeOneItem(index, 'category')}
                className="tour-btn-remove"
              >
                -
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid #000f56',
            borderBottom: '1px solid #000f56',
            textAlign: 'center',
            margin: '10px auto',
            padding: '5px',
          }}
        >
          <h5 className="form-tour-title">Tour plan:</h5>

          <button
            type="button"
            className="form-tour-btn-add"
            onClick={() => addOneItem('plan')}
          >
            Add day
          </button>
          {plan.map((singlePlan, index) => (
            <div key={index}>
              <h6>{1 + index} day of the tour:</h6>
              <div className="form-tour-plan">
                <div>
                  <div className="input-tour-wrap">
                    <label htmlFor={`title`} className="form-tour-label">
                      Plan name:
                    </label>
                    <input
                      type="text"
                      className="form-tour-control"
                      name={`title`}
                      id={`title`}
                      value={plan[index].title}
                      onChange={(event) =>
                        inputChangeHandlerMassive(event, index, 'plan')
                      }
                      required
                    />
                  </div>

                  <div className="input-tour-wrap">
                    <label
                      htmlFor={`planDescription${index}`}
                      className="form-tour-label"
                    >
                      Plan description:
                    </label>
                    <textarea
                      className="form-tour-control"
                      name={`planDescription`}
                      id={`planDescription`}
                      value={plan[index].planDescription}
                      onChange={(event) =>
                        inputChangeHandlerMassive(event, index, 'plan')
                      }
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeOneItem(index, 'plan')}
                  className="tour-btn-remove btn-remove-plan"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="input-tour-wrap">
          <label className="form-tour-label">Gallery of the tour:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={changeFileValue}
            name="galleryTour"
            className="form-tour-control"
          />
        </div>

        <button type="submit" className="form-tour-btn">
          {loading ? <ButtonLoader size={18} /> : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default TourForm;
