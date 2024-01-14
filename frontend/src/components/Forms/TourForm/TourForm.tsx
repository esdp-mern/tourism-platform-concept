import React, { useEffect, useState } from 'react';
import { IPlan, ITourMutation } from '@/type';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import FileInput from '@/components/UI/FileInput/FileInput';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import {
  selectOneTour,
  selectPostTourError,
  selectPostTourLoading,
} from '@/containers/tours/toursSlice';
import { editTour, postTour } from '@/containers/tours/toursThunk';
import { useRouter } from 'next/router';
import TextFieldGuide from '@/components/UI/TextField/components/TextFieldGuide';
import FilesInput from '@/components/UI/FileInput/FilesInput';
import { nanoid } from 'nanoid';
import TextField from '@/components/UI/TextField/TextField';
import invisibleIcon from '@/assets/images/invisible.svg';
import { addAlert } from '@/containers/users/usersSlice';
import SelectCategory from '@/components/SelectCategory/SelectCategory';
import { mapMarkerCategories } from '@/constants';

interface Props {
  isEdit?: boolean;
  idTour?: string;
}

const colors = [
  '#3391fc',
  '#9b33fc',
  '#8ef548',
  '#ff5252',
  '#fabc29',
  '#cb50ff',
];
const initialState = {
  name: '',
  country: '',
  mainImage: null,
  duration: 0,
  price: 0,
  description: '',
  destination: '',
  arrival: '',
  departure: '',
  included: [],
  dressCode: '',
  category: [],
  galleryTour: null,
  plan: [],
  guides: [],
  routes: [
    [
      {
        id: nanoid(),
        coordinates: '',
        title: '',
        strokeColor: colors[0],
        icon: { src: 'mapMarkers/default-map-marker.svg', type: 'default' },
      },
    ],
  ],
} as ITourMutation;

