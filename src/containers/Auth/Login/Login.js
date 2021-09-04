import React, { useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Axios from '../../../axiosIns';
import classes from './Login.module.scss';

import AuthContext from '../../../store/AuthContext';
import LoginImage from '../../../assets/img/login.svg';
import Toast from '../../../components/UI/Toast/Toast';

// Defining reducer function for useReducer
function reducer(state, action) {
    switch (action.type) {
        case 'email':
            return {
                ...state,
                email: action.payload,
            };

        case 'password':
            return {
                ...state,
                password: action.payload,
            };

        default:
            return { ...state };
    }
}

const Login = () => {
    const { login, websiteName } = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: '',
    });

    // Handling email input
    function emailChangeHandler(e) {
        dispatch({ type: 'email', payload: e.target.value });
    }

    // Handling password Input
    function passwordChangeHandler(e) {
        dispatch({ type: 'password', payload: e.target.value });
    }

    // Handling form submit
    async function submitHandler(e) {
        e.preventDefault();

        const url = '/login';
        const loginData = {
            email: state.email,
            password: state.password,
        };

        try {
            const { data } = await Axios.post(url, { ...loginData });
            const { client } = data;
            const { role } = client;

            // Calculating token expiry time
            const remainingMilliseconds = 24 * 60 * 60 * 1000;
            const expiryDate = Date.now() + remainingMilliseconds;

            // Setting token and expiry time
            localStorage.setItem('expiryDate', expiryDate);
            localStorage.setItem('token', data.token);

            login(
                data.token,
                client.id,
                client.email,
                role,
                client.firstName,
                client.lastName,
                client.balance,
            );

            if (role === 'admin') {
                window.location = '/admin/dashboard';
                return;
            }

            if (role === 'user') {
                window.location = '/dashboard';
                return;
            }
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    return (
        <>
            <Helmet>
                <title>
                    Login -
                    {' '}
                    {websiteName || ' '}
                </title>
            </Helmet>

            <div className={classes.container}>
                <div className={classes.login}>
                    <div className={classes.login__image}>
                        <img src={LoginImage} alt="Login" />
                        <h3 className={classes.login__image__heading}>
                            Its good to see you back!
                        </h3>
                        <p className={classes.login__image__paragraph}>
                            Welcome back!, Please log-in to your account to use
                            our website... Welcome back!, Please log-in to your
                            account to use our website...
                        </p>
                    </div>

                    <div className={classes.login__form}>
                        <div className={classes.homeLink}>
                            <Link to="/">Home</Link>
                        </div>
                        <div className={classes.login__form__line}> </div>

                        <h2 className={`${classes.login__form__heading} u-mb-7`}>Sing-In</h2>

                        <form onSubmit={submitHandler}>
                            <div className={classes.inputSection}>
                                <label htmlFor="email" className={classes.label}>
                                    Email
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        value={state.email}
                                        onChange={emailChangeHandler}
                                    />
                                </label>
                            </div>

                            <div className={classes.inputSection}>
                                <label
                                    htmlFor="password"
                                    className={classes.label}
                                >
                                    Password
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Your Password"
                                        value={state.password}
                                        minLength="6"
                                        onChange={passwordChangeHandler}
                                    />
                                </label>
                            </div>

                            <div className={classes.login__form__resetPassword}>
                                <Link to="/forget-password">
                                    Forget Password?
                                </Link>
                            </div>

                            <div className={classes.login__form__submitButton}>
                                <button type="submit">Sign-In</button>
                            </div>
                        </form>
                        <span className={classes.login__form__or}>or</span>
                        <div className={classes.login__form__signupLink}>
                            <Link to="/signup">Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
