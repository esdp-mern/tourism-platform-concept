import path from 'path';
import { config as configDotenv } from 'dotenv';

configDotenv();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://127.0.0.1:27017/tourism-platform-concept',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  auth: {
    user: process.env.TRANSPORT_AUTH_USER,
    pass: process.env.TRANSPORT_AUTH_PASS,
  },
};

export default config;
