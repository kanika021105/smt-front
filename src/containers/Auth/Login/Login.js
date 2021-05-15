// jshint esversion:9

import React, { useState, useContext } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import axios from '../../../axiosIns';
import classes from './Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../../../components/UI/Card/Card';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);
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

        let expiryDate;
        let url = '/login';
        let remainingMilliseconds;
        const loginData = { email: loginEmail, password: password };

        let { data } = await axios.post(url, { ...loginData });

        if (data) {
            if (data.status === 'success') {
                remainingMilliseconds = 24 * 60 * 60 * 1000;
                expiryDate = Date.now() + remainingMilliseconds;
                localStorage.setItem('expiryDate', expiryDate);
                localStorage.setItem('token', data.token);

                let { user } = data;

                if (data.user) {
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
                }
            }

            if (data.status === 'failed') {
                setErrorMsg(data.errorMsg);
                setShowError(true);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>SignUp - SMT Panel</title>
            </Helmet>
            <div className={classes.Login}>
                <Card>
                    <h2>Please Login </h2>

                    {showError && (
                        <small className={classes.errorMsg}>{errorMsg}</small>
                    )}

                    <form onSubmit={submitHandler}>
                        <div className={classes.formControl}>
                            <Form.Label>Email</Form.Label>
                            <FormControl
                                id="email"
                                type="email"
                                name="email"
                                value={loginEmail}
                                placeholder="Email"
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>

                        <div className={classes.formControl}>
                            <Form.Label>Password</Form.Label>
                            <FormControl
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
