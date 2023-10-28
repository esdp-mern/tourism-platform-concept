import React from 'react';
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import {Fade} from "react-awesome-reveal";

const RegisterPage = () => {
    return (
        <div className="container">
            <Fade>
                <RegisterForm/>
            </Fade>
        </div>
    );
};

export default RegisterPage;