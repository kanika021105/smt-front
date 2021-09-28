import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Layout = lazy(() => import('./Layout/UserLayout'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const NewOrder = lazy(() => import('./Pages/NewOrder/NewOrder'));
const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Services = lazy(() => import('./Pages/Services/Services'));
const Support = lazy(() => import('./Pages/Support/Support'));
const TicketMessage = lazy(() => import('./Pages/Support/Message/Message'));
const AddFund = lazy(() => import('./Pages/AddFund/AddFund'));
const Transactions = lazy(() => import('./Pages/Transactions/Transactions'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));
const ApiDocs = lazy(() => import('./Pages/ApiDocs/ApiDocs'));

const PrivacyPolicy = lazy(() => import('../ExtraPages/Terms&Policy/PrivacyPolicy'));

const Admin = () => (
    <Layout>
        <Route
            path="/"
            render={() => { window.location.href = '/dashboard'; }}
            exact
        />

        <Route path="/support/ticket/:uid" exact>
            <TicketMessage />
        </Route>

        <Route path="/transactions" exact>
            <Transactions />
        </Route>

        <Route path="/dashboard" exact>
            <Dashboard />
        </Route>

        <Route path="/new-order" exact>
            <NewOrder />
        </Route>

        <Route path="/add-fund">
            <AddFund />
        </Route>

        <Route path="/services" exact>
            <Services />
        </Route>

        <Route path="/support" exact>
            <Support />
        </Route>

        <Route path="/orders" exact>
            <Orders />
        </Route>

        <Route path="/profile/:id" exact>
            <Profile />
        </Route>

        <Route path="/api-docs">
            <ApiDocs />
        </Route>

        <Route path="/privacy">
            <PrivacyPolicy />
        </Route>
    </Layout>
);

export default Admin;
