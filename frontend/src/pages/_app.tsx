import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { wrapper } from '@/store/store';
import { GOOGLE_CLIENT_ID } from '@/constants';
import AppToolBar from '@/components/UI/AppToolBar/AppToolBar';
import '@/styles/globals.css';
import '@/styles/ToursPage.css';
import '@/styles/TourItem.css';
import '@/styles/AppToolBar.css';
import '@/styles/ButtonLoader.css';
import '@/styles/FileInput.css';
import '@/styles/SignInForm.css';
import '@/styles/SignUpForm.css';
import '@/styles/MainSlider.css';
import '@/styles/Footer.css';
import Footer from '@/components/Footer/Footer';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <header>
            <AppToolBar />
          </header>
          <main>
            <Component {...props.pageProps} />
          </main>
         <footer>
          <Footer />
        </footer>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}
