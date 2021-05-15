// jshint esversion:9

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import Axios from '../../../../../axiosIns';
import '../../../../../sass/pages/admin/settings/payment.scss';

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
                    <Form.Group>
                        <Form.Label>RazorPay Details</Form.Label>
                        <div>
                            <div className="pb-2">
                                <Form.Label>Secret Key</Form.Label>
                                <Form.Control
                                    value={secretKey}
                                    placeholder={'Key Secret'}
                                    onChange={secretChangeHandler}
                                />
                            </div>

                            <div>
                                <Form.Label>Key Id</Form.Label>
                                <Form.Control
                                    value={keyId}
                                    placeholder={'Key Id'}
                                    onChange={keyIdChangeHandler}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </>
    );
};

export default Payment;
