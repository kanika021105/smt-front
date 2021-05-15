/*jshint esversion: 9 */

import React, { useEffect, lazy } from 'react';
import { Route, Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { Helmet } from 'react-helmet';

import { Button } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import classes from './Settings.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../../../../components/UI/Card/Card';

const General = lazy(() => import('./General/General'));
const Payment = lazy(() => import('./Payment/Payment'));

const Settings = () => {
    //
    useEffect(() => {
        console.log('setting running!');
    }, []);

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Settings - {process.env.REACT_APP_WEBSITE_NAME}</title>
            </Helmet>

            <div className="container">
                <div className={classes.Orders}>
                    <h2 className="pageTitle">
                        <IconContext.Provider
                            value={{
                                style: {
                                    fontSize: '30px',
                                },
                            }}
                        >
                            <VscListSelection />
                        </IconContext.Provider>{' '}
                        Settings
                    </h2>

                    <Card>
                        <div className="row">
                            <div className="col-md-3 border p-4">
                                <li>
                                    <Link to={'/admin/settings/general'}>
                                        General
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/admin/settings/payment'}>
                                        Payment
                                    </Link>
                                </li>
                            </div>

                            <div className="col-md-9">
                                <Route exact path="/admin/settings/general">
                                    <General />
                                </Route>

                                <Route exact path="/admin/settings/payment">
                                    <Payment />
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
