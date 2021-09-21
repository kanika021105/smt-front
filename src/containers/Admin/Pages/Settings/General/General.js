import React, { useEffect, useContext, useState } from 'react';

import Axios from '../../../../../axiosIns';
import AuthContext from '../../../../../store/AuthContext';

import Toast from '../../../../../components/UI/Toast/Toast';
import Input from '../../../../../components/UI/Input/Input';
import PageTitle from '../../../../../components/Extra/PageTitle';
import Loading from '../../../../../components/UI/Loading/Loading';
import Textarea from '../../../../../components/UI/Textarea/Textarea';

const General = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { updateWebsiteName } = useContext(AuthContext);

    useEffect(() => {
        const url = '/admin/settings/general';
        Axios.get(url)
            .then((res) => {
                setName(res.data.websiteName || '');
                setDescription(res.data.websiteDescription || '');
                setKeywords(res.data.websiteKeywords || '');
            })
            .catch((err) => {
                Toast.failed(err.response.data.message || 'Something went wrong!');
            });
    }, []);

    const siteNameChangeHandler = (e) => {
        setName(e.target.value);
        setIsLoading(false);
    };

    const descriptionHandler = (e) => {
        setDescription(e.target.value);
    };

    const keywordsHandler = (e) => {
        setKeywords(e.target.value);
    };

    const submitSetting = async () => {
        updateWebsiteName(name);
        const url = '/admin/settings/general/update';
        await Axios.put(url, { name, keywords, description });
        Toast.success('Generals settings updated!');
    };

    return (
        <>
            <PageTitle title="General" />
            <Loading show={isLoading} />

            <Input
                label="Website Name"
                placeholder="SMT Panel"
                type="text"
                value={name}
                onChange={siteNameChangeHandler}
            />

            <Textarea
                label="Website Description"
                placeholder="SMT Panel smm script is the script you need
                    to start your social media marketing business.
                    Its simple yet verify powerful!"
                rows={5}
                value={description}
                onChange={descriptionHandler}
            />

            <Textarea
                label="Website Keywords"
                placeholder="'SMT Panel', 'Smm Panel', 'Smm Script'..."
                rows={6}
                value={keywords}
                onChange={keywordsHandler}
            />

            <button type="button" className="mt-3 btn btn-primary" onClick={submitSetting}>
                Save
            </button>
        </>
    );
};

export default General;
