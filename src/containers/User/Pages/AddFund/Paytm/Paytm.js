import React, { useEffect, useState, useContext } from 'react';
import { CheckoutProvider, Checkout } from 'paytm-blink-checkout-react';

import Axios from '../../../../../axiosIns';
import AuthContext from '../../../../../store/AuthContext';

import Toast from '../../../../../components/UI/Toast/Toast';
import Input from '../../../../../components/UI/Input/Input';
import PageTitle from '../../../../../components/Extra/PageTitle';
import Checkbox from '../../../../../components/UI/Checkbox/Checkbox';

const Paytm = () => {
    const [config, setConfig] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);
    const [amount, setAmount] = useState('');
    const [merchantId, setMerchantId] = useState('');
    const { balance, updateBalance } = useContext(AuthContext);

    async function verifyPayment(paymentStatus) {
        try {
            const url = 'paytm/verify';
            await Axios.post(url, { ...paymentStatus });
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    function updateUserBalance(paymentStatus) {
        updateBalance(balance + +paymentStatus.TXNAMOUNT);
        return Toast.success('Payment successful!');
    }

    function handleTransaction(paymentStatus) {
        if (paymentStatus) {
            setShowCheckout(false);
            window.Paytm.CheckoutJS.close();

            verifyPayment(paymentStatus);
            if (paymentStatus.STATUS === 'TXN_SUCCESS') {
                return updateUserBalance(paymentStatus);
            }
            return Toast.failed('Payment failed!');
        }
        return Toast.failed('Something went wrong!');
    }

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

            transactionStatus: (paymentStatus) => {
                handleTransaction(paymentStatus);
            },
        },
    };

    async function getMerchantId() {
        try {
            const url = '/paytm';
            const { data } = await Axios.get(url);
            setMerchantId(data.merchantId);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    useEffect(() => {
        getMerchantId();
    }, []);

    function amountChangeHandler(e) {
        setAmount(+e.target.value);
    }

    async function getToken(orderId) {
        try {
            const url = 'paytm/get-token';
            const { data } = await Axios.post(url, { orderId, amount });
            const { token } = data;
            CONFIG = {
                ...CONFIG,
                data: {
                    ...CONFIG.data,
                    orderId,
                    token,
                },
            };
            setConfig({ ...CONFIG });
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    async function toggleCheckout(e) {
        e.preventDefault();

        try {
            const orderId = `ORDER_ID_${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${Math.floor(Math.random() * 999999999999)}`;
            getToken(orderId);
            setShowCheckout(true);
            Toast.info('Loading... Please wait!', 4000);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    return (
        <>
            <PageTitle title="Paytm" />

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
