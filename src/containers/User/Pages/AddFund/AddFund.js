import React, { useContext, useState } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Axios from '../../../../axiosIns';
import Theme from '../../../../store/theme';

import Toast from '../../../../components/UI/Toast/Toast';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import classes from './AddFund.module.scss';

const Paytm = React.lazy(() => import('./Paytm/Paytm'));
const Razorpay = React.lazy(() => import('./RazorPay/Razorpay'));

function NotFound() {
    return (
        <p>
            No payment gateway is enabled at this moment. Please contact admin and
            request to enable any payment gateway!
        </p>
    );
}

function AddFund() {
    const { darkTheme } = useContext(Theme);
    const [isLoading, setIsLoading] = useState(false);
    const [activeList, setActiveList] = useState({ paytm: false, razorpay: false });

    async function updateStatus(list) {
        list.map((_gateway) => {
            switch (_gateway.name) {
                case 'paytm':
                    return setActiveList((preState) => ({ ...preState, paytm: _gateway.enabled }));

                case 'razorpay':
                    return setActiveList((preState) => ({
                        ...preState,
                        razorpay: _gateway.enabled,
                    }));

                default:
                    return Toast.failed('Something unexpected happen!');
            }
        });
    }

    React.useEffect(async () => {
        try {
            setIsLoading(true);
            const url = '/payment-methods';
            const { data } = await Axios.get(url);
            updateStatus(data.list);
            setIsLoading(false);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    return (
        <>
            <PageTitle title="Add Fund" />
            <Loading show={isLoading} />

            <PageContainer>
                <PageHeader header="Add Fund" />

                <div className={`${classes.addfund__box} ${darkTheme ? classes.dark : ''}`}>
                    <div className={classes.addfund__links}>
                        <ul>
                            {activeList.razorpay && (<NavLink exact to="/add-fund/razorpay" activeClassName={classes.active}><li>Razorpay</li></NavLink>)}
                            {activeList.paytm && (<NavLink exact to="/add-fund/paytm" activeClassName={classes.active}><li>Paytm</li></NavLink>)}
                        </ul>
                    </div>

                    <div className={classes.addfund__gateway}>
                        <Route path="/add-fund/" exact>
                            {activeList.razorpay && (<Razorpay />)}
                            {!activeList.razorpay && activeList.paytm && (<Paytm />)}
                            {!activeList.razorpay && !activeList.paytm && <NotFound />}
                        </Route>

                        {activeList.razorpay && (<Route exact path="/add-fund/razorpay"><Razorpay /></Route>)}
                        {activeList.paytm && (<Route exact path="/add-fund/paytm"><Paytm /></Route>)}
                    </div>
                    <p>*All payment are 100% safe and secure.</p>
                </div>
            </PageContainer>
        </>
    );
}

export default AddFund;
