import React, { useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';

import Axios from '../../../axiosIns';
import AuthContext from '../../../store/AuthContext';

import Toast from '../../../components/UI/Toast/Toast';
import PageTitle from '../../../components/Extra/PageTitle';

import classes from './Login.module.scss';

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
    const { login } = useContext(AuthContext);
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
            Toast.failed(err.message || 'Something went wrong!');
        }
    }

    return (
        <>
            <PageTitle title="Login" />

            <div className={classes.login}>
                <div className={classes.form_container}>
                    <h2 className={classes.login_header}>
                        Login
                    </h2>

                    <form className={classes.login_form} onSubmit={submitHandler}>
                        <input
                            className={classes.login_input}
                            value={state.email}
                            type="email"
                            placeholder="Email"
                            onChange={emailChangeHandler}
                        />
                        <input
                            className={classes.login_input}
                            value={state.password}
                            type="password"
                            placeholder="Password"
                            onChange={passwordChangeHandler}
                        />

                        <button className={classes.submit_button} type="submit">Login</button>
                    </form>

                    <div className={classes.login_form_footer}>
                        <Link to="/signup"> Create account </Link>
                        or
                        <Link to="/forget-password"> Forget Password? </Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Login;
