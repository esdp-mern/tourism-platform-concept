export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export enum userRoles {
  admin = 'admin',
  user = 'user',
  guide = 'guide',
  moderator = 'moderator',
}

export const languages = {
  en: '',
  ru: '',
  kg: '',
};

export const GOOGLE_CLIENT_ID =
  '302661332601-7q2hnutfbgkh7jlojlkf5flaut32d71q.apps.googleusercontent.com';

export const boardNames = ['booked', 'being considered', 'approved'];

export const LIMIT = 6;
