import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Axios from '../../../../axiosIns';

import Toast from '../../../../components/UI/Toast/Toast';
import PageTitle from '../../../../components/Extra/PageTitle';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import classes from './ApiDocs.module.scss';

function ApiDocs() {
    const [apiKey, setApiKey] = React.useState('');

    useEffect(async () => {
        try {
            const url = '/api-key';
            const { data } = await Axios.get(url);
            return setApiKey(data.apiKey);
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    });

    return (
        <>
            <PageTitle title="API Docs" />

            <PageContainer>
                <PageHeader header="API Docs" />

                <ApiCard heading="API Details">
                    <div className={classes.row}>
                        <CardItem heading="HTTP Method" content="POST" />
                        <CardItem heading="Response Format" content="JSON" />
                    </div>

                    <CardItem
                        heading="API Url"
                        content={`https://api.${window.location.hostname.split('.').slice(-2).join('.')}/v1`}
                    />
                    <CardItem heading="API Key" content={apiKey} />
                </ApiCard>

                <ApiCard heading="Service List">
                    <div className={classes.row}>
                        <CardItem heading="KEY" content="Your API key" />
                        <CardItem heading="Action" content="services" />
                    </div>
                </ApiCard>

                <Code
                    content={
                        `[{
    service: 1,
    name: 'Followers',
    type: 'Default',
    category: 'First Category',
    rate: '0.90',
    min: '50',
    max: '10000',
    refill: true,
},
{
    service: 2,
    name: 'Comments',
    type: 'Custom Comments',
    category: 'Second Category',
    rate: '8',
    min: '10',
    max: '1500',
    refill: false,
}]
`
                    }
                />

                <ApiCard heading="Place Order">
                    <div className={classes.row}>
                        <CardItem heading="KEY" content="Your API key" />
                        <CardItem heading="Action" content="add" />
                        <CardItem heading="Service" content="Service Id" />
                    </div>
                    <div className={classes.row}>
                        <CardItem heading="Link" content="Link to page" />
                        <CardItem heading="Quantity" content="Needed quantity" />
                        <CardItem heading="" content="" />
                    </div>
                </ApiCard>

                <Code
                    content={
                        `{
    "status": "success",
    "order": 46
}`
                    }
                />

                <ApiCard heading="Order status">
                    <div className={classes.row}>
                        <CardItem heading="Key" content="Your API Key" />
                        <CardItem heading="Action" content="status" />
                        <CardItem heading="Order" content="Order Id" />
                    </div>
                </ApiCard>

                <Code
                    content={
                        `{
    "charge": "0.27819",
    "start_count": "3572",
    "status": "Partial",
    "remains": "157",
    "currency": "USD"
}`
                    }
                />

                <ApiCard heading="Multiple orders status">
                    <div className={classes.row}>
                        <CardItem heading="Key" content="Your API Key" />
                        <CardItem heading="Action" content="status" />
                        <CardItem heading="Order" content="Order Ids (Separated by comma)" />
                    </div>
                </ApiCard>

                <Code
                    content={
                        `{
    "1": {
        "charge": "0.27819",
        "start_count": "3572",
        "status": "Partial",
        "remains": "157",
        "currency": "USD"
    },
    "10": {
        "error": "Incorrect order ID"
    },
    "100": {
        "charge": "1.44219",
        "start_count": "234",
        "status": "In progress",
        "remains": "10",
        "currency": "USD"
    }
}`
                    }
                />

                <ApiCard heading="User balance">
                    <div className={classes.row}>
                        <CardItem heading="Key" content="Your API Key" />
                        <CardItem heading="Action" content="balance" />
                    </div>
                </ApiCard>

                <Code
                    content={
                        `{
    "balance": "100.84292",
    "currency": "USD"
}`
                    }
                />
            </PageContainer>
        </>
    );
}

function ApiCard({ heading, children }) {
    return (
        <>
            <div className={classes.api__details}>
                <h2 className={classes['api__details--heading']}>{heading}</h2>
            </div>
            <div className={classes['api__details--content']}>
                {children}
            </div>
        </>
    );
}

function CardItem({ heading, content }) {
    return (
        <div className={classes.item}>
            <p className={classes.item__heading}>{heading}</p>
            <p className={classes.item__content}>{content}</p>
        </div>
    );
}

function Code({ content }) {
    return (
        <div className={classes.code}>
            <pre>{content}</pre>
        </div>
    );
}

ApiCard.propTypes = {
    heading: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

CardItem.propTypes = {
    heading: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

Code.propTypes = {
    content: PropTypes.string.isRequired,
};

export default ApiDocs;
