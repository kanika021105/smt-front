// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import classes from './Orders.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../../../../components/UI/Card/Card';

const Orders = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const [orders, setOrders] = useState();
    const [services, setServices] = useState();

    useEffect(() => {
        let url = '/orders';
        Axios.get(url).then((res) => {
            let { data } = res;

            if (data.status === 'success') {
                setOrders(data.orders.reverse());
                setServices(data.services);
                return;
            }

            setShowError(true);
            setErrorMsg(
                'Failed to load order history please try again... If error continue contact support team...'
            );
            return;
        });
    }, []);

    let getServiceTitle = (id) => {
        if (!services) return;
        const service = services.filter((service) => service.id === id);
        console.log(service);
        if (service[0]) return service[0].title;
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Orders - SMT Panel</title>
            </Helmet>

            <div className="container">
                <div className={classes.Orders}>
                    <h3 className={classes.pageTitle}>Orders</h3>
                    <Card>
                        <div>
                            {showError && (
                                <small className={classes.errorMsg}>
                                    {errorMsg}
                                </small>
                            )}
                        </div>

                        <Table striped bordered hover responsive size="sm">
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
                                                {getServiceTitle(
                                                    order.serviceId
                                                ) &&
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
                                            <td>{order.status}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Orders;
