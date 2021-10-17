import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Axios from '../../../../../axiosIns';
import Theme from '../../../../../store/theme';
import AuthContext from '../../../../../store/AuthContext';

import Toast from '../../../../../components/UI/Toast/Toast';
import PageTitle from '../../../../../components/Extra/PageTitle';
import Loading from '../../../../../components/UI/Loading/Loading';
import Checkbox from '../../../../../components/UI/Checkbox/Checkbox';

import classes from './Razorpay.module.scss';

function Razorpay() {
    const [keyId, setKeyId] = useState('');
    const [amount, setAmount] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { darkTheme } = useContext(Theme);
    const { email, fName } = useContext(AuthContext);
    const { updateBalance, balance } = useContext(AuthContext);

    useEffect(async () => {
        try {
            setIsLoading(true);
            const url = '/razorpay';
            const { data } = await Axios.get(url);
            setKeyId(data.keyId);
            return setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    function updateUserBalance(txnAmount) {
        updateBalance(balance + txnAmount);
        return Toast.success('Payment successful!');
    }

    async function verifyOrder(response, orderId) {
        try {
            const url = '/razorpay/payment/verify';
            const params = {
                razorpay_order_id: orderId,
                razorpay_signature: response.razorpay_signature,
                razorpay_payment_id: response.razorpay_payment_id,
            };
            await Axios.post(url, { ...params });
            return updateUserBalance(+amount);
        } catch (err) {
            return Toast.failed(err.response, 6000);
        }
    }

    function createPayment(orderId) {
        try {
            const options = {
                currency: 'INR',
                order_id: orderId,
                name: 'Tabish Alam',
                description: 'Tabish Transaction',
                key: keyId || process.env.REACT_APP_RAZORPAY_KEY,

                handler: async (response) => {
                    await verifyOrder(response, orderId);
                },
                theme: { color: '#3f80ea' },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    async function getOrderId(e) {
        e.preventDefault();
        setIsLoading(true);
        if (confirm) {
            try {
                const orderData = { amount, email, fName };
                const url = '/razorpay/order';
                const { data } = await Axios.post(url, { ...orderData });
                const orderId = data.sub.id;
                createPayment(orderId);
                return setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                return Toast.failed(err.response.data.message || 'Something went wrong!');
            }
        }
        setIsLoading(false);
        return Toast.failed('Please confirm your transaction!');
    }

    function amountChangeHandler(e) {
        setAmount(e.target.value);
    }

    return (
        <>
            <PageTitle title="Razorpay" />
            <Loading show={isLoading} />

            <Helmet>
                <script src="https://checkout.razorpay.com/v1/checkout.js" />
            </Helmet>

            <div className={`${classes.razorpay} ${darkTheme ? classes.dark : ''}`}>
                <h2 className={classes.logo}>
                    <span className={classes['logo_color--1']}>Razorpay</span>
                    {' '}
                    Gateway
                </h2>

                <form onSubmit={getOrderId}>
                    <input className={classes.input} type="number" min="1" placeholder="Amount" onChange={amountChangeHandler} />
                    <Checkbox checked={confirm} text="I'm paying for services and its non refundable!" onChange={() => { setConfirm((preState) => !preState); }} />
                    <button type="submit" className={classes.pay_now}>Pay</button>
                </form>
            </div>
        </>
    );
}

export default Razorpay;
