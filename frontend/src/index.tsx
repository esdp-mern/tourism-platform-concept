import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { addInterceptors } from './axiosApi';
import { GOOGLE_CLIENT_ID } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

addInterceptors(store);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </PersistGate>
      </Provider>
      ,
    </GoogleOAuthProvider>,
  );
});
