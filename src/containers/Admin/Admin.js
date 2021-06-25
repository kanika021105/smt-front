// jshint esversion:9

import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Clients = lazy(() => import('./Pages/Clients/Clients'));
const Layout = lazy(() => import('./Layout/AdminLayout'));
const Support = lazy(() => import('./Pages/Support/Support'));
const Services = lazy(() => import('./Pages/Services/Services'));
const Categories = lazy(() => import('./Pages/Categories/Categories'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const Transactions = lazy(() => import('./Pages/Transactions/Transactions'));
const TicketMessage = lazy(() => import('./Pages/Support/Message/Message'));
const ApiProvider = lazy(() => import('./Pages/ApiProvider/ApiProvider'));
const ApiServices = lazy(() => import('./Pages/ApiServices/ApiServices'));
const Settings = lazy(() => import('./Pages/Settings/Settings'));

const Admin = () => (
    <Suspense
        fallback={(
            <div className="loading">
                <div className="loading__1">
                    <div />
                </div>
            </div>
        )}
    >
        <Layout>
            <Switch>
                <Route
                    path="/"
                    render={() => {
                        window.location.href = '/admin/dashboard';
                    }}
                    exact
                />

                <Route path="/admin/support/ticket/:id" exact>
                    <TicketMessage />
                </Route>

                <Route path="/admin/transactions" exact>
                    <Transactions />
                </Route>

                <Route path="/admin/dashboard" exact>
                    <Dashboard />
                </Route>

                <Route path="/admin/categories" exact>
                    <Categories />
                </Route>

                <Route path="/admin/services" exact>
                    <Services />
                </Route>

                <Route path="/admin/support" exact>
                    <Support />
                </Route>

                <Route path="/admin/clients" exact>
                    <Clients />
                </Route>

                <Route path="/admin/orders" exact>
                    <Orders />
                </Route>

                <Route path="/admin/api-provider" exact>
                    <ApiProvider />
                </Route>

                <Route path="/admin/api-provider/:id/services" exact>
                    <ApiServices />
                </Route>

                <Route path="/admin/settings">
                    <Settings />
                </Route>
            </Switch>
        </Layout>
    </Suspense>
);

export default Admin;
