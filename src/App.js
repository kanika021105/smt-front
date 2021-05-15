// jshint esversion:9

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import axios from './axiosIns';
import User from './containers/User/User';
import Admin from './containers/Admin/Admin';
import Layout from './containers/Layout/Layout';
import { AuthContext } from './containers/Context/AuthContext';

// const NewOrder = lazy(() => import('./Pages/NewOrder/NewOrder'));
const Login = lazy(() => import('./containers/Auth/Login/Login'));
const Signup = lazy(() => import('./containers/Auth/Signup/Signup'));

function App() {
    const [email, setEmail] = useState();
    const [userId, setUserId] = useState();
    const [role, setRole] = useState(false);
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [balance, setBalance] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let expireTime = localStorage.getItem('expiryDate');
        let token = localStorage.getItem('token');

        // Checking if login expired
        if (expireTime <= Date.now()) {
            setRole(null);
            localStorage.clear();
            setIsLoggedIn(false);
            return;
        }

        // checking user login token is valid and updating role
        if (token && expireTime > Date.now()) {
            axios
                .post('/verify-token', { token })
                .then((res) => {
                    let { data } = res;

                    if (res.data) {
                        setRole(data.role);
                        setIsLoggedIn(true);
                        setEmail(data.email);
                        setRole(res.data.role);
                        setUserId(data.userId);
                        setFName(data.fName);
                        setLName(data.lName);
                        setBalance(data.balance);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            setIsLoggedIn(false);
        }
    }, []);

    let route = (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout>
                <Switch>
                    <Route path="/signup" exact>
                        <Signup />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route
                        path="/"
                        render={(e) => {
                            // e.preventDefault();
                        }}
                        exact
                    />
                </Switch>
            </Layout>
        </Suspense>
    );

    if (isLoggedIn && role === 'admin') {
        route = <Admin />;
    }

    if (isLoggedIn && role === 'user') {
        route = <User />;
    }

    return (
        <AuthContext.Provider
            value={{
                role,
                setRole,
                email,
                setEmail,
                userId,
                setUserId,
                fName,
                setFName,
                lName,
                setLName,
                balance,
                setBalance,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {route}
        </AuthContext.Provider>
    );
}

export default App;
