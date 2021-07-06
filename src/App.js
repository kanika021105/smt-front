import React, {
    Suspense,
    lazy,
    useEffect,
    useContext,
} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Axios from './axiosIns';
import Context from './store/context';
import Layout from './containers/Layout/Layout';

const User = lazy(() => import('./containers/User/User'));
const Admin = lazy(() => import('./containers/Admin/Admin'));
const Login = lazy(() => import('./containers/Auth/Login/Login'));
const Signup = lazy(() => import('./containers/Auth/Signup/Signup'));
const PrivacyPolicy = lazy(() => import('./containers/ExtraPages/Terms&Policy/PrivacyPolicy'));

const App = () => {
    const Ctx = useContext(Context);
    const { isLoggedIn, role, token } = Ctx;
    const history = useHistory();

    useEffect(() => {
        const expireTime = localStorage.getItem('expiryDate');
        if (expireTime <= Date.now()) {
            localStorage.clear();
            return;
        }

        if (!token) {
            // eslint-disable-next-line no-console
            console.log('token not found');
            return;
        }

        const url = '/verify-token';
        Axios.post(url, { token })
            .then((res) => {
                const { data } = res;

                Ctx.verify(
                    data.email,
                    data.role,
                    data.firstName,
                    data.lastName,
                    data.balance,
                    data.websiteName,
                );
            })
            .catch((err) => {
                // TODO Remove this
                // eslint-disable-next-line no-console
                console.log(err);
            });
    }, []);

    return (
        <>
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
                    {!isLoggedIn && (
                        <>
                            <Route exact path="/signup">
                                <Signup />
                            </Route>

                            <Route exact path="/login">
                                <Login />
                            </Route>

                            <Layout>
                                <Route
                                    exact
                                    path="/"
                                    render={() => { history.push('/login'); }}
                                />

                                <Route path="/privacy">
                                    <PrivacyPolicy />
                                </Route>
                            </Layout>
                        </>
                    )}

                    {isLoggedIn && role === 'user' && <User />}
                    {isLoggedIn && role === 'admin' && <Admin />}

                    <Route path="/privacy-policy">
                        <PrivacyPolicy />
                    </Route>
                </Switch>
            </Suspense>
        </>
    );
};

export default App;
