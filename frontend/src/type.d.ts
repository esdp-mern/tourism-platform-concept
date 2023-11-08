export interface signInMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  email: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID: string;
  appleID: string;
  email: string;
}

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

export interface Tour {
  _id: string;
  guide: [string];
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
