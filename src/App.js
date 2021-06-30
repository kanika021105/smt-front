import React, {
    Suspense,
    lazy,
    useEffect,
    useState,
    useContext,
} from 'react';
import { Route, Switch } from 'react-router-dom';

import Axios from './axiosIns';
import User from './containers/User/User';
import Admin from './containers/Admin/Admin';
import Layout from './containers/Layout/Layout';

import WebsiteDetail from './containers/Context/WebsiteDetailContext';
import AuthContext from './store/auth-context';

const Login = lazy(() => import('./containers/Auth/Login/Login'));
const Signup = lazy(() => import('./containers/Auth/Signup/Signup'));

const App = () => {
    const [websiteName, setWebsiteName] = useState('SMT Panel');

    const AuthCtx = useContext(AuthContext);
    const { isLoggedIn, role, token } = AuthCtx;

    useEffect(() => {
        const expireTime = localStorage.getItem('expiryDate');
        // const token = localStorage.getItem('token');

        // Checking if login expired
        if (expireTime <= Date.now()) {
            // setRole(null);
            localStorage.clear();
            // setIsLoggedIn(false);
            return;
        }

        // checking if token is present
        if (!token) {
            // TODO Remove this
            // eslint-disable-next-line no-console
            console.log('token not found');
            // setIsLoggedIn(false);
            return;
        }

        const url = '/verify-token';
        Axios.post(url, {
            token,
        })
            .then((res) => {
                const { data } = res;

                AuthCtx.verify(
                    data.email,
                    data.role,
                    data.firstName,
                    data.lastName,
                    data.balance,
                );
            })
            .catch((err) => {
                // TODO Remove this
                // eslint-disable-next-line no-console
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
        <>
            <WebsiteDetail.Provider
                value={{
                    websiteName,
                    setWebsiteName,
                }}
            >
                {route}
            </WebsiteDetail.Provider>
        </>
    );
};

export default App;
