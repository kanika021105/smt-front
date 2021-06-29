// /* eslint-disable */

import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { CheckoutProvider, Checkout, injectCheckout } from 'paytm-blink-checkout-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Axios from '../../../../../axiosIns';
import InjectCheckout from './injected-checkout';
import WebsiteDetail from '../../../../Context/WebsiteDetailContext';

const InjectedCheckout = injectCheckout(InjectCheckout);
toast.configure();

const Paytm = () => {
    const [amount, setAmount] = useState(1);
    const [config, setConfig] = useState();
    const [showCheckout, setShowCheckout] = useState(false);

    const { websiteName } = useContext(WebsiteDetail);

    const success = () => toast('Payment successful!', {
        type: 'success',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: null,
    });

    const failed = () => toast('Transaction failed!', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: null,
    });

    const amountChangeHandler = (e) => setAmount(+e.target.value);

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
            mid: 'OhFfSe81879043311565',
            name: 'Test Gateway',
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
                    // eslint-disable-next-line no-alert
                    alert('Your session has expired!!');
                    window.location.reload();
                }
            },

            transactionStatus: async (paymentStatus) => {
                if (paymentStatus) {
                    setShowCheckout(false);
                    window.Paytm.CheckoutJS.close();

                    if (paymentStatus.STATUS === 'TXN_SUCCESS') {
                        const url = 'paytm/verify';
                        await Axios.post(url, { ...paymentStatus });

                        return success();
                    }

                    failed();

                    const url = 'paytm/verify';
                    await Axios.post(url, { ...paymentStatus });
                }
            },
        },
    };

    const toggleCheckout = async (e) => {
        e.preventDefault();

        const orderId = `ORDER_ID_${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${Math.floor(Math.random() * 999999999999)}`;
        const url = 'paytm/get-token';
        const { data } = await Axios.post(url, { orderId, amount });
        const { token } = data;

        console.log({ token });

        CONFIG = {
            ...CONFIG,
            data: {
                ...CONFIG.data,
                orderId,
                token,
            },
        };

        setConfig({ ...CONFIG });
        setShowCheckout(true);
    };

    return (

        <>
            <Helmet>
                <title>
                    Paytm -
                    {' '}
                    {websiteName || 'SMT'}
                </title>
            </Helmet>

            <div className="Paytm">
                <form onSubmit={toggleCheckout}>
                    <input
                        className="Razorpay__input input"
                        placeholder="Amount"
                        type="number"
                        onChange={amountChangeHandler}
                    />

                    <div className="mt-3 Razorpay__checkbox">
                        <input type="checkbox" />
                        <p>I&apos;m paying for services and its non refundable!</p>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary Razorpay_button"
                    >
                        Pay
                    </button>
                </form>

                <br />

                <div>
                    <b>CHECKOUT VISIBILITY :</b>
                    {' '}
                    {showCheckout.toString()}
                </div>

                <CheckoutProvider
                    config={config}
                    checkoutJsInstance={null}
                    openInPopup
                    env="STAGE"
                >
                    <InjectedCheckout />
                    {showCheckout && <Checkout />}
                </CheckoutProvider>
            </div>
        </>
    );
};

export default Paytm;
