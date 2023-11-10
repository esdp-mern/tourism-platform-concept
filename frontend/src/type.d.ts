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
  user: string;
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
  guides: string[];
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

export interface IPostReview {
  user: string;
  tour: string | null;
  guide: string | null;
  comment: string;
  rating: number;
}

export interface IReview extends IPostReview {
  _id: string;
  date: string;
}

export interface IOrder {
  guide: string;
  date: string;
  email?: string;
  phone?: string;
}
