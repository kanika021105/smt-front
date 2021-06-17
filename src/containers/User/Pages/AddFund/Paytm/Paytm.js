// jshint esversion:9

import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Axios from '../../../../../axiosIns';
import { AuthContext } from '../../../../Context/AuthContext';
import Loading from '../../../../../components/UI/Loading/Loading';

import { WebsiteDetail } from '../../../../../containers/Context/WebsiteDetailContext';

import '../../../../../sass/pages/user/Razorpay.scss';

const Razorpay = () => {
    const [amount, setAmount] = useState(0);
    const { userId, fName } = useContext(AuthContext);
    const [publicKey, setPublicKey] = useState('');

    const { websiteName } = useContext(WebsiteDetail);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // setIsLoading(true);
        // const url = '';
        // Axios.get(url).then((res) => {
        //     const { data } = res;
        //     setPublicKey(data.publicKey);
        //     setIsLoading(false);
        // });
    }, []);

    const amountChangeHandler = (e) => {
        setAmount(+e.target.value);
    };

    function buildForm({ action, params }) {
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', action);

        Object.keys(params).forEach((key) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', stringifyValue(params[key]));
            form.appendChild(input);
        });

        return form;
    }

    function post(details) {
        const form = buildForm(details);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    }

    function isDate(val) {
        return Object.prototype.toString.call(val) === '[object Date]';
    }

    function isObj(val) {
        return typeof val === 'object';
    }

    function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val);
        }
        return val;
    }

    const paymentSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const url = '/paytm';
            const { data } = await Axios.post(url, { amount });
            console.log(data);

            const details = {
                action: 'https://securegw-stage.paytm.in/order/process',
                params: data,
            };

            post(details);
        } catch (err) {
            throw err;
        }
    };

    return (
        <>
            <Helmet>
                <title>RazorPay - {websiteName || 'SMT'} </title>
            </Helmet>

            {<Loading show={isLoading} />}

            <form onSubmit={paymentSubmitHandler}>
                <div className="Paytm">
                    <input
                        className="Razorpay__input input"
                        placeholder="Amount"
                        type="number"
                        onChange={amountChangeHandler}
                    />

                    <div className="mt-3 Razorpay__checkbox">
                        <input type="checkbox" />
                        <p>I'm paying for services and its non refundable!</p>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary Razorpay_button"
                    >
                        Pay
                    </button>
                </div>
            </form>
        </>
    );
};

export default Razorpay;
