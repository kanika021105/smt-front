import React, { useState, useEffect } from 'react';

import Axios from '../../../../../axiosIns';

import Toast from '../../../../../components/UI/Toast/Toast';
import Input from '../../../../../components/UI/Input/Input';
import PageTitle from '../../../../../components/Extra/PageTitle';
import Loading from '../../../../../components/UI/Loading/Loading';
import Checkbox from '../../../../../components/UI/Checkbox/Checkbox';

function Paytm() {
    const [merchantId, setMerchantId] = useState('');
    const [merchantKey, setMerchantKey] = useState('');
    const [isEnabled, setIsEnable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);
        try {
            const url = '/admin/settings/payment/paytm';
            const { data } = await Axios.get(url);
            setIsLoading(false);
            const { ids, enabled } = data;

            if (ids) {
                const { merchantId: id, merchantKey: key } = JSON.parse(ids);
                setMerchantId(id);
                setMerchantKey(key);
                setIsEnable(enabled);
            }
        } catch (err) {
            setIsLoading(false);
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    async function formSubmitHandler(e) {
        e.preventDefault();

        try {
            const url = '/admin/settings/payment/paytm/update';
            await Axios.put(url, { merchantId, merchantKey, isEnabled });
            Toast.success('Paytm details updated!');
        } catch (err) {
            Toast.failed(err.response.data.message || 'Failed to update paytm details!');
        }
    }

    function secretChangeHandler(e) {
        setMerchantId(e.target.value);
    }

    function keyIdChangeHandler(e) {
        setMerchantKey(e.target.value);
    }

    function enableToggle() {
        setIsEnable((preState) => !preState);
    }

    return (
        <>
            <PageTitle title="Settings" />
            <Loading show={isLoading} />

            <div className="border p-4">
                <form onSubmit={formSubmitHandler}>
                    <div>
                        <Checkbox checked={isEnabled} text="Enable" onChange={enableToggle} />
                        <Input label="Merchant Id" type="text" value={merchantId} placeholder="Merchant Id" onChange={secretChangeHandler} />
                        <Input label="Merchant Key" type="text" value={merchantKey} placeholder="Merchant Key" onChange={keyIdChangeHandler} />
                    </div>

                    <button className="mt-4 btn btn-primary" type="submit">Save</button>
                </form>
            </div>
        </>
    );
}

export default Paytm;
