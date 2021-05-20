// jshint esversion:9

import React, { useState } from 'react';

import { Helmet } from 'react-helmet';
import '../../../../../sass/pages/admin/settings/general.scss';

const General = () => {
    const [websiteName, setWebsiteName] = useState('');
    const [websiteDescription, setWebsiteDescription] = useState('');

    const websiteNameChangeHandler = (e) => {
        setWebsiteName(e.target.value);
    };

    return (
        <>
            <div className=" border p-4">
                <div>
                    <label className="input__label">Website Name</label>
                    <input
                        className="input"
                        placeholder="Website Name"
                        type="text"
                        value={websiteName}
                        onChange={websiteNameChangeHandler}
                    />
                </div>

                <div className="pt-2">
                    <label className="input__label">Website Description</label>
                    <textarea
                        placeholder="Website Description..."
                        className="input"
                        rows="5"
                        value={websiteDescription}
                        onChange={websiteNameChangeHandler}
                    />
                </div>

                <div className="pt-2">
                    <label className="input__label">Website Keywords</label>
                    <textarea
                        placeholder="Website Keywords..."
                        className="input"
                        rows="6"
                        value={websiteName}
                        onChange={websiteNameChangeHandler}
                    />
                </div>

                <button className="mt-3 btn btn-primary">Save</button>
            </div>
        </>
    );
};

export default General;
