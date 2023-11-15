import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/store/store';
import '@/styles/globals.css';
import '@/styles/ToursPage.css';
import '@/styles/TourItem.css';
import '@/styles/MainSlider.css';
import '@/styles/Footer.css';
import Footer from '@/components/Footer/Footer';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Provider store={store}>
        <header></header>

        <main>
          <Component {...props.pageProps} />
        </main>
        <footer>
          <Footer />
        </footer>
      </Provider>
    </>
  );
}
