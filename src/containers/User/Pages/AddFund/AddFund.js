// jshint esversion:9

import React from 'react';
import { Route, Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Razorpay from './RazorPay/Razorpay';
import Card from '../../../../components/UI/Card/Card';

import '../../../../sass/pages/user/AddFund.scss';

const AddFund = () => {
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
                    <div className="addfund__container">
                        <div className="addfund__container__links">
                            <ul>
                                <li>
                                    <Link to={'/add-fund'}>Razorpay</Link>
                                </li>

                                <li>
                                    <Link to={'/add-fund/paytm'}>Paytm</Link>
                                </li>
                            </ul>
                        </div>

                        <Route path="/add-fund" exact>
                            <Razorpay />
                        </Route>

                        <Route path="/add-fund/paytm" exact>
                            {'test'}
                        </Route>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default AddFund;
