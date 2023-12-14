import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { wrapper } from '@/store/store';
import { GOOGLE_CLIENT_ID } from '@/constants';
import { addInterceptors } from '@/axiosApi';
import AppToolBar from '@/components/UI/AppToolBar/AppToolBar';
import Alerts from '@/components/Alert/Alerts';
import Footer from '@/components/Footer/Footer';
import '@/styles/globals.css';
import '@/styles/ToursPage.css';
import '@/styles/TourItem.css';
import '@/styles/AppToolBar.css';
import '@/styles/ButtonLoader.css';
import '@/styles/FileInput.css';
import '@/styles/SignInForm.css';
import '@/styles/MainSlider.css';
import '@/styles/Footer.css';
import '@/styles/Gallery.css';
import '@/styles/Map.css';
import '@/styles/OneTourInformation.css';
import '@/styles/OneTourOrderForm.css';
import '@/styles/OneTourPage.css';
import '@/styles/OneTourPlan.css';
import '@/styles/OneTourReview.css';
import '@/styles/newReviewForm.css';
import '@/styles/OneTourOrderForm.css';
import '@/styles/TextField.css';
import '@/styles/TextFieldSelect.css';
import '@/styles/fonts.css';
import '@/styles/about.css';
import '@/styles/pageLoader.css';
import '@/styles/TourForm.css';
import '@/styles/TextFieldSelect.css';
import '@/styles/TextField.css';
import '@/styles/alert.css';
import '@/styles/HotTours.css';
import '@/styles/NewsPage.css';
import '@/styles/allOrders.css';
import '@/styles/error404.css';
import '@/styles/admin.css';
import '@/styles/GuideItem.css';
import '@/styles/reviews.css';
import '@/styles/statisticks.css';
import '@/styles/contactUs.css';
import '@/styles/Filter.css';
import '@/styles/editorModal.css';
import '@/styles/OneGuidePage.css';
import '@/styles/OneGuideInfo.css';
import '@/styles/OneReview.css';
import '@/styles/becomeGuide.css';
import '@/styles/createGuide.css';
import '@/styles/allUsers.css';
import '@/styles/selectCategory.css';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  addInterceptors(store);

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <header>
            <AppToolBar />
          </header>
          <main>
            <Alerts />
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
