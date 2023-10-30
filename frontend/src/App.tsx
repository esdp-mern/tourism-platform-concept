import React from "react";
import { useAppSelector } from "./app/hook";
import useRoutes from "./routes";
import Layout from "./components/Layout/Layout";
import "./App.css";
import Alert from "./components/Alert/Alert";
import { selectAlertData } from "./store/usersSlice";

const App = () => {
  const { user } = useAppSelector((state) => state.users);
  const alertData = useAppSelector(selectAlertData);
  const routes = useRoutes(!!user);

  return (
    <Layout>
      <Alert
        message={alertData ? alertData.message : ""}
        type={alertData ? alertData.type : ""}
      />
      {routes}
    </Layout>
  );
};

export default App;
