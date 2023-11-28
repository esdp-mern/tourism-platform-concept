export interface signInMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  email: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  googleID: string;
  appleID: string;
  email: string;
  avatar: string | null;
}

export type TConfidentialUser = Omit<User, 'token'>;

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IGuide {
  _id: string;
  user: IUser;
  description: string;
  languages: string[];
  country: string;
  image: string;
}

export interface IGuideFull extends IGuide {
  user: TConfidentialUser;
}

export interface Tour {
  _id: string;
  guides: IGuide[];
  category: [];
  name: string;
  description: string;
  duration: number;
  plan: [{ title: string; planDescription: string; _id: string }];
  country: string;
  destination: string;
  arrival: string;
  departure: string;
  dressCode: string;
  included: [];
  galleryTour: [];
  mainImage: string;
  price: number;
  isPublished: boolean;
}

export interface TourFull extends Tour {
  guides: IGuideFull[];
  ratingTour: number;
  commentTour: IReview[];
}

export interface IPlan {
  title: string;
  planDescription: string;
}

export interface ITourMutation {
  guides: string[];
  category: string[];
  name: string;
  description: string;
  duration: string;
  plan: IPlan[];
  country: string;
  destination: string;
  arrival: string;
  departure: string;
  dressCode: string;
  included: string[];
  galleryTour: File[] | null;
  mainImage: File | null;
  price: string;
}

export interface ITourReview {
  user: string;
  tour: string | null;
  comment: string;
}

export interface ITourReview2 extends ITourReview {
  _id: string;
  date: string;
}

export interface IOrder {
  guide: string;
  tour: string;
  price: number;
  date: string;
  user?: string;
  email?: string;
  phone?: string;
}

export interface IOrderForm {
  guide: string;
  date: string;
  email?: string;
  phone?: string;
}

export interface ReviewOfTour {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  tour: string;
  comment: string;
  date: string;
}
export interface RatingOfTour {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  tour: string;
  rating: number;
  date: string;
}
export interface IAlert {
  message: string;
  type: string;
  id: string;
  visible: boolean;
  className: string;
}

export interface INews {
  _id: string;
  title: string;
  date: string;
  description: string;
  images: [string];
  category: [string];
}

export interface IEmployee {
  _id: string;
  name: string;
  number: string;
  role: string;
  image: string;
}

export interface IOrder2 {
  _id: string;
  guide: {
    _id: string;
    user: {
      displayName: string;
    };
  };
  tour: {
    _id: string;
    name: string;
  };
  price: number;
  date: string;
  user?: {
    displayName: string;
  };
  email?: string;
  phone?: string;
  datetime: string;
}
