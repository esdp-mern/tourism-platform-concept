import React from 'react';
import { useAppSelector } from './app/hook';
import useRoutes from './routes';
import Layout from './components/Layout/Layout';
import PageLoader from './components/Loaders/PageLoader';
import Alerts from './components/Alerts/Alerts';
import './App.css';

const App = () => {
  const { user } = useAppSelector((state) => state.users);
  const routes = useRoutes(!!user);

  return (
    <Layout>
      <PageLoader />
      <Alerts />
      {routes}
    </Layout>
  );
};

export default App;
