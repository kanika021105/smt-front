import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Axios from '../../../../../axiosIns';
import Input from '../../../../../components/UI/Input/Input';
import Loading from '../../../../../components/UI/Loading/Loading';
import Toast from '../../../../../components/UI/Toast/Toast';
import Context from '../../../../../store/context';
import Checkbox from '../../../../../components/UI/Checkbox/Checkbox';

const Razorpay = () => {
    const [merchantId, setMerchantId] = useState('');
    const [merchantKey, setMerchantKey] = useState('');
    const [enable, setEnable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { websiteName } = useContext(Context);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/settings/payment/paytm';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);
                const { data } = res;
                const { ids, enable: active } = data;

                if (ids) {
                    const { merchantId: id, merchantKey: key } = JSON.parse(ids);
                    setMerchantId(id);
                    setMerchantKey(key);
                    setEnable(active);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setIsLoading(false);
                Toast.failed(err.response.data.message || 'Something went wrong!');
            });
    }, []);

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const url = '/admin/settings/payment/paytm/update';
        try {
            await Axios.put(url, {
                merchantId,
                merchantKey,
                enable,
            });

            Toast.success('Paytm details updated!');
        } catch (err) {
            Toast.failed(err.response.data.message || 'Failed to update paytm details!');
        }
    };

    const secretChangeHandler = (e) => {
        setMerchantId(e.target.value);
    };

    const keyIdChangeHandler = (e) => {
        setMerchantKey(e.target.value);
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

            <div className="border p-4">
                <form onSubmit={formSubmitHandler}>
                    <div>
                        <Checkbox checked={enable} text="Enable" onChange={enableToggle} />

                        <Input
                            label="Merchant Id"
                            type="text"
                            value={merchantId}
                            placeholder="Merchant Id"
                            onChange={secretChangeHandler}
                        />

                        <Input
                            label="Merchant Key"
                            type="text"
                            value={merchantKey}
                            placeholder="Merchant Key"
                            onChange={keyIdChangeHandler}
                        />
                    </div>

                    <button className="mt-4 btn btn-primary" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};

export default Razorpay;
