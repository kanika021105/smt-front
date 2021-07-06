import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Axios from '../../../../../axiosIns';
import Context from '../../../../../store/context';
import Toast from '../../../../../components/UI/Toast/Toast';
import Input from '../../../../../components/UI/Input/Input';
import Loading from '../../../../../components/UI/Loading/Loading';

const Razorpay = () => {
    const [keyId, setKeyId] = useState('');
    const [keySecret, setKeySecret] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { websiteName } = useContext(Context);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/settings/payment/razorpay';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);
                const { data } = res;

                setKeyId(data.data.keyId);
                setKeySecret(data.data.keySecret);
            })
            .catch((err) => {
                setIsLoading(false);
                Toast.failed(err.response.data.message || 'Something went wrong!');
            });
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        const url = '/admin/settings/payment/razorpay/update';
        try {
            await Axios.put(url, {
                keyId,
                keySecret,
            });
            Toast.success('Razorpay details updated!');
        } catch (err) {
            Toast.failed(err.response.message || 'Failed to update details!');
        }
    };

    const keyIdChangeHandler = (e) => {
        setKeyId(e.target.value);
    };

    const secretChangeHandler = (e) => {
        setKeySecret(e.target.value);
    };

    return (
        <>
            <Helmet>
                <title>
                    Payment -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            <div>
                <Input
                    label="Key Id"
                    type="text"
                    value={keyId}
                    placeholder="Key Id"
                    onChange={keyIdChangeHandler}
                />

                <Input
                    label="Key Secret"
                    type="text"
                    value={keySecret}
                    placeholder="Key Secret"
                    onChange={secretChangeHandler}
                />
            </div>

            <button className="mt-4 btn btn-primary" type="submit" onClick={submitHandler}>
                Save
            </button>
        </>
    );
};

export default Razorpay;
