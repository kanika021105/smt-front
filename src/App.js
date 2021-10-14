import React, {
    Suspense,
    lazy,
    useEffect,
    useContext,
} from 'react';
import { Route, Switch } from 'react-router-dom';

import Axios from './axiosIns';
import AuthContext from './store/AuthContext';
import Layout from './containers/Layout/Layout';
import Toast from './components/UI/Toast/Toast';

const User = lazy(() => import('./containers/User/User'));
const Admin = lazy(() => import('./containers/Admin/Admin'));
const Login = lazy(() => import('./containers/Auth/Login/Login'));
const Signup = lazy(() => import('./containers/Auth/Signup/Signup'));
const Services = lazy(() => import('./containers/ExtraPages/Services/Services'));
const NotFound = lazy(() => import('./containers/ExtraPages/ErrorPage/NotFound/NotFound'));
const PrivacyPolicy = lazy(() => import('./containers/ExtraPages/Terms&Policy/PrivacyPolicy'));

function App() {
    const {
        isLoggedIn, verify, role, token,
    } = useContext(AuthContext);

    useEffect(async () => {
        if (token) {
            // TODO Update logout mechanism
            const expireTime = localStorage.getItem('expiryDate');
            if (expireTime <= Date.now()) {
                const keyToRemove = ['token', 'expiryDate'];
                keyToRemove.forEach((key) => localStorage.removeItem(key));
                return;
            }

            try {
                const url = '/verify-token';
                const { data } = await Axios.post(url, { token });
                verify(
                    data.clientId,
                    data.email,
                    data.role,
                    data.firstName,
                    data.lastName,
                    data.balance,
                    data.websiteName,
                );
            } catch (err) {
                Toast.failed(err.response.data.message);
            }
        }
    }, []);

    return (
        <Suspense
            fallback={(
                <div className="loading">
                    <div className="loading__1">
                        <div />
                    </div>
                </div>
            )}
        >
            {isLoggedIn && role === 'user' && <User />}
            {isLoggedIn && role === 'admin' && <Admin />}

            {!isLoggedIn && (
                <Layout>
                    <Switch>
                        <Route path="/privacy" component={PrivacyPolicy} exact />
                        <Route path="/services" component={Services} exact />
                        <Route path="/signup" component={Signup} exact />
                        <Route path="/login" component={Login} exact />
                        <Route path="/" render={() => 'Text'} exact />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Layout>
            )}
        </Suspense>
    );
}

export default App;
