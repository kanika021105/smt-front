import React, { lazy } from 'react';
import { Route, Link } from 'react-router-dom';

import Theme from '../../../../store/theme';

import Card from '../../../../components/UI/Card/Card';
import PageTitle from '../../../../components/Extra/PageTitle';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';

import classes from './Settings.module.scss';

const General = lazy(() => import('./General/General'));
const Paytm = lazy(() => import('./Payment/Paytm'));
const RazorPay = lazy(() => import('./Payment/Razorpay'));
const Privacy = lazy(() => import('./Others/Privacy'));

const Settings = () => {
    const { darkTheme } = React.useContext(Theme);

    return (
        <>
            <PageTitle title="Settings" />

            <div className={darkTheme ? 'dark container' : 'container'}>
                <div className={classes.setting}>
                    <PageHeader header="Settings" />

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
