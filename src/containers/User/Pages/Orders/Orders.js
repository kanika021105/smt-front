import React, { useEffect, useState } from 'react';

import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import Axios from '../../../../axiosIns';
import './orders.scss';

function Orders() {
    const [orders, setOrders] = useState();
    const [services, setServices] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);

        try {
            const url = '/orders';
            const { data } = await Axios.get(url);
            setIsLoading(false);
            setOrders(data.orders.reverse());
            setServices(data.services);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    function getServiceTitle(id) {
        if (services) {
            const details = services.find((service) => service.id === id);
            if (details) return details.title;
            return '';
        }
        return '';
    }

    function getStatus(status) {
        switch (status) {
            case 'pending':
                return <Button.OrderPending />;

            case 'processing':
                return <Button.OrderProcessing />;

            case 'inprogress':
                return <Button.OrderInprogress />;

            case 'completed':
                return <Button.OrderCompleted />;

            case 'canceled':
                return <Button.OrderCancelled />;

            case 'partial':
                return <Button.OrderPartial />;

            case 'refunded':
                return <Button.OrderRefunded />;

            default:
                return Toast.failed('Something went wrong!');
        }
    }

    return (
        <>
            <PageTitle title="Orders" />
            <Loading show={isLoading} />

            <PageContainer>
                <PageHeader header="Orders" />
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
                        {orders && orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>
                                    {getServiceTitle(order.serviceId)
                                            && getServiceTitle(order.serviceId).length > 30
                                        ? `${order.serviceId} - ${getServiceTitle(order.serviceId).slice(0, 30)}...`
                                        : `${order.serviceId} - ${getServiceTitle(order.serviceId)}`}
                                </td>
                                <td>
                                    {order.link.length > 20
                                        ? `${order.link.slice(0, 25)}...`
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
            </PageContainer>
        </>
    );
}

export default Orders;
