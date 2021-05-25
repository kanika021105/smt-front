// jshint esversion:9

import React, { useContext } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Razorpay from './RazorPay/Razorpay';
import Card from '../../../../components/UI/Card/Card';

import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import '../../../../sass/pages/user/AddFund.scss';

const AddFund = () => {
    const { websiteName } = useContext(WebsiteDetail);

    // TODO Change title to dynamic
    return (
        <>
            <div className="container addfund">
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
                    Add Fund
                </h2>

                <Card>
                    <div className="addfund__box">
                        <div className="addfund__links">
                            <ul>
                                <li>
                                    <NavLink
                                        to={'/add-fund'}
                                        activeClassName="active"
                                        exact
                                    >
                                        Razorpay
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/add-fund/paytm'}
                                        activeClassName="active"
                                        exact
                                    >
                                        Paytm
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="addfund__gateway">
                            <Route path="/add-fund" exact>
                                <Razorpay />
                            </Route>

                            <Route path="/add-fund/paytm" exact>
                                <Helmet>
                                    <title>
                                        Paytm - {websiteName || 'SMT'}{' '}
                                    </title>
                                </Helmet>
                                {'Coming Soon...'}
                            </Route>
                        </div>
                        <p>*All payment are 100% safe and secure.</p>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default AddFund;
