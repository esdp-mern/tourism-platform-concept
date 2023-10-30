import React from "react";
import { useAppSelector } from "./app/hook";
import useRoutes from "./routes";
import Layout from "./components/Layout/Layout";
import "./App.css";

const App = () => {
  const { user } = useAppSelector((state) => state.users);
  const routes = useRoutes(!!user);

  return <Layout>{routes}</Layout>;
};

export default App;
