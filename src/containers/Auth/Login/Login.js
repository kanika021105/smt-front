// jshint esversion:9

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';

import { AiOutlineHome } from 'react-icons/ai';

import { AuthContext } from '../../Context/AuthContext';
import { WebsiteDetail } from '../../Context/WebsiteDetailContext';

import Axios from '../../../axiosIns';
import classes from './Login.module.scss';

// import Logo from '../../../assets/Images/SMT-Logo.png';
import LoginImage from '../../../assets/Images/login.svg';
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
        setUserId,
        setFName,
        setLName,
        setBalance,
        setIsLoggedIn,
    } = useContext(AuthContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const url = '/login';
        const loginData = { email: loginEmail, password: password };

        try {
            const { data } = await Axios.post(url, { ...loginData });

            const remainingMilliseconds = 24 * 60 * 60 * 1000;
            const expiryDate = Date.now() + remainingMilliseconds;

            localStorage.setItem('expiryDate', expiryDate);
            localStorage.setItem('token', data.token);

            const { user } = data;
            if (!user) throw new Error('Something went wrong!');

            setRole(user.role);
            setEmail(user.email);
            setUserId(user.userId);
            setFName(user.firstName);
            setLName(user.lastName);
            setBalance(user.balance);
            setIsLoggedIn(user.isLoggedIn);

            if (user.role === 'admin') {
                return (window.location = '/admin/dashboard');
            }

            if (user.role === 'user') {
                return (window.location = '/dashboard');
            }
        } catch (err) {
            setErrorMsg(err.response.data.message);
            setShowError(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login - {websiteName || 'SMT '}</title>
            </Helmet>

            <div className={classes.login}>
                <div className={[classes.login__container, 'row'].join(' ')}>
                    <div
                        className={['col-md-7', classes.image__section].join(
                            ' '
                        )}
                    >
                        <>
                            <h3 className={classes.image__section__heading}>
                                Good to see you back!
                            </h3>

                            <span
                                className={classes.heading__bottomLine}
                            ></span>

                            <p className={classes.image__section__paragraph}>
                                Welcome back! Please login to your account to
                                start using our website. Have a great day!
                            </p>

                            <img src={LoginImage} alt="Login" />
                        </>

                        <div className={classes.circle}></div>
                    </div>

                    <div className={['col-md-5', classes.form].join(' ')}>
                        <div className={classes.shapeOne}></div>

                        <Link to="/">
                            <div className={classes.homeLink__box}>
                                <IconContext.Provider
                                    value={{
                                        style: {
                                            fontSize: '2rem',
                                            float: 'left',
                                        },
                                    }}
                                >
                                    <AiOutlineHome />
                                </IconContext.Provider>
                                <div className={classes.homeLink__text}>
                                    Home
                                </div>
                            </div>
                        </Link>

                        <div className={classes.form__container}>
                            <div className={classes.form__heading}>
                                <h2>Sign-In now!</h2>
                                <div className={classes.borderLine}></div>
                            </div>

                            <div
                                className={[
                                    classes.form__input,
                                    classes.email,
                                ].join(' ')}
                            >
                                <input placeholder="Email" type="email" />
                            </div>

                            <div className={classes.form__input}>
                                <input placeholder="Password" type="password" />

                                <span className={classes.forgetPasswordLink}>
                                    <Link to="/forget-password">
                                        Forget Password?
                                    </Link>
                                </span>
                            </div>

                            <button
                                className={[
                                    'btn btn-primary',
                                    classes.login__button,
                                ].join(' ')}
                            >
                                Login
                            </button>

                            <span className={classes.or}>or</span>

                            <div className={classes.signupLink}>
                                <Link to="/signup">Create account!</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  <Card>
                    <h2 className={classes.login__heading}>Please Login </h2>

                    {showError && (
                        <small className="errorMsg">{errorMsg}</small>
                    )}

                    <form onSubmit={submitHandler}>
                        <div className={classes.formControl}>
                            <label className="input__label">Email</label>
                            <input
                                className="input"
                                id="email"
                                type="email"
                                value={loginEmail}
                                placeholder="Email"
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>

                        <div className={classes.formControl}>
                            <label className="input__label">Password</label>
                            <input
                                className={[classes.password, 'input'].join(
                                    ' '
                                )}
                                id="password"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </Card>*/}
            </div>
        </>
    );
};

export default Login;
