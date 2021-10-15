import React, { useState, useEffect } from 'react';

import Input from '../../../../../components/UI/Input/Input';
import Toast from '../../../../../components/UI/Toast/Toast';
import Loading from '../../../../../components/UI/Loading/Loading';
import Checkbox from '../../../../../components/UI/Checkbox/Checkbox';

import PageTitle from '../../../../../components/Extra/PageTitle';

import Axios from '../../../../../axiosIns';

function Razorpay() {
    const [keyId, setKeyId] = useState('');
    const [keySecret, setKeySecret] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);

        try {
            const url = '/admin/settings/payment/razorpay';
            const { data } = await Axios.get(url);
            setIsLoading(false);
            const { ids, enabled } = data;

            if (ids) {
                const { keyId: id, keySecret: secret } = JSON.parse(ids);
                setKeyId(id);
                setKeySecret(secret);
                setIsEnabled(enabled);
            }
        } catch (err) {
            setIsLoading(false);
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    async function submitHandler(e) {
        e.preventDefault();

        const url = '/admin/settings/payment/razorpay/update';
        try {
            await Axios.put(url, { keyId, keySecret, isEnabled });
            Toast.success('Razorpay details updated!');
        } catch (err) {
            Toast.failed(err.response.message || 'Failed to update details!');
        }
    }

    function keyIdChangeHandler(e) {
        setKeyId(e.target.value);
    }

    function secretChangeHandler(e) {
        setKeySecret(e.target.value);
    }

    function enableToggle() {
        setIsEnabled((preState) => !preState);
    }

    return (
        <>
            <PageTitle title="RazorPay" />
            <Loading show={isLoading} />

            <div>
                <Checkbox text="Enable" checked={isEnabled} onChange={enableToggle} />
                <Input label="Key Id" type="text" value={keyId} placeholder="Key Id" onChange={keyIdChangeHandler} />
                <Input label="Key Secret" type="text" value={keySecret} placeholder="Key Secret" onChange={secretChangeHandler} />
            </div>

            <button className="mt-4 btn btn-primary" type="submit" onClick={submitHandler}>Save</button>
        </>
    );
}

export default Razorpay;
