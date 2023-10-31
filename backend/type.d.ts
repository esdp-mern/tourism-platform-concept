export interface IUser {
  _id: string;
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  email: string;
  appleID?: string;
  googleID?: string;
}

export interface IEquipment {
  name: string;
  description: string;
  price: number;
  quantity: number;
  date: string;
  image: string;
}