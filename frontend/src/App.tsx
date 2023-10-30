import React from 'react';
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import SignInPage from "./containers/SignUpPage/SignInPage";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/sign-in" element={<SignInPage/>}/>
    </Routes>
  );
}

export default App;
