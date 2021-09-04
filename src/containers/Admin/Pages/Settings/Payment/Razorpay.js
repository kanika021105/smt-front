import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Axios from '../../../../../axiosIns';
import Toast from '../../../../../components/UI/Toast/Toast';
import Input from '../../../../../components/UI/Input/Input';
import Checkbox from '../../../../../components/UI/Checkbox/Checkbox';
import Loading from '../../../../../components/UI/Loading/Loading';

import AuthContext from '../../../../../store/AuthContext';

const Razorpay = () => {
    const [keyId, setKeyId] = useState('');
    const [keySecret, setKeySecret] = useState('');
    const [enable, setEnable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { websiteName } = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/settings/payment/razorpay';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);
                const { data } = res;
                const { ids, enable: active } = data;

                if (ids) {
                    const { keyId: id, keySecret: secret } = JSON.parse(ids);
                    setKeyId(id);
                    setKeySecret(secret);
                    setEnable(active);
                }
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
                enable,
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

    const enableToggle = () => {
        setEnable((preState) => !preState);
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
                <Checkbox text="Enable" checked={enable} onChange={enableToggle} />

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
