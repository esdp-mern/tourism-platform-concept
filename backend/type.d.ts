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

export interface IReview {
  user: ObjectId;
  tour: ObjectId;
  guide: ObjectId;
  comment: string;
  rating: number;
  date: string;
}
