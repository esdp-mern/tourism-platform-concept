import path from 'path';
import * as dotenv from 'dotenv';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://127.0.0.1:27017/tourism-platform-concept',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
