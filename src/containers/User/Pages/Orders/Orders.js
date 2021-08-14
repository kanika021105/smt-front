import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Toast from '../../../../components/UI/Toast/Toast';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Button from '../../../../components/UI/Button/Button';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Context from '../../../../store/context';
import Theme from '../../../../store/theme';

import '../../../../sass/pages/user/orders.scss';

const Orders = () => {
    const [orders, setOrders] = useState();
    const [services, setServices] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { websiteName } = useContext(Context);
    const { darkTheme } = useContext(Theme);

    useEffect(() => {
        setIsLoading(true);
        const url = '/orders';
        Axios.get(url).then((res) => {
            setIsLoading(false);
            const { data } = res;
            setOrders(data.orders.reverse());
            setServices(data.services);
        }).catch((err) => {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        });
    }, []);

    const getServiceTitle = (id) => {
        if (services) {
            const details = services.filter((service) => service.id === id);
            if (details[0]) return details[0].title;
            return '';
        }
        return '';
    };

    const getStatus = (status) => {
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
    };

    return (
        <>
            <Helmet>
                <title>
                    Orders -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            <div className={darkTheme ? 'dark container Orders' : 'container Orders'}>
                <h2 className="pageTitle">
                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                        <VscListSelection />
                    </IconContext.Provider>
                    {' '}
                    Orders
                </h2>

                <Card>
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
                </Card>
            </div>
        </>
    );
};

export default Orders;
