import React from 'react';
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
