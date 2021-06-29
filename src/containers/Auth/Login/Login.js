// jshint esversion:9

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AuthContext } from '../../Context/AuthContext';
import WebsiteDetail from '../../Context/WebsiteDetailContext';

import Axios from '../../../axiosIns';
import classes from './Login.module.scss';

// import Logo from '../../../assets/Images/SMT-Logo.png';
import LoginImage from '../../../assets/images/login.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const { websiteName } = useContext(WebsiteDetail);
    const {
        setRole,
        setEmail,
        setClientId,
        setFName,
        setLName,
        setBalance,
        setIsLoggedIn,
    } = useContext(AuthContext);

    const emailChangeHandler = (e) => setLoginEmail(e.target.value);
    const passwordChangeHandler = (e) => setPassword(e.target.value);

    const submitHandler = async (e) => {
        e.preventDefault();

        setShowError(false);

        const url = '/login';
        const loginData = {
            email: loginEmail,
            password,
        };

        try {
            const { data } = await Axios.post(url, {
                ...loginData,
            });
            setErrorMsg('');
            console.log(data);

            const remainingMilliseconds = 24 * 60 * 60 * 1000;
            const expiryDate = Date.now() + remainingMilliseconds;

            localStorage.setItem('expiryDate', expiryDate);
            localStorage.setItem('token', data.token);

            const { client } = data;
            if (!client) throw new Error('Something went wrong!');

            setRole(client.role);
            setEmail(client.email);
            setClientId(client.clientId);
            setFName(client.firstName);
            setLName(client.lastName);
            setBalance(client.balance);
            setIsLoggedIn(client.isLoggedIn);

            if (client.role === 'admin') {
                window.location = '/admin/dashboard';
                return;
            }

            if (client.role === 'user') {
                window.location = '/dashboard';
                return;
            }
        } catch (err) {
            // setErrorMsg(err.response.data.message);

            setShowError(true);
            console.log(err);
        }
    };

    return (
        <>
            <Helmet>
                <title>
                    Login -
                    {' '}
                    {websiteName || 'SMT '}
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
                        <h2
                            className={[
                                classes.login__form__heading,
                                showError ? 'u-mb-3' : 'u-mb-7',
                            ].join(' ')}
                        >
                            Sing-In
                        </h2>
                        <h4
                            className={
                                showError
                                    ? classes.errorMsg
                                    : classes.errorHidden
                            }
                        >
                            {errorMsg}
                        </h4>

                        <form onSubmit={submitHandler}>
                            <div className={classes.inputSection}>
                                <label className={classes.label}>Email</label>
                                <input
                                    className={
                                        showError ? classes.invalid : ' '
                                    }
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={loginEmail}
                                    onChange={emailChangeHandler}
                                />
                            </div>

                            <div className={classes.inputSection}>
                                <label
                                    htmlFor="password"
                                    className={classes.label}
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    className={
                                        showError ? classes.invalid : ' '
                                    }
                                    type="password"
                                    placeholder="Your Password"
                                    value={password}
                                    minLength="6"
                                    onChange={passwordChangeHandler}
                                />
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
