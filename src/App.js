// jshint esversion:9

import React, {
    Suspense, lazy, useEffect, useState,
} from 'react';
import { Route, Switch } from 'react-router-dom';

import Axios from './axiosIns';
import User from './containers/User/User';
import Admin from './containers/Admin/Admin';
import Layout from './containers/Layout/Layout';
import { AuthContext } from './containers/Context/AuthContext';
import WebsiteDetail from './containers/Context/WebsiteDetailContext';

const Login = lazy(() => import('./containers/Auth/Login/Login'));
const Signup = lazy(() => import('./containers/Auth/Signup/Signup'));

const App = () => {
    const [email, setEmail] = useState();
    const [clientId, setClientId] = useState();
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
        if (!token) {
            console.log('token not found');
            setIsLoggedIn(false);
            return;
        }

        const url = '/verify-token';
        Axios.post(url, {
            token,
        })
            .then((res) => {
                console.log('called');
                const { data } = res;

                console.log(data);
                setRole(data.role);
                setIsLoggedIn(true);
                setEmail(data.email);
                setRole(data.role);
                setClientId(data.clientId);
                setFName(data.fName);
                setLName(data.lName);
                setBalance(data.balance);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Route for not logged in User
    let route = (
        <Suspense
            fallback={(
                <div className="loading">
                    <div className="loading__1">
                        <div />
                    </div>
                </div>
            )}
        >
            <Switch>
                <Route path="/signup" exact>
                    <Signup />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Layout>
                    <Route
                        path="/"
                        render={() => {
                            // e.preventDefault();
                        }}
                        exact
                    />
                </Layout>
            </Switch>
        </Suspense>
    );

    if (isLoggedIn && role === 'admin') {
        route = <Admin />;
    }

    if (isLoggedIn && role === 'user') {
        route = <User />;
    }

    return (
        <WebsiteDetail.Provider
            value={{
                websiteName,
                setWebsiteName,
            }}
        >
            <AuthContext.Provider
                value={{
                    role,
                    setRole,
                    email,
                    setEmail,
                    clientId,
                    setClientId,
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
