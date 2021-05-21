// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/user/services.scss';
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
                <td>
                    {
                        <button
                            className="btn btn-active btn-disabled"
                            disabled
                        >
                            {service.status}
                        </button>
                    }
                </td>
            </tr>
        ));
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Services - SMT Panel</title>
            </Helmet>

            <div className="container Services">
                <h2 className="pageTitle">
                    <IconContext.Provider
                        value={{
                            style: {
                                fontSize: '30px',
                            },
                        }}
                    >
                        <VscListSelection />
                    </IconContext.Provider>{' '}
                    Services
                </h2>

                {showError && (
                    <Card>
                        <div>
                            <small className="errorMsg">{errorMsg}</small>
                        </div>
                    </Card>
                )}

                {categories &&
                    categories.map((category) => (
                        <div className="serviceListCard" key={category.id}>
                            <Card>
                                <div>
                                    {showError && (
                                        <small className="errorMsg">
                                            {errorMsg}
                                        </small>
                                    )}
                                </div>

                                <h3 className="categoryTitle ">
                                    {category.title}
                                </h3>

                                <table className="table">
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
                                        {getServiceByCateId(category.id)}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    ))}
            </div>
        </>
    );
}
