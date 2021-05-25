// jshint esversion:9

import React, { useState, useContext } from 'react';

import { Helmet } from 'react-helmet';

import { AuthContext } from '../../Context/AuthContext';
import { WebsiteDetail } from '../../Context/WebsiteDetailContext';

import Axios from '../../../axiosIns';
import classes from './Login.module.css';
import Card from '../../../components/UI/Card/Card';

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

        const { data } = await Axios.post(url, { ...loginData });

        if (!data) return console.log('something went wrong!');
        if (data.status !== 'success') {
            setErrorMsg(data.errorMsg);
            setShowError(true);
        }

        const remainingMilliseconds = 24 * 60 * 60 * 1000;
        const expiryDate = Date.now() + remainingMilliseconds;

        localStorage.setItem('expiryDate', expiryDate);
        localStorage.setItem('token', data.token);

        const { user } = data;
        if (!data.user) return 'something went wrong!!';

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
    };

    return (
        <>
            <Helmet>
                <title>Login - {websiteName || 'SMT '}</title>
            </Helmet>

            <div className={classes.Login}>
                <Card>
                    <h2>Please Login </h2>

                    {showError && (
                        <small className={classes.errorMsg}>{errorMsg}</small>
                    )}

                    <form onSubmit={submitHandler}>
                        <div className={classes.formControl}>
                            <label className="input__label">Email</label>
                            <input
                                className="input"
                                id="email"
                                type="email"
                                name="email"
                                value={loginEmail}
                                placeholder="Email"
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>

                        <div className={classes.formControl}>
                            <label className="input__label">Password</label>
                            <input
                                className="input"
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default Login;
