// jshint esversion:9

import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';

import Loading from '../../../../../components/UI/Loading/Loading';
import { WebsiteDetail } from '../../../../../containers/Context/WebsiteDetailContext';

import '../../../../../sass/pages/admin/settings/general.scss';

const General = () => {
    const [siteName, setSiteName] = useState('');
    const [websiteDescription, setWebsiteDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { websiteName } = useContext(WebsiteDetail);

    const siteNameChangeHandler = (e) => {
        setSiteName(e.target.value);
    };

    return (
        <>
            <Helmet>
                <title>General - {websiteName || 'SMT'}</title>
            </Helmet>

            {<Loading show={isLoading} />}

            <div className=" border p-4">
                <div>
                    <label className="input__label">Website Name</label>
                    <input
                        className="input"
                        placeholder="Website Name"
                        type="text"
                        value={siteName}
                        onChange={siteNameChangeHandler}
                    />
                </div>

                <div className="pt-2">
                    <label className="input__label">Website Description</label>
                    <textarea
                        placeholder="Website Description..."
                        className="input"
                        rows="5"
                        value={websiteDescription}
                        onChange={siteNameChangeHandler}
                    />
                </div>

                <div className="pt-2">
                    <label className="input__label">Website Keywords</label>
                    <textarea
                        placeholder="Website Keywords..."
                        className="input"
                        rows="6"
                        value={websiteName}
                        onChange={siteNameChangeHandler}
                    />
                </div>

                <button className="mt-3 btn btn-primary">Save</button>
            </div>
        </>
    );
};

export default General;
