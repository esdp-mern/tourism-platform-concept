import React, {useEffect} from 'react';
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import {Fade} from "react-awesome-reveal";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/usersSlice";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="container">
            <Fade>
                <RegisterForm/>
            </Fade>
        </div>
    );
};

export default RegisterPage;