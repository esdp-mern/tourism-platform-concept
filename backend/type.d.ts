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

export interface IGuideReview {
  user: ObjectId;
  guide: ObjectId;
  comment: string;
  date: string;
}
