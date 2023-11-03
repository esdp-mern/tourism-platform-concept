import React from 'react';
import { useAppSelector } from './app/hook';
import useRoutes from './routes';
import Layout from './components/Layout/Layout';
import './App.css';
import PageLoader from './components/Loaders/PageLoader';
import Alerts from './components/Alert/Alerts';

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