const TourForm: React.FC<Props> = ({ isEdit, idTour }) => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const loading = useAppSelector(selectPostTourLoading);
  const tour = useAppSelector(selectOneTour);
  const routers = useRouter();
  const [state, setState] = useState<ITourMutation>(
    isEdit && tour
      ? {
          ...tour,
          guides: tour.guides.map((guide) => {
            return guide._id;
          }),
          mainImage: null,
          galleryTour: [],
        }
      : initialState,
  );
  const [plan, setPlan] = useState<IPlan[]>((tour && tour.plan) || []);
  const [category, setCategory] = useState<string[]>(
    (tour && tour.category) || [],
  );
  const [guide, setGuide] = useState<string[]>(
    (tour &&
      tour.guides.map((guide) => {
        return guide._id;
      })) ||
      [],
  );
  const [included, setIncluded] = useState<string[]>(
    (tour && tour.included) || [],
  );
  const [galleryTour, setGalleryTour] = useState<File[]>(
    (tour && tour.galleryTour) || [],
  );
  const [markersInputSelected, setMarkersInputSelected] = useState({
    routeIndex: 0,
    checkpointId: '',
  });
  const [colorInputSelected, setColorInputSelected] = useState(-1);

  useEffect(() => {
    document.addEventListener('click', () => {
      setMarkersInputSelected({
        routeIndex: -1,
        checkpointId: '',
      });
      setColorInputSelected(-1);
    });

    if (tour) {
      const guides = tour.guides.map((guide) => {
        return guide._id;
      });

      const editingTour = {
        name: tour.name,
        country: tour.country,
        mainImage: null,
        duration: tour.duration,
        price: tour.price,
        description: tour.description,
        destination: tour.destination,
        arrival: tour.arrival,
        departure: tour.departure,
        dressCode: tour.dressCode,
        included: tour.included,
        category: tour.category,
        galleryTour: null,
        plan: tour.plan,
        guides: guides,
        routes: tour.routes,
      };
      setState(editingTour);
      setPlan(tour.plan);
    }
    if (!isEdit) {
      setState(initialState);
    }
  }, [isEdit, tour]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && idTour) {
        await dispatch(
          editTour({
            id: idTour,
            tourMutation: {
              ...state,
              plan: plan,
              category: category,
              guides: guide,
              included: included,
              galleryTour: galleryTour,
            },
          }),
        ).unwrap();
      } else {
        await dispatch(postTour(state)).unwrap();
      }
      routers.push('/').then((r) => r);
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

  const onRoutePointInputChange = (
    name: string,
    value: string,
    routeIndex: number,
    checkpointId: string,
  ) => {
    setState((prevState) => {
      const updatedRoutes = prevState.routes.map((route, index) => {
        if (index === routeIndex) {
          return route.map((point) => {
            if (point.id === checkpointId) {
              return {
                ...point,
                [name]: value,
              };
            }
            return point;
          });
        }
        return route;
      });

      return {
        ...prevState,
        routes: updatedRoutes,
      };
    });
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

  const addCheckpoint = (index: number) => {
    const updatedRoutes = state.routes.map((route, i) => {
      if (index === i) {
        return [
          ...route,
          {
            id: nanoid(),
            coordinates: '',
            title: '',
            strokeColor: colors[0],
            icon: { src: 'mapMarkers/default-map-marker.svg', type: 'default' },
          },
        ];
      }
      return route;
    });

    setState((prevState) => ({
      ...prevState,
      routes: updatedRoutes,
    }));
  };

  const addRoute = () => {
    const updatedRoutes = [...state.routes];
    updatedRoutes.push([
      {
        id: nanoid(),
        coordinates: '',
        title: '',
        strokeColor: colors[0],
        icon: { src: 'mapMarkers/default-map-marker.svg', type: 'default' },
      },
    ]);
    setState((prevState) => ({
      ...prevState,
      routes: updatedRoutes,
    }));
  };

  const removeCheckpoint = (routeIndex: number, checkpointId: string) => {
    if (state.routes.length === 1 && state.routes[0].length === 1) {
      return dispatch(
        addAlert({
          message: 'At least one checkpoint must been provided!',
          type: 'warning',
        }),
      );
    }
    let updatedRoutes = state.routes.map((route, index) => {
      if (index === routeIndex) {
        return route.filter((point) => point.id !== checkpointId);
      }
      return route;
    });

    setState((prevState) => ({
      ...prevState,
      routes: updatedRoutes.filter((route) => route.length > 0),
    }));
  };

  const onMarkerCategorySelect = (
    routeIndex: number,
    checkpointId: string,
    markerData: {
      src: string;
      type: string;
    },
  ) => {
    setState((prevState) => {
      const updatedRoutes = prevState.routes.map((route, index) => {
        if (index === routeIndex) {
          return route.map((point) => {
            if (point.id === checkpointId) {
              return {
                ...point,
                icon: markerData,
              };
            }
            return point;
          });
        }
        return route;
      });

      return {
        ...prevState,
        routes: updatedRoutes,
      };
    });
  };

  const onMarkerColorSelect = (routeIndex: number, markerColor: string) => {
    const updatedRoutes = state.routes.map((route, index) => {
      if (index === routeIndex) {
        return route.map((point) => ({
          ...point,
          strokeColor: markerColor,
        }));
      }
      return route;
    });

    setState((prevState) => ({
      ...prevState,
      routes: updatedRoutes,
    }));
  };

  return (
    <div>
      <form className="form-tour" onSubmit={submitFormHandler}>
        <h2 className="form-tour-title">
          {isEdit ? 'Edit Tour' : 'Create Tour'}
        </h2>
        <div className="input-tour-wrap">
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
          <label htmlFor="name" className="form-tour-label">
            Tour name:
          </label>
          {Boolean(getFieldError('name')) && (
            <span className="error-tour">{getFieldError('name')}</span>
          )}
        </div>
        <div className="input-tour-wrap" style={{ margin: '20px auto' }}>
          <h5 className="form-tour-title">
            Guides for {state.name ? state.name : 'this'} tour:
          </h5>
          <TextFieldGuide
            name="guide"
            selectedGuideIds={guide}
            onSelect={(selectedGuideIds) => {
              setGuide(selectedGuideIds);
            }}
          />
        </div>
        <div className="input-tour-wrap">
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
          <label htmlFor="country" className="form-tour-label">
            Country:
          </label>
          {Boolean(getFieldError('country')) && (
            <span className="error-tour">{getFieldError('country')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
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
          <label htmlFor="duration" className="form-tour-label">
            Duration:
          </label>
          {Boolean(getFieldError('duration')) && (
            <span className="error-tour">{getFieldError('duration')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
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
          <label htmlFor="price" className="form-tour-label">
            Price:
          </label>
          {Boolean(getFieldError('price')) && (
            <span className="error-tour">{getFieldError('price')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <FileInput
            onChange={changeFileValue}
            name="mainImage"
            image={state.mainImage}
            className="form-tour-control"
          />
          <label
            htmlFor="destination"
            className="form-tour-label form-tour-label-image"
          >
            Main image:
          </label>
        </div>
        <div className="input-tour-wrap">
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
          <label htmlFor="description" className="form-tour-label-two">
            Description:
          </label>
          {Boolean(getFieldError('description')) && (
            <span className="error-tour">{getFieldError('description')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
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
          <label htmlFor="destination" className="form-tour-label">
            Destination:
          </label>
          {Boolean(getFieldError('destination')) && (
            <span className="error-tour">{getFieldError('destination')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
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
          <label htmlFor="arrival" className="form-tour-label-two">
            Arrival:
          </label>
          {Boolean(getFieldError('arrival')) && (
            <span className="error-tour">{getFieldError('arrival')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
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
          <label htmlFor="departure" className="form-tour-label-two">
            Departure:
          </label>
          {Boolean(getFieldError('departure')) && (
            <span className="error-tour">{getFieldError('departure')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
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
          <label htmlFor="dressCode" className="form-tour-label-two">
            Dress Code:
          </label>
          {Boolean(getFieldError('dressCode')) && (
            <span className="error-tour">{getFieldError('dressCode')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <FilesInput
            onChange={changeFileValue}
            name="galleryTour"
            className="form-tour-control"
          />
          <label
            htmlFor="destination"
            className="form-tour-label form-tour-label-image"
          >
            Gallery image:
          </label>
        </div>
        <div className="form-tour-included">
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
        <div className="form-tour-included">
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
        <div className="form-tour-included">
          <h5 className="form-tour-title">Tour plan:</h5>
          <button
            type="button"
            className="form-tour-btn-add"
            onClick={() => addOneItem('plan')}
          >
            Add day
          </button>
          {plan.map((_, index) => (
            <div key={index}>
              <h6>{1 + index} day of the tour:</h6>
              <div className="form-tour-plan">
                <div>
                  <div className="input-tour-wrap">
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
                    <label htmlFor={`title`} className="form-tour-label">
                      Plan name:
                    </label>
                  </div>
                  <div className="input-tour-wrap">
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
                    <label
                      htmlFor={`planDescription${index}`}
                      className="form-tour-label-two"
                    >
                      Plan description:
                    </label>
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
        <div className="tour-routes">
          <h5 className="form-tour-title">Tour routes:</h5>
          <div className="tour-routes-inner">
            {state.routes.map((route, index) => (
              <div className="tour-route" key={index}>
                <SelectCategory
                  type="colors"
                  colorValue={route[0].strokeColor}
                  onColorSelect={onMarkerColorSelect}
                  routeIndex={index}
                  selected={colorInputSelected === index}
                  onToggle={() => {
                    setColorInputSelected(colorInputSelected >= 0 ? -1 : index);
                    if (markersInputSelected) {
                      setMarkersInputSelected({
                        routeIndex: -1,
                        checkpointId: '',
                      });
                    }
                  }}
                  colorCategories={colors}
                  markerCategories={[]}
                  onMarkerSelect={() => {}}
                />
                {route.map((point, index) => (
                  <div className="tour-route-point" key={index}>
                    <span
                      className="remove-checkpoint"
                      onClick={() =>
                        removeCheckpoint(index, point.id ? point.id : '')
                      }
                    >
                      ×
                    </span>
                    <TextField
                      name="coordinates"
                      type="text"
                      value={point.coordinates}
                      onChange={(e) =>
                        onRoutePointInputChange(
                          e.target.name,
                          e.target.value,
                          index,
                          point.id ? point.id : '',
                        )
                      }
                      icon={invisibleIcon.src}
                      label="coordinates"
                      required
                    />
                    <TextField
                      name="title"
                      label="title"
                      type="text"
                      value={point.title}
                      onChange={(e) =>
                        onRoutePointInputChange(
                          e.target.name,
                          e.target.value,
                          index,
                          point.id ? point.id : '',
                        )
                      }
                      icon={invisibleIcon.src}
                      required
                    />
                    <SelectCategory
                      type="markers"
                      markerValue={point.icon}
                      onMarkerSelect={onMarkerCategorySelect}
                      onColorSelect={() => {}}
                      routeIndex={index}
                      checkpointId={point.id}
                      selected={
                        markersInputSelected.routeIndex === index &&
                        markersInputSelected.checkpointId === point.id
                      }
                      onToggle={() => {
                        setMarkersInputSelected({
                          routeIndex:
                            markersInputSelected.routeIndex >= 0 ? -1 : index,
                          checkpointId: markersInputSelected.checkpointId.length
                            ? ''
                            : point.id,
                        });
                        setColorInputSelected(-1);
                      }}
                      markerCategories={mapMarkerCategories}
                      colorCategories={[]}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="form-tour-btn-add"
                  onClick={() => addCheckpoint(index)}
                >
                  Add new checkpoint
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="form-tour-btn-add"
            onClick={addRoute}
          >
            Add new route
          </button>
        </div>
        <button type="submit" className="form-tour-btn">
          {loading ? (
            <ButtonLoader size={18} />
          ) : isEdit ? (
            'Save Tour'
          ) : (
            'Create Tour'
          )}
        </button>
      </form>
    </div>
  );
};

export default TourForm;
