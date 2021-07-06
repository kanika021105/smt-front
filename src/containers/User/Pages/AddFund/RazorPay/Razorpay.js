import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Axios from '../../../../../axiosIns';
import Loading from '../../../../../components/UI/Loading/Loading';
import Context from '../../../../../store/context';
import Toast from '../../../../../components/UI/Toast/Toast';

import '../../../../../sass/pages/user/Razorpay.scss';

// TODO Change clientId useage to email
const Razorpay = () => {
    const [amount, setAmount] = useState(0);
    const { email, fName } = useContext(Context);
    const [keyId, setKeyId] = useState('');
    const { websiteName } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const url = '/razorpay';
        Axios.get(url).then((res) => {
            const { data } = res;
            setKeyId(data.keyId);
        }).catch((err) => Toast.failed(err.response.data.message || 'Something went wrong!'));
        setIsLoading(false);
    }, []);

    const razorpayHandler = async (e) => {
        e.preventDefault();

        const orderData = {
            amount,
            email,
            fName,
        };

        try {
            let url = '/razorpay/order';
            const { data } = await Axios.post(url, { ...orderData });
            const orderId = data.sub.id;

            const options = {
                currency: 'INR',
                order_id: orderId,
                name: 'Tabish Alam',
                description: 'Tabish Transaction',
                key: keyId || process.env.REACT_APP_RAZORPAY_KEY,

                handler: async (response) => {
                    try {
                        url = '/razorpay/payment/verify';
                        const params = {
                            razorpay_order_id: orderId,
                            razorpay_signature: response.razorpay_signature,
                            razorpay_payment_id: response.razorpay_payment_id,
                        };
                        await Axios.post(url, { ...params });
                    } catch (err) {
                        Toast.error(err);
                    }
                },
                theme: { color: '#3f80ea' },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (err) {
            console.log(err.response.data.message);
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    };

    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
    };
    return (
        <>
            <Helmet>
                <title>
                    RazorPay -
                    {' '}
                    {websiteName || ''}
                    {' '}
                </title>
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
                    onClick={(e) => {
                        razorpayHandler(e);
                    }}
                >
                    Pay
                </button>
            </div>
        </>
    );
};

export default Razorpay;
