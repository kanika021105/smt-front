// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import classes from './Services.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../../../../components/UI/Card/Card';

export default function Services() {
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const [services, setServices] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        let url = '/services';

        Axios.get(url)
            .then((res) => {
                let { data } = res;

                if (data.status === 'success') {
                    setServices(res.data.services);
                    setCategories(res.data.categories);
                    return;
                }

                setErrorMsg(
                    'Failed to load services... Please try again or contact support team!'
                );
                setShowError(true);
                return;
            })
            .catch((err) => console.log(err));
    }, []);

    const getServiceByCateId = (cateId) => {
        let servicesList =
            services &&
            services.filter((service) => service.categoryId === cateId);

        return servicesList.map((service) => (
            <tr key={service.id}>
                <td>{service.id}</td>
                <td>
                    {service.title.length > 35
                        ? service.title.slice(0, 35) + '...'
                        : service.title}
                </td>
                <td>
                    {service.min} / {service.max}
                </td>
                <td>{service.rate.toFixed(2)}</td>
                <td>{service.dripFeed}</td>
                <td>{service.status}</td>
            </tr>
        ));
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Services - SMT Panel</title>
            </Helmet>

            <div className="container">
                <div className={classes.Services}>
                    <div>
                        <h3 className={classes.pageTitle}>Services</h3>
                    </div>

                    {showError && (
                        <Card>
                            <div>
                                <small className={classes.errorMsg}>
                                    {errorMsg}
                                </small>
                            </div>
                        </Card>
                    )}

                    {categories &&
                        categories.map((category) => (
                            <div
                                className={classes.serviceListCard}
                                key={category.id}
                            >
                                <Card>
                                    <div>
                                        {showError && (
                                            <small className={classes.errorMsg}>
                                                {errorMsg}
                                            </small>
                                        )}
                                    </div>

                                    <h3 className={classes.categoryTitle}>
                                        {category.title}
                                    </h3>
                                    <div className={classes.customTable}>
                                        <Table
                                            hover
                                            striped
                                            bordered
                                            size="sm"
                                            responsive
                                        >
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Title</th>
                                                    <th>Min / Max</th>
                                                    <th>Price</th>
                                                    <th>Drip Feed</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getServiceByCateId(
                                                    category.id
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
