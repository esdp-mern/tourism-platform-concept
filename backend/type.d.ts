import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  email: string;
  avatar?: string;
  appleID?: string;
  googleID?: string;
}

export interface ITourReview {
  user: ObjectId;
  tour: ObjectId;
  comment: string;
  date: string;
}

export interface ITourRating {
  user: ObjectId;
  tour: ObjectId;
  rating: number;
  date: string;
}

export interface IGuideReview {
  user: ObjectId;
  guide: ObjectId;
  comment: string;
  date: string;
}

export interface IGuideRating {
  user: ObjectId;
  guide: ObjectId;
  rating: number;
  date: string;
}

export interface IPartner {
  name: string;
  image: string;
  link: string;
}

export interface IAboutUsBlock {
  title: string;
  description?: string;
  image?: string;
}

export interface ITourPoint {
  coordinates: string;
  icon: string;
  title: string;
  strokeColor: string;
}
