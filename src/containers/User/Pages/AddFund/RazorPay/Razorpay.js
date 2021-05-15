// jshint esversion:9

import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { InputGroup, FormControl } from 'react-bootstrap';

import Axios from '../../../../../axiosIns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './RazorPay.module.css';
import Card from '../../../../../components/UI/Card/Card';
import { AuthContext } from '../../../../Context/AuthContext';

const Razorpay = () => {
    const [amount, setAmount] = useState(0);
    const { userId, fName } = useContext(AuthContext);
    const [publicKey, setPublicKey] = useState('');

    useEffect(() => {
        const url = '';
        Axios.get(url).then((res) => {
            const { data } = res;

            setPublicKey(data.publicKey);
        });
    }, []);

    const razorpayHandler = async (e) => {
        e.preventDefault();

        let orderData = {
            amount,
            userId,
            fName,
        };

        let url = '/razorpay/order';
        let orderId = await Axios.post(url, { ...orderData }).then(
            (res) => res.data.sub.id
        );

        let options = {
            currency: 'INR',
            order_id: orderId,
            name: 'Tabish Alam',
            description: 'Tabish Transaction',
            key: publicKey || process.env.REACT_APP_RAZORPAY_KEY,

            handler: async (response) => {
                try {
                    let url = '/razorpay/payment/verify';
                    let params = {
                        razorpay_order_id: orderId,
                        razorpay_signature: response.razorpay_signature,
                        razorpay_payment_id: response.razorpay_payment_id,
                    };
                    await Axios.post(url, { ...params });
                } catch (err) {
                    console.log(err);
                }
            },
            theme: {
                color: '#3f80ea',
            },
        };

        let rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
        return;
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>RazorPay - Add Fund</title>
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </Helmet>

            <div className="container">
                <div className={classes.Razorpay}>
                    <h2 className="pageTitle">Add Fund</h2>
                    <Card>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    ₹
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Amount"
                                aria-label="amount"
                                type="number"
                                onChange={amountChangeHandler}
                            />
                        </InputGroup>

                        <button
                            className="btn btn-success"
                            onClick={(e) => {
                                razorpayHandler(e);
                            }}
                        >
                            Pay
                        </button>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Razorpay;
