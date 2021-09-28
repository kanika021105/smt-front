import React, { useContext, useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Axios from '../../../../axiosIns';
import Theme from '../../../../store/theme';
import AuthContext from '../../../../store/AuthContext';

import Card from '../../../../components/UI/Card/Card';
import Toast from '../../../../components/UI/Toast/Toast';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';

import '../../../../sass/pages/user/AddFund.scss';

const Paytm = React.lazy(() => import('./Paytm/Paytm'));
const Razorpay = React.lazy(() => import('./RazorPay/Razorpay'));

const NotFound = () => (
    <p>
        No payment gateway is enabled at this moment. Please contact admin and
        request to enable any payment gateway!
    </p>
);

const AddFund = () => {
    const { websiteName } = useContext(AuthContext);
    const { darkTheme } = useContext(Theme);
    const [activeList, setActiveList] = useState({
        paytm: false,
        razorpay: false,
    });

    async function updateStatus(list) {
        list.map((gateway) => {
            switch (gateway.name) {
                case 'paytm':
                    return setActiveList((preState) => ({
                        ...preState,
                        paytm: gateway.enable,
                    }));

                case 'razorpay':
                    return setActiveList((preState) => ({
                        ...preState,
                        razorpay: gateway.enable,
                    }));

                default:
                    return Toast.failed('Something unexpected happen!');
            }
        });
    }

    async function getStatus() {
        const url = '/payment-methods';
        const { data } = await Axios.get(url);
        if (data.list) updateStatus(data.list);
    }

    React.useEffect(() => {
        getStatus();
    }, []);

    // TODO Change title to dynamic
    return (
        <div className={darkTheme ? 'dark container addfund' : 'container addfund'}>
            <PageHeader header="Add Fund" />

            <Card>
                <div className="addfund__box">
                    <div className="addfund__links">
                        <ul>
                            {
                                activeList.razorpay
                                && (
                                    <li>
                                        <NavLink
                                            to="/add-fund/razorpay"
                                            activeClassName="active"
                                            exact
                                        >
                                            Razorpay
                                        </NavLink>
                                    </li>
                                )
                            }

                            {activeList.paytm && (
                                <li>
                                    <NavLink
                                        to="/add-fund/paytm"
                                        activeClassName="active"
                                        exact
                                    >
                                        Paytm
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="addfund__gateway">
                        <Route path="/add-fund/" exact>
                            {
                                activeList.razorpay
                                    && (<Razorpay />)
                            }
                            {
                                !activeList.razorpay
                                    && activeList.paytm
                                    && (<Paytm />)
                            }
                            {
                                !activeList.razorpay
                                    && !activeList.paytm
                                    && <NotFound />
                            }
                        </Route>

                        {activeList.razorpay && (
                            <Route path="/add-fund/razorpay" exact>
                                <Razorpay />
                            </Route>
                        )}

                        {activeList.paytm && (
                            <Route path="/add-fund/paytm" exact>
                                <Helmet>
                                    <title>
                                        Paytm -
                                        {' '}
                                        {websiteName || ''}
                                        {' '}
                                    </title>
                                </Helmet>
                                <Paytm />
                            </Route>
                        )}
                    </div>
                    <p>*All payment are 100% safe and secure.</p>
                </div>
            </Card>
        </div>
    );
};

export default AddFund;
