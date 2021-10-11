import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Layout = lazy(() => import('./Layout/UserLayout'));
const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Support = lazy(() => import('./Pages/Support/Support'));
const AddFund = lazy(() => import('./Pages/AddFund/AddFund'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));
const ApiDocs = lazy(() => import('./Pages/ApiDocs/ApiDocs'));
const NewOrder = lazy(() => import('./Pages/NewOrder/NewOrder'));
const Services = lazy(() => import('./Pages/Services/Services'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const TicketMessage = lazy(() => import('./Pages/Support/Message/Message'));
const Transactions = lazy(() => import('./Pages/Transactions/Transactions'));
const NotFound = lazy(() => import('../ExtraPages/ErrorPage/NotFound/NotFound'));
const PrivacyPolicy = lazy(() => import('../ExtraPages/Terms&Policy/PrivacyPolicy'));

const Admin = () => (
    <Layout>
        <Switch>
            <Route
                path="/"
                render={() => { window.location.href = '/dashboard'; }}
                exact
            />

            <Route path="/support/ticket/:uid" component={TicketMessage} exact />
            <Route path="/transactions" component={Transactions} exact />
            <Route path="/profile/:id" component={Profile} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/new-order" component={NewOrder} exact />
            <Route path="/add-fund" component={AddFund} />
            <Route path="/services" component={Services} exact />
            <Route path="/api-docs" component={ApiDocs} exact />
            <Route path="/support" component={Support} exact />
            <Route path="/privacy" component={PrivacyPolicy} exact />
            <Route path="/orders" component={Orders} exact />
            <Route path="*" component={NotFound} />
        </Switch>
    </Layout>
);

export default Admin;
