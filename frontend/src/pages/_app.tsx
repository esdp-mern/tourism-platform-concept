import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/store/store';
import AppToolBar from '@/components/UI/AppToolBar/AppToolBar';
import '@/styles/globals.css';
import '@/styles/ToursPage.css';
import '@/styles/TourItem.css';
import '@/styles/AppToolBar.css';
import '@/styles/ButtonLoader.css';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Provider store={store}>
        <header>
          <AppToolBar />
        </header>

        <main>
          <Component {...props.pageProps} />
        </main>
      </Provider>
    </>
  );
}
