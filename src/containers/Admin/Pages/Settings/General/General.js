// jshint esversion:9

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';
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
                <Form.Group>
                    <Form.Label>Website Name</Form.Label>
                    <Form.Control
                        value={websiteName}
                        onChange={websiteNameChangeHandler}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Website Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="6"
                        value={websiteDescription}
                        onChange={websiteNameChangeHandler}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Website Keywords</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="8"
                        value={websiteName}
                        onChange={websiteNameChangeHandler}
                    />
                </Form.Group>

                <Button className="ml-auto">Submit</Button>
            </div>
        </>
    );
};

export default General;
