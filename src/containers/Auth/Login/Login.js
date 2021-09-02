import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Axios from '../../../axiosIns';
import classes from './Login.module.scss';

import LoginImage from '../../../assets/img/login.svg';
import Context from '../../../store/context';
import Toast from '../../../components/UI/Toast/Toast';

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const AuthCtx = useContext(Context);

    const emailChangeHandler = (e) => setLoginEmail(e.target.value);
    const passwordChangeHandler = (e) => setPassword(e.target.value);

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowError(false);

        const url = '/login';
        const loginData = { email: loginEmail, password };

        try {
            const { data } = await Axios.post(url, { ...loginData });
            setErrorMsg('');

            const remainingMilliseconds = 24 * 60 * 60 * 1000;
            const expiryDate = Date.now() + remainingMilliseconds;

            localStorage.setItem('expiryDate', expiryDate);
            localStorage.setItem('token', data.token);

            const { client } = data;
            if (!client) throw new Error('Something went wrong!');

            AuthCtx.login(
                data.token,
                client.id,
                client.email,
                client.role,
                client.firstName,
                client.lastName,
                client.balance,
            );

            if (client.role === 'admin') {
                window.location = '/admin/dashboard';
                return;
            }

            if (client.role === 'user') {
                window.location = '/dashboard';
                return;
            }
        } catch (err) {
            console.log(err);
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    };

    return (
        <>
            <Helmet>
                <title>
                    Login -
                    {' '}
                    {AuthCtx.websiteName || ' '}
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
                        <h2 className={[classes.login__form__heading, showError ? 'u-mb-3' : 'u-mb-7'].join(' ')}>
                            Sing-In
                        </h2>
                        <h4 className={showError ? classes.errorMsg : classes.errorHidden}>
                            {errorMsg}
                        </h4>

                        <form onSubmit={submitHandler}>
                            <div className={classes.inputSection}>
                                <label htmlFor="email" className={classes.label}>
                                    Email
                                    <input
                                        id="email"
                                        className={showError ? classes.invalid : ' '}
                                        type="email"
                                        placeholder="example@gmail.com"
                                        value={loginEmail}
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
                                        className={showError ? classes.invalid : ' '}
                                        type="password"
                                        placeholder="Your Password"
                                        value={password}
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
