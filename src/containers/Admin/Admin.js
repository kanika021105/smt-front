import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Layout = lazy(() => import('./Layout/AdminLayout'));
const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Clients = lazy(() => import('./Pages/Clients/Client'));
const Support = lazy(() => import('./Pages/Support/Support'));
const Services = lazy(() => import('./Pages/Services/Services'));
const Settings = lazy(() => import('./Pages/Settings/Settings'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const Categories = lazy(() => import('./Pages/Categories/Categories'));
const ApiProvider = lazy(() => import('./Pages/ApiProvider/ApiProvider'));
const ApiServices = lazy(() => import('./Pages/ApiServices/ApiServices'));
const TicketMessage = lazy(() => import('./Pages/Support/Message/Message'));
const Transactions = lazy(() => import('./Pages/Transactions/Transactions'));
const NotFound = lazy(() => import('../ExtraPages/ErrorPage/NotFound/NotFound'));
const PrivacyPolicy = lazy(() => import('../ExtraPages/Terms&Policy/PrivacyPolicy'));

const Admin = () => (
    <Layout>
        <Switch>
            <Route
                path="/"
                render={() => {
                    window.location.href = '/admin/dashboard';
                }}
                exact
            />

            <Route path="/admin/api-provider/:id/services" component={ApiServices} exact />
            <Route path="/admin/support/ticket/:uid" component={TicketMessage} exact />
            <Route path="/admin/transactions" component={Transactions} exact />
            <Route path="/admin/api-provider" component={ApiProvider} exact />
            <Route path="/admin/categories" component={Categories} exact />
            <Route path="/admin/dashboard" component={Dashboard} exact />
            <Route path="/admin/services" component={Services} exact />
            <Route path="/admin/clients" component={Clients} exact />
            <Route path="/privacy" component={PrivacyPolicy} exact />
            <Route path="/admin/support" component={Support} exact />
            <Route path="/admin/orders" component={Orders} exact />
            <Route path="/admin/settings" component={Settings} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Layout>
);

export default Admin;
