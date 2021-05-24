// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Backdrop from '../../../../components/UI/Backdrop/Backdrop';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/user/orders.scss';
import Card from '../../../../components/UI/Card/Card';

const Orders = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const [orders, setOrders] = useState();
    const [services, setServices] = useState();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        let url = '/orders';
        Axios.get(url).then((res) => {
            let { data } = res;

            if (data.status !== 'success') {
                setShowError(true);
                setErrorMsg(
                    'Failed to load order history please try again... If error continue contact support team...'
                );
                return;
            }
            setIsLoading(false);

            setOrders(data.orders.reverse());
            setServices(data.services);
            return;
        });
    }, []);

    let getServiceTitle = (id) => {
        if (!services) return;
        const service = services.filter((service) => service.id === id);
        console.log(service);
        if (service[0]) return service[0].title;
    };

    const getStatus = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <button className={'btn btn-pending btn-disabled'} disabled>
                        {status}
                    </button>
                );
            case 'processing':
                return (
                    <button
                        className={'btn btn-processing btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'inprogress':
                return (
                    <button
                        className={'btn btn-inprogress btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'completed':
                return (
                    <button
                        className={'btn btn-completed btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'cancelled':
                return (
                    <button
                        className={'btn btn-cancelled btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'partial':
                return (
                    <button className={'btn btn-partial btn-disabled'} disabled>
                        {status}
                    </button>
                );

            default:
                break;
        }
    };

    const loading__1 = () => {
        if (!isLoading) return;

        return (
            <Backdrop show={isLoading}>
                <div className="loading">
                    <div className="loading__1">
                        <div></div>
                    </div>
                </div>
            </Backdrop>
        );
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Orders - SMT Panel</title>
            </Helmet>

            {loading__1()}

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
                    </IconContext.Provider>{' '}
                    Orders
                </h2>

                <Card>
                    <div>
                        {showError && (
                            <small className="errorMsg">{errorMsg}</small>
                        )}
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service</th>
                                <th>Link</th>
                                <th>Charge</th>
                                <th>QTY</th>
                                <th>Start Counter</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders &&
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>
                                            {getServiceTitle(order.serviceId) &&
                                            getServiceTitle(order.serviceId)
                                                .length > 30
                                                ? order.serviceId +
                                                  '- ' +
                                                  getServiceTitle(
                                                      order.serviceId
                                                  ).slice(0, 30) +
                                                  '...'
                                                : order.serviceId +
                                                  '- ' +
                                                  getServiceTitle(
                                                      order.serviceId
                                                  )}
                                        </td>
                                        <td>
                                            {order.link.length > 20
                                                ? order.link.slice(0, 25) +
                                                  '...'
                                                : order.link}
                                        </td>
                                        <td>{order.charge}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.startCounter || 0}</td>
                                        <td>{getStatus(order.status)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </>
    );
};

export default Orders;
