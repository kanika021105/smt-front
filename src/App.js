// jshint esversion:9

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Axios from './axiosIns';
import User from './containers/User/User';
import Admin from './containers/Admin/Admin';
import Layout from './containers/Layout/Layout';
import { AuthContext } from './containers/Context/AuthContext';
import { WebsiteDetail } from './containers/Context/WebsiteDetailContext';

const Login = lazy(() => import('./containers/Auth/Login/Login'));
const Signup = lazy(() => import('./containers/Auth/Signup/Signup'));

const App = () => {
    const [email, setEmail] = useState();
    const [userId, setUserId] = useState();
    const [role, setRole] = useState(false);
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [balance, setBalance] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [websiteName, setWebsiteName] = useState('SMT Panel');

    useEffect(() => {
        const expireTime = localStorage.getItem('expiryDate');
        const token = localStorage.getItem('token');

        // Checking if login expired
        if (expireTime <= Date.now()) {
            setRole(null);
            localStorage.clear();
            setIsLoggedIn(false);
            return;
        }

        // checking if token is present
        if (!token) return setIsLoggedIn(false);

        // sending verification request
        Axios.post('/verify-token', { token })
            .then((res) => {
                const { data } = res;

                // Showing error if data not found
                if (!data) {
                    return console.log('something went wrong!');
                }

                // Setting context state
                setRole(data.role);
                setIsLoggedIn(true);
                setEmail(data.email);
                setRole(res.data.role);
                setUserId(data.userId);
                setFName(data.fName);
                setLName(data.lName);
                setBalance(data.balance);
            })
            .catch((err) => {
                console.log(err.response.msg);
            });
    }, []);

    // Route for not logged in User
    let route = (
        <Suspense
            fallback={
                <div className="loading">
                    <div className="loading__1">
                        <div></div>
                    </div>
                </div>
            }
        >
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
        <WebsiteDetail.Provider value={{ websiteName, setWebsiteName }}>
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
        </WebsiteDetail.Provider>
    );
};

export default App;
