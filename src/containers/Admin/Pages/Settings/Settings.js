import React, { lazy } from 'react';
import { Route, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { Helmet } from 'react-helmet';

import Card from '../../../../components/UI/Card/Card';
import classes from './Settings.module.scss';
import Theme from '../../../../store/theme';

const General = lazy(() => import('./General/General'));
const Paytm = lazy(() => import('./Payment/Paytm'));
const RazorPay = lazy(() => import('./Payment/Razorpay'));
const Privacy = lazy(() => import('./Others/Privacy'));

const Settings = () => {
    const { darkTheme } = React.useContext(Theme);

    return (
        <>
            <Helmet>
                <title>
                    Settings -
                    {' '}
                    {process.env.REACT_APP_WEBSITE_NAME}
                </title>
            </Helmet>

            <div className={darkTheme ? 'dark container' : 'container'}>
                <div className={classes.setting}>

                    <h2 className="pageTitle">
                        <IconContext.Provider
                            value={{
                                style: {
                                    fontSize: '30px',
                                },
                            }}
                        >
                            <VscListSelection />
                        </IconContext.Provider>
                        {' '}
                        Settings
                    </h2>

                    <Card>
                        <div className={classes.setting__container}>
                            <div className={classes.setting__links}>
                                <li>
                                    <Link to="/admin/settings/general">
                                        General
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/settings/privacy">
                                        Privacy
                                    </Link>
                                </li>
                                <h3>
                                    Payment
                                </h3>
                                <li>
                                    <Link to="/admin/settings/payment/paytm">
                                        Paytm
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/settings/payment/razorpay">
                                        Razorpay
                                    </Link>
                                </li>
                            </div>

                            <div className={classes.setting__options}>
                                <Route exact path="/admin/settings">
                                    <General />
                                </Route>

                                <Route exact path="/admin/settings/general">
                                    <General />
                                </Route>

                                <Route exact path="/admin/settings/privacy">
                                    <Privacy />
                                </Route>

                                <Route exact path="/admin/settings/payment/paytm">
                                    <Paytm />
                                </Route>

                                <Route exact path="/admin/settings/payment/razorpay">
                                    <RazorPay />
                                </Route>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Settings;
