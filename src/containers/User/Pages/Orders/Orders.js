/* eslint-disable indent */
// jshint esversion:9

import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';

import WebsiteDetail from '../../../Context/WebsiteDetailContext';

import '../../../../sass/pages/user/orders.scss';

const Orders = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const [orders, setOrders] = useState();
    const [services, setServices] = useState();

    const { websiteName } = useContext(WebsiteDetail);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/orders';
        Axios.get(url).then((res) => {
            const { data } = res;

            if (data.status !== 'success') {
                setShowError(true);
                setErrorMsg(
                    'Failed to load order history please try again... If error continue contact support team...',
                );
                return;
            }
            setIsLoading(false);

            setOrders(data.orders.reverse());
            setServices(data.services);
        });
    }, []);

    const getServiceTitle = (id) => {
        if (!services) return;
        const filService = services.filter((service) => +service.id === +id);
        const { title } = filService[0];
        if (title) return title;
    };

    const getStatus = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <button
                        type="button"
                        className="btn btn-pending btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );
            case 'processing':
                return (
                    <button
                        type="button"
                        className="btn btn-processing btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'inprogress':
                return (
                    <button
                        type="button"
                        className="btn btn-inprogress btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'completed':
                return (
                    <button
                        type="button"
                        className="btn btn-completed btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'cancelled':
                return (
                    <button
                        type="button"
                        className="btn btn-cancelled btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'partial':
                return (
                    <button
                        type="button"
                        className="btn btn-partial btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            default:
                break;
        }
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>
                    Orders -
                    {' '}
                    {websiteName || 'SMT '}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            <div className="container Orders">
                <h2 className="pageTitle">
                    <IconContext.Provider
                        value={{
                            style: {
                                fontSize: '30px',
                            },
                        }}
                    >
                        <VscListSelection />
                    </IconContext.Provider>
                    {' '}
                    Orders
                </h2>

                <Card>
                    <div>
                        {showError && (
                            <small className="errorMsg">{errorMsg}</small>
                        )}
                    </div>

                    <Table>
                        <THead>
                            <tr>
                                <th>ID</th>
                                <th>Service</th>
                                <th>Link</th>
                                <th>Charge</th>
                                <th>QTY</th>
                                <th>Start Counter</th>
                                <th>Status</th>
                            </tr>
                        </THead>

                        <TBody>
                            {orders
                                && orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>
                                            {getServiceTitle(order.serviceId)
                                            && getServiceTitle(order.serviceId)
                                                .length > 30
                                                ? `${
                                                      order.serviceId
                                                      - getServiceTitle(
                                                          order.serviceId,
                                                      ).slice(0, 30)
                                                  }...`
                                                : `${
                                                      order.serviceId
                                                  } - ${getServiceTitle(
                                                      order.serviceId,
                                                  )}`}
                                            {' '}
                                        </td>
                                        <td>
                                            {order.link.length > 20
                                                ? `${order.link.slice(
                                                      0,
                                                      25,
                                                  )}...`
                                                : order.link}
                                        </td>
                                        <td>{order.charge}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.startCounter || 0}</td>
                                        <td>{getStatus(order.status)}</td>
                                    </tr>
                                ))}
                        </TBody>
                    </Table>
                </Card>
            </div>
        </>
    );
};

export default Orders;
