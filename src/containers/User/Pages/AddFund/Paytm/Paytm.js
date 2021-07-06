import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { CheckoutProvider, Checkout } from 'paytm-blink-checkout-react';

import Axios from '../../../../../axiosIns';
import Toast from '../../../../../components/UI/Toast/Toast';
import Input from '../../../../../components/UI/Input/Input';
import Checkbox from '../../../../../components/UI/Checkbox/Checkbox';
import Context from '../../../../../store/context';

const Paytm = () => {
    const [config, setConfig] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);
    const [amount, setAmount] = useState(1);
    const [merchantId, setMerchantId] = useState('');

    const { websiteName } = useContext(Context);
    const { balance, updateBalance } = useContext(Context);

    let CONFIG = {
        style: {
            bodyBackgroundColor: '#fafafb',
            bodyColor: '',
            themeBackgroundColor: '#2f90ea',
            themeColor: '#ffffff',
            headerBackgroundColor: '#3f80ea',
            headerColor: '#ffffff',
            errorColor: '',
            successColor: '',
            card: {
                padding: '',
                backgroundColor: '',
            },
        },
        jsFile: '',
        data: {
            orderId: '',
            amount,
            token: '',
            tokenType: 'TXN_TOKEN',
            userDetail: {
                mobileNumber: '',
                name: '',
            },
        },
        merchant: {
            mid: merchantId || process.env.REACT_APP_PAYTM_MERCHANT_ID,
            name: 'SMT Panel',
            logo: '',
            redirect: false,
        },
        mapClientMessage: {},
        labels: {},
        payMode: {
            labels: {},
            filter: {
                exclude: [],
            },
            order: [],
        },
        flow: 'DEFAULT',
        handler: {
            notifyMerchant: (eventName) => {
                if (eventName === 'SESSION_EXPIRED') {
                    Toast.failed('Your session has expired!');
                    window.location.reload();
                }
            },

            transactionStatus: async (paymentStatus) => {
                if (paymentStatus) {
                    setShowCheckout(false);
                    window.Paytm.CheckoutJS.close();

                    if (paymentStatus.STATUS === 'TXN_SUCCESS') {
                        updateBalance(balance + +paymentStatus.TXNAMOUNT);
                        const url = 'paytm/verify';
                        await Axios.post(url, { ...paymentStatus });
                        return Toast.success('Payment successful!');
                    }

                    const url = 'paytm/verify';
                    await Axios.post(url, { ...paymentStatus });
                    return Toast.failed('Payment failed!');
                }
            },
        },
    };

    useEffect(() => {
        Axios.get('/paytm').then((res) => {
            setMerchantId(res.data.merchantId);
        }).catch((err) => {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        });
    }, []);

    const amountChangeHandler = (e) => setAmount(+e.target.value);

    const toggleCheckout = async (e) => {
        e.preventDefault();

        const orderId = `ORDER_ID_${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${Math.floor(Math.random() * 999999999999)}`;
        const url = 'paytm/get-token';
        const { data } = await Axios.post(url, { orderId, amount });
        const { token } = data;
        CONFIG = { ...CONFIG, data: { ...CONFIG.data, orderId, token } };
        setConfig({ ...CONFIG });
        setShowCheckout(true);
    };

    return (
        <>
            <Helmet>
                <title>
                    Paytm -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            <div className="Paytm">
                <form onSubmit={toggleCheckout}>

                    <Input
                        label=""
                        type="number"
                        placeholder="Amount"
                        onChange={amountChangeHandler}
                    />

                    <Checkbox text="I'm paying for services and its non refundable!" />
                    <button
                        type="submit"
                        className="btn btn-primary Razorpay_button"
                    >
                        Pay
                    </button>
                </form>

                <CheckoutProvider
                    config={config}
                    checkoutJsInstance={null}
                    openInPopup
                    env="PROD"
                >
                    {showCheckout && <Checkout />}
                </CheckoutProvider>
            </div>
        </>
    );
};

export default Paytm;
