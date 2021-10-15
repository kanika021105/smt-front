import React, { lazy } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import PageTitle from '../../../../components/Extra/PageTitle';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import classes from './Settings.module.scss';

import Theme from '../../../../store/theme';

const General = lazy(() => import('./General/General'));
const Paytm = lazy(() => import('./Payment/Paytm'));
const RazorPay = lazy(() => import('./Payment/Razorpay'));

function Settings() {
    const { darkTheme } = React.useContext(Theme);

    return (
        <>
            <PageTitle title="Settings" />
            <PageContainer>
                <PageHeader header="Settings" />
                <div className={`${classes.setting__container} ${darkTheme ? classes.dark : ''}`}>
                    <div className={classes.setting__links}>
                        <li><Link to="/admin/settings/general">General</Link></li>
                        {/* <li><Link to="/admin/settings/privacy">Privacy</Link></li> */}

                        <h3>Payment</h3>
                        <li><Link to="/admin/settings/payment/paytm">Paytm</Link></li>
                        <li><Link to="/admin/settings/payment/razorpay">Razorpay</Link></li>
                    </div>

                    <div className={classes.setting__options}>
                        <Switch>
                            <Route exact path="/admin/settings" component={General} />
                            <Route exact path="/admin/settings/general" component={General} />
                            {/*
                            <Route exact path="/admin/settings/privacy" component={Privacy} /> */}
                            <Route exact path="/admin/settings/payment/paytm" component={Paytm} />
                            <Route exact path="/admin/settings/payment/razorpay" component={RazorPay} />
                            <Route path="/admin/settings/*" render={() => ('Not Found')} />
                        </Switch>
                    </div>
                </div>
            </PageContainer>
        </>
    );
}

export default Settings;
