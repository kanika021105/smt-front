import React, { useEffect, useState } from 'react';
import {
    AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

import Axios from '../../../../axiosIns';
// import Theme from '../../../../store/theme';

import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';

import classes from './dashboard.module.scss';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [graphData, setGraphData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // const { darkTheme } = useContext(Theme);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/dashboard';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                setGraphData(res.data.graphData);
                setData(res.data);
            })
            .catch((err) => {
                setIsLoading(false);
                Toast.failed(err.response.data.message || 'Something went wrong!');
            });
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
            const { title } = lastServices.filter((service) => +service.id === +id);

            if (title) return title;
            return null;
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
                {/* <div className={darkTheme ? 'dark container' : 'container'}> */}
                <div className={classes.dashboard}>
                    <PageHeader header="Dashboard" />

                    <section className={classes.section__one}>
                        <div className={classes.section__one__container}>
                            <div className={classes.section__one__item}>
                                <DashboardCard>
                                    <span className={classes.section__one__dataTitle}>
                                        Total Amount
                                    </span>
                                    <span className={classes.section__one__dataValue}>
                                        {(totalAmount && totalAmount.toFixed(2)) || '0'}
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__one__item}>
                                <DashboardCard>
                                    <span className={classes.section__one__dataTitle}>
                                        Total User
                                    </span>
                                    <span className={classes.section__one__dataValue}>
                                        {totalClients || '0'}
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__one__item}>
                                <DashboardCard>
                                    <span className={classes.section__one__dataTitle}>
                                        Total Order
                                    </span>
                                    <span className={classes.section__one__dataValue}>
                                        {totalOrders || '0'}
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__one__item}>
                                <DashboardCard>
                                    <span className={classes.section__one__dataTitle}>
                                        Total Ticket
                                    </span>
                                    <span className={classes.section__one__dataValue}>
                                        {totalTickets || '0'}
                                    </span>
                                </DashboardCard>
                            </div>
                        </div>
                    </section>

                    <section className={classes.section__two}>
                        {/* <div className={classes.section__two__container}> */}
                        <div className={classes.section__two__graph}>
                            <DashboardCard>
                                <div className={classes.section__two__graph_container}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={graphData}
                                            margin={{
                                                top: 0,
                                                right: 0,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="8%" stopColor="#ff750ced" stopOpacity={0.8} />
                                                    <stop offset="92%" stopColor="#ff632aed" stopOpacity={0} />
                                                </linearGradient>

                                                <linearGradient id="colorProcessing" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="8%" stopColor="#5ef108ed" stopOpacity={0.8} />
                                                    <stop offset="92%" stopColor="#5dc508" stopOpacity={0} />
                                                </linearGradient>

                                                <linearGradient id="colorInprogress" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="8%" stopColor="#0983f3ed" stopOpacity={0.8} />
                                                    <stop offset="92%" stopColor="#2172f3" stopOpacity={0} />
                                                </linearGradient>

                                                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="8%" stopColor="#099e7aed" stopOpacity={0.8} />
                                                    <stop offset="92%" stopColor="#268b4a" stopOpacity={0} />
                                                </linearGradient>

                                                <linearGradient id="colorPartial" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="8%" stopColor="#f86444ed" stopOpacity={0.8} />
                                                    <stop offset="92%" stopColor="#f34242" stopOpacity={0} />
                                                </linearGradient>

                                                <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="8%" stopColor="#ee2a2a" stopOpacity={0.8} />
                                                    <stop offset="92%" stopColor="#dd2a2a" stopOpacity={0} />
                                                </linearGradient>

                                                <linearGradient id="colorRefunded" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="8%" stopColor="#8F66f4ed" stopOpacity={0.8} />
                                                    <stop offset="92%" stopColor="#8F44FD" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <XAxis dataKey="name" />
                                            <Tooltip cursor={{
                                                stroke: '#0f89ff',
                                                strokeWidth: 8,
                                                strokeOpacity: '0.2',
                                            }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="pending"
                                                stroke="url(#colorPending)"
                                                strokeOpacity="0.8"
                                                strokeWidth="2"
                                                fill="url(#colorPending)"
                                                fillOpacity="1"
                                                style={{ strokeLinecap: 'round' }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="processing"
                                                stroke="url(#colorProcessing)"
                                                strokeOpacity="0.8"
                                                strokeWidth="2"
                                                fill="url(#colorProcessing)"
                                                fillOpacity="1"
                                                style={{ strokeLinecap: 'round' }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="inprogress"
                                                stroke="url(#colorInprogress)"
                                                strokeOpacity="0.8"
                                                strokeWidth="2"
                                                fill="url(#colorInprogress)"
                                                fillOpacity="1"
                                                style={{ strokeLinecap: 'round' }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="completed"
                                                stroke="url(#colorCompleted)"
                                                strokeOpacity="0.8"
                                                strokeWidth="2"
                                                fill="url(#colorCompleted)"
                                                fillOpacity="1"
                                                style={{ strokeLinecap: 'round' }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="partial"
                                                stroke="url(#colorPartial)"
                                                strokeOpacity="0.8"
                                                strokeWidth="2"
                                                fill="url(#colorPartial)"
                                                fillOpacity="1"
                                                style={{ strokeLinecap: 'round' }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="cancelled"
                                                stroke="url(#colorCancelled)"
                                                strokeOpacity="0.8"
                                                strokeWidth="2"
                                                fill="url(#colorCancelled)"
                                                fillOpacity="1"
                                                style={{ strokeLinecap: 'round' }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="refunded"
                                                stroke="url(#colorRefunded)"
                                                strokeOpacity="0.8"
                                                strokeWidth="2"
                                                fill="url(#colorRefunded)"
                                                fillOpacity="1"
                                                style={{ strokeLinecap: 'round' }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </DashboardCard>
                        </div>

                        {/* <div className={classes.section__two__summary}>
                                <DashboardCard>
                                    <div className={classes.section__two__summary_container}>
                                        <div className={classes.section__two__summaryTitle}>
                                            Summary
                                        </div>

                                        <div className={classes.section__two__summaryData}>
                                            <div
                                            className={classes['section__two__summaryData--items']}>
                                                <span className={classes.section__two_statusTitle}>
                                                    Pending:-
                                                </span>

                                                <span className={classes.section__two_statusTitle}>
                                                    Processing:-
                                                </span>

                                                <span className={classes.section__two_statusTitle}>
                                                    InProgress:-
                                                </span>

                                                <span className={classes.section__two_statusTitle}>
                                                    Completed:-
                                                </span>

                                                <span className={classes.section__two_statusTitle}>
                                                    Partial:-
                                                </span>

                                                <span className={classes.section__two_statusTitle}>
                                                    Cancelled:-
                                                </span>

                                                <span className={classes.section__two_statusTitle}>
                                                    Refunded:-
                                                </span>
                                            </div>

                                            <div className={classes.section__two__summaryData_item}>
                                                <span className={classes.section__two_statusData}>
                                                    {data.pendingOrdersCount || 0}
                                                </span>

                                                <span className={classes.section__two_statusData}>
                                                    {data.processingOrdersCount || 0}
                                                </span>

                                                <span className={classes.section__two_statusData}>
                                                    {data.inprogressOrdersCount || 0}
                                                </span>

                                                <span className={classes.section__two_statusData}>
                                                    {data.completedOrdersCount || 0}
                                                </span>

                                                <span className={classes.section__two_statusData}>
                                                    {data.partialOrdersCount || 0}
                                                </span>

                                                <span className={classes.section__two_statusData}>
                                                    {data.cancelledOrdersCount || 0}
                                                </span>

                                                <span className={classes.section__two_statusData}>
                                                    {data.refundedOrdersCount || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </DashboardCard>
                            </div> */}
                        {/* </div> */}
                    </section>

                    <section className={classes.section__three}>
                        <div className={classes.section__three__container}>
                            <div className={classes.section__three__item}>
                                <DashboardCard>
                                    <div className="tableTitle">
                                        Top 10 best selling services
                                    </div>

                                    <Table>
                                        <THead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>status</th>
                                            </tr>
                                        </THead>

                                        <TBody>
                                            {
                                                lastServices && lastServices.map((service) => (
                                                    <tr key={service.id}>
                                                        <td>{service.id}</td>
                                                        <td>
                                                            {
                                                                service.title.length > 30
                                                                    ? `${service.title.substr(0, 31)}...`
                                                                    : service.title
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button.Active />
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </TBody>
                                    </Table>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__three__item}>
                                <DashboardCard>
                                    <div className="tableTitle">
                                        Last 10 Account created
                                    </div>

                                    <Table>
                                        <THead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Status</th>
                                            </tr>
                                        </THead>

                                        <TBody>
                                            {lastClients
                                                && lastClients.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{`${user.firstName} ${user.lastName}`}</td>
                                                        <td>
                                                            {user.email.length > 30
                                                                ? `${user.email.substr(0, 31)}...`
                                                                : user.email}
                                                        </td>

                                                        <td>
                                                            {checkStatus(user.status)}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </TBody>
                                    </Table>
                                </DashboardCard>
                            </div>
                        </div>
                    </section>

                    <section className={classes.section__four}>
                        <DashboardCard>
                            <div className="tableTitle">Last 10 orders</div>

                            <Table>
                                <THead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Service</th>
                                        <th>Link</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </THead>

                                <TBody>
                                    {
                                        lastOrders && lastOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>
                                                    {
                                                        getServiceTitle(order.serviceId)
                                                    && getServiceTitle(order.serviceId).length > 35
                                                            ? `${getServiceTitle(order.serviceId).slice(0, 35)}...`
                                                            : getServiceTitle(order.serviceId)
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        order.link.length > 35
                                                            ? `${order.link.slice(0, 35)}...`
                                                            : order.link
                                                    }
                                                </td>
                                                <td>{order.quantity}</td>
                                                <td>{order.charge}</td>
                                                <td>
                                                    {getStatus(order.status)}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </TBody>
                            </Table>
                        </DashboardCard>
                    </section>

                    <section className={classes.section__five}>
                        <DashboardCard>
                            <div className="tableTitle">
                                Top 10 best selling services
                            </div>

                            <Table>
                                <THead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                    </tr>
                                </THead>

                                <TBody>
                                    {lastServices
                                        && lastServices.map((service) => (
                                            <tr key={service.id}>
                                                <td>{service.id}</td>
                                                <td>
                                                    {service.title.length >= 30
                                                        ? `${service.title.substr(0, 31)}...`
                                                        : service.title}
                                                </td>
                                                <td>
                                                    <Button.Active />
                                                </td>
                                            </tr>
                                        ))}
                                </TBody>
                            </Table>
                        </DashboardCard>
                    </section>
                </div>
                {/* </div> */}
            </PageContainer>
        </>
    );
};

export default Dashboard;
