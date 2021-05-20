// jshint esversion:9

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import Axios from '../../../../../axiosIns';
import '../../../../../sass/pages/admin/settings/payment.scss';
import classes from '../../../../../sass/pages/admin/settings/payment.scss';

const Payment = () => {
    const [secretKey, setSecretKey] = useState('');
    const [keyId, setKeyId] = useState('');

    useEffect(() => {
        const url = '/admin/settings/razorpay';

        Axios.get(url)
            .then((res) => {
                const { data } = res;

                setSecretKey(data.privateKey);
                setKeyId(data.publicKey);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const url = '/admin/settings/razorpay';
        try {
            const { data } = Axios.put(url, {
                privateKey: secretKey,
                publicKey: keyId,
            });
            console.log(data);
        } catch (err) {
            console.log(err.response.message);
        }
    };

    const secretChangeHandler = (e) => {
        setSecretKey(e.target.value);
    };

    const keyIdChangeHandler = (e) => {
        setKeyId(e.target.value);
    };

    return (
        <>
            <div className="border p-4">
                <form onSubmit={formSubmitHandler}>
                    <div>
                        <h3 className="payment__heading">RazorPay Details</h3>
                        <div className="mt-2">
                            <label className="input__label">Secret Key</label>
                            <input
                                className="input"
                                type="text"
                                value={secretKey}
                                placeholder={'Key Secret'}
                                onChange={secretChangeHandler}
                            />
                        </div>

                        <div className="mt-2">
                            <label className="input__label">Key Id</label>
                            <input
                                className="input"
                                type="text"
                                value={keyId}
                                placeholder={'Key Id'}
                                onChange={keyIdChangeHandler}
                            />
                        </div>
                    </div>

                    <button className="mt-4 btn btn-primary" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};

export default Payment;
