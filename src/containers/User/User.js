// jshint esversion:9

import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Layout = lazy(() => import('./Layout/UserLayout'));
const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Support = lazy(() => import('./Pages/Support/Support'));
const Services = lazy(() => import('./Pages/Services/Services'));
const NewOrder = lazy(() => import('./Pages/NewOrder/NewOrder'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const Transactions = lazy(() => import('./Pages/Transactions/Transactions'));
const RazorPay = lazy(() => import('./Pages/AddFund/RazorPay/Razorpay'));
const TicketMessage = lazy(() => import('./Pages/Support/Message/Message'));

const Admin = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout>
                <Switch>
                    <Route
                        path="/"
                        render={() => {
                            window.location.href = '/dashboard';
                        }}
                        exact
                    />

                    <Route path="/support/ticket/:id" exact>
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

                    <Route path="/add-fund" exact>
                        <RazorPay />
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
                </Switch>
            </Layout>
        </Suspense>
    );
};

export default Admin;
