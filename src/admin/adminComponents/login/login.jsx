import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import style from './login.module.css';
import './css/main.css';
import './css/util.css';
import { useAuth } from "../../../context/authContext";
import logo from '../../../img/logoadmin.png';

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          login(storedToken);
        }
      }, [login]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BE_HOST}/login`, {
                email,
                password
            });
            localStorage.setItem('token', response.data.accessToken);
            login(response.data.accessToken);
            setError(null);

            navigate(`/admin/dashboard/${response.data.user.id}`);
        } catch (error) {
            console.error('Ошибка входа', error);
            
            setError('Помилка входу. Перевірте введені дані.');
        }
    };

    return (
        <section className={style.login}>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={handleLogin}>
                            <span className="login100-form-logo">
                                <i className="zmdi zmdi-landscape"></i>
                            </span>

                            <span className="login100-form-title p-b-34 p-t-27">
                                Log in
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Enter username">
                                <input id="email" className={style.input100} type="text" name="email" placeholder="Логін" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <span data-placeholder="&#xf207;"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                <input className={style.input100} type="password" name="password" id="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <span data-placeholder="&#xf191;"></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type="submit">
                                    Login
                                </button>
                            </div>

                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <div id="dropDownSelect1"></div>
        </section>
    )
};
