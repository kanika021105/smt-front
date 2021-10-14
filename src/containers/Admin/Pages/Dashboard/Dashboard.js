import React, { useEffect, useState } from 'react';
import Axios from '../../../../axiosIns';

import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import StackedArea from '../../../../components/UI/Charts/Area/Area';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';

import classes from './dashboard.module.scss';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [graphData, setGraphData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);

        try {
            const url = '/admin/dashboard';
            const { data: resData } = await Axios.get(url);
            setIsLoading(false);
            setGraphData(resData.graphData);
            setData(resData);
        } catch (err) {
            setIsLoading(false);
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    const {
        lastClients,
        totalClients,
        lastOrders,
        totalOrders,
        lastServices,
        totalTickets,
        totalAmount,
    } = data;

    const getServiceTitle = (id) => {
        if (lastServices) {
            const { title } = lastServices.find((service) => +service.id === +id);
            return (title || null);
        }
        return null;
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

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return <Button.Active />;

            case 'disable':
                return <Button.Disable />;

            default:
                return Toast.failed('Something went wrong!');
        }
    };

    return (
        <>
            <PageTitle title="Dashboard" />
            <Loading show={isLoading} />

            <PageContainer>
                <PageHeader header="Dashboard" />

                <section className={classes.section__one}>
                    <div className={classes.section__one__container}>
                        <DashboardCard title="Total Amount" value={(totalAmount && totalAmount.toFixed(2)) || '0'} />
                        <DashboardCard title="Total User" value={totalClients || '0'} />
                        <DashboardCard title="Total Order" value={totalOrders || '0'} />
                        <DashboardCard title="Total Ticket" value={totalTickets || '0'} />
                    </div>
                </section>

                <section className={classes.section__two}>
                    <div className={classes.section__two__graph}>
                        <div className={classes.section__two__graph_container}>
                            <StackedArea graphData={graphData} />
                        </div>
                    </div>
                </section>

                <section className={classes.section__three}>
                    <div className={classes.section__three__container}>
                        <div className={classes.section__three__item}>
                            <div className="tableTitle">
                                Top 10 best selling services
                            </div>

                            <Table>
                                <THead>
                                    <tr>
                                        <th className="id">ID</th>
                                        <th>Title</th>
                                        <th className="status">status</th>
                                    </tr>
                                </THead>

                                <TBody>
                                    {
                                        lastServices && lastServices.map((service) => (
                                            <tr key={service.id}>
                                                <td className="id">{service.id}</td>
                                                <td>{ service.title.length > 30 ? `${service.title.substr(0, 31)}...` : service.title }</td>
                                                <td className="status"><Button.Active /></td>
                                            </tr>
                                        ))
                                    }
                                </TBody>
                            </Table>
                        </div>

                        <div className={classes.section__three__item}>
                            <div className="tableTitle">
                                Last 10 Account created
                            </div>

                            <Table>
                                <THead>
                                    <tr>
                                        <th className="name">Name</th>
                                        <th>Email</th>
                                        <th className="status">Status</th>
                                    </tr>
                                </THead>

                                <TBody>
                                    {
                                        lastClients && lastClients.map((user) => (
                                            <tr key={user.id}>
                                                <td className="name">{`${user.firstName} ${user.lastName}`}</td>
                                                <td>{user.email.length > 30 ? `${user.email.substr(0, 31)}...` : user.email}</td>
                                                <td className="status">{checkStatus(user.status)}</td>
                                            </tr>
                                        ))
                                    }
                                </TBody>
                            </Table>
                        </div>
                    </div>
                </section>

                <section className={classes.section__four}>
                    <div className="tableTitle">Last 10 orders</div>
                    <Table>
                        <THead>
                            <tr>
                                <th className="id">ID</th>
                                <th>Service</th>
                                <th>Link</th>
                                <th className="quantity">Qty</th>
                                <th className="price">Price</th>
                                <th className="status">Status</th>
                            </tr>
                        </THead>

                        <TBody>
                            {
                                lastOrders && lastOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="id">{order.id}</td>
                                        <td>
                                            {
                                                getServiceTitle(order.serviceId)
                                                    && getServiceTitle(order.serviceId).length > 35
                                                    ? `${getServiceTitle(order.serviceId).slice(0, 35)}...`
                                                    : getServiceTitle(order.serviceId)
                                            }
                                        </td>
                                        <td>{order.link.length > 35 ? `${order.link.slice(0, 35)}...` : order.link}</td>
                                        <td className="quantity">{order.quantity}</td>
                                        <td className="price">{order.charge}</td>
                                        <td className="status">{getStatus(order.status)}</td>
                                    </tr>
                                ))
                            }
                        </TBody>
                    </Table>
                </section>
            </PageContainer>
        </>
    );
};

export default Dashboard;
