import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Axios from '../../../../../axiosIns';
import AuthContext from '../../../../../store/AuthContext';

import Toast from '../../../../../components/UI/Toast/Toast';
import PageTitle from '../../../../../components/Extra/PageTitle';
import Loading from '../../../../../components/UI/Loading/Loading';

import '../../../../../sass/pages/user/Razorpay.scss';

// TODO Change clientId useage to email
const Razorpay = () => {
    const [amount, setAmount] = useState(0);
    const { email, fName } = useContext(AuthContext);
    const [keyId, setKeyId] = useState('');
    const { updateBalance, balance } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    async function getKey() {
        try {
            const url = '/razorpay';
            const { data } = await Axios.get(url);
            setKeyId(data.keyId);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getKey();
        setIsLoading(false);
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
        Toast.info('Loading please wait...', 1000);

        try {
            const orderData = { amount, email, fName };
            const url = '/razorpay/order';
            const { data } = await Axios.post(url, { ...orderData });
            const orderId = data.sub.id;
            createPayment(orderId);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    function amountChangeHandler(e) {
        setAmount(e.target.value);
    }

    return (
        <>
            <PageTitle title="Razorpay" />

            <Helmet>
                <script src="https://checkout.razorpay.com/v1/checkout.js" />
            </Helmet>

            <Loading show={isLoading} />

            <div className="Razorpay">
                <input
                    className="Razorpay__input input"
                    placeholder="Amount"
                    aria-label="amount"
                    type="number"
                    onChange={amountChangeHandler}
                />

                <div className="mt-3 Razorpay__checkbox">
                    <input type="checkbox" />
                    <p>I&apos;m paying for services and its non refundable!</p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary Razorpay_button"
                    onClick={(e) => getOrderId(e)}
                >
                    Pay
                </button>
            </div>
        </>
    );
};

export default Razorpay;
