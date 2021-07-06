import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
    ResponsiveContainer,
    XAxis,
    AreaChart,
    Area,
    Tooltip,
} from 'recharts';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Toast from '../../../../components/UI/Toast/Toast';
import Loading from '../../../../components/UI/Loading/Loading';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';
import Button from '../../../../components/UI/Button/Button';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import classes from './Dashboard.module.scss';
import Context from '../../../../store/context';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [graphData, setGraphData] = useState('');

    const { websiteName } = useContext(Context);

    useEffect(() => {
        setIsLoading(true);

        const url = '/dashboard';
        Axios.get(url)
            .then((res) => {
                setData(res.data);
                setGraphData(res.data.graphData);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                Toast.failed(err.response.data.message || 'Something went wrong!');
            });
    }, []);

    const {
        totalOrders,
        services,
        totalTickets,
        balance,
        spent,
    } = data;

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return <Button.Active />;

            case 'disable':
                return <Button.Disable />;

            default:
                break;
        }
    };

    return (
        <>
            <Helmet>
                <title>
                    Dashboard -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            <div className="container">
                <div className={classes.dashboard}>
                    <h2 className="pageTitle">
                        <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                            <VscListSelection />
                        </IconContext.Provider>
                        {' '}
                        Dashboard
                    </h2>

                    <section className={classes.section__one}>
                        <div className={classes.section__one__item}>
                            <DashboardCard>
                                <span className={classes['section__one__item--title']}>
                                    Available Fund
                                </span>
                                <span className={classes['section__one__item--value']}>
                                    {(balance && balance.toFixed(2)) || '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className={classes.section__one__item}>
                            <DashboardCard>
                                <span className={classes['section__one__item--title']}>
                                    Total Spent
                                </span>
                                <span className={classes['section__one__item--value']}>
                                    {(spent && spent.toFixed(2)) || '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className={classes.section__one__item}>
                            <DashboardCard>
                                <span className={classes['section__one__item--title']}>
                                    Total Order
                                </span>
                                <span className={classes['section__one__item--value']}>
                                    {totalOrders || '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className={classes.section__one__item}>
                            <DashboardCard>
                                <span className={classes['section__one__item--title']}>
                                    Total Ticket
                                </span>
                                <span className={classes['section__one__item--value']}>
                                    {totalTickets || '0'}
                                </span>
                            </DashboardCard>
                        </div>
                    </section>

                    <section className={classes.section__two}>
                        <div className={classes.section__two__graph}>
                            <DashboardCard>
                                <div className={classes.section__two__graph_container}>
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
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
                                                    <stop offset="8%" stopColor="#cf3558ed" stopOpacity={0.4} />
                                                    <stop offset="92%" stopColor="#cc1f1f" stopOpacity={0} />
                                                </linearGradient>

                                                <linearGradient id="colorRefunded" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="8%" stopColor="#8F66f4ed" stopOpacity={0.4} />
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

                        <div className={classes.section__two__summary}>
                            <DashboardCard>
                                <div className={classes['section__two__summary--heading']}>
                                    Orders
                                </div>

                                <div className={classes['section__two__summary--item']}>
                                    <span className={classes['section__two__summary--item--value']}>
                                        Pending:-
                                    </span>

                                    <span className={classes['section__two__summary--item--value']}>
                                        {data.pendingOrder || 0}
                                    </span>
                                </div>

                                <div className={classes['section__two__summary--item']}>
                                    <span className={classes['section__two__summary--item--value']}>
                                        Processing:-
                                    </span>
                                    <span className={classes['section__two__summary--item--value']}>
                                        {data.processingOrder || 0}
                                    </span>
                                </div>

                                <div className={classes['section__two__summary--item']}>
                                    <span className={classes['section__two__summary--item--value']}>
                                        InProgress:-
                                    </span>
                                    <span className={classes['section__two__summary--item--value']}>
                                        {data.inprogressOrder || 0}
                                    </span>
                                </div>

                                <div className={classes['section__two__summary--item']}>
                                    <span className={classes['section__two__summary--item--value']}>
                                        Completed:-
                                    </span>
                                    <span className={classes['section__two__summary--item--value']}>
                                        {data.completedOrder || 0}
                                    </span>
                                </div>

                                <div className={classes['section__two__summary--item']}>
                                    <span className={classes['section__two__summary--item--value']}>
                                        Cancelled:-
                                    </span>
                                    <span className={classes['section__two__summary--item--value']}>
                                        {data.cancelledOrder || 0}
                                    </span>
                                </div>

                                <div className={classes['section__two__summary--item']}>
                                    <span className={classes['section__two__summary--item--value']}>
                                        Partial:-
                                    </span>
                                    <span className={classes['section__two__summary--item--value']}>
                                        {data.partialOrder || 0}
                                    </span>
                                </div>

                                <div className={classes['section__two__summary--item']}>
                                    <span className={classes['section__two__summary--item--value']}>
                                        Refunded:-
                                    </span>
                                    <span className={classes['section__two__summary--item--value']}>
                                        {data.refundedOrder || 0}
                                    </span>
                                </div>
                            </DashboardCard>
                        </div>
                    </section>

                    <section className={classes.section__third}>
                        <DashboardCard>
                            <div className="tableTitle">
                                Top 10 best selling services
                            </div>

                            <Table className="table">
                                <THead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>status</th>
                                    </tr>
                                </THead>

                                <TBody>
                                    {services && services.map((service) => (
                                        <tr key={service.id}>
                                            <td>{service.id}</td>
                                            <td>
                                                {service.title.length > 30
                                                    ? `${service.title.substr(0, 31)}...`
                                                    : service.title}
                                            </td>
                                            <td>
                                                {checkStatus(service.status)}
                                                {/* {service.status === 'active'
                                                && }
                                                {service.status
                                                        === 'deactive' && (
                                                    <button
                                                            type="button"
                                                            className="btn
                                                            btn-inactive btn-disabled"
                                                            disabled
                                                        >
                                                            {service.status[0].toUpperCase()
                                                                + service.status
                                                                    .substring(
                                                                        1,
                                                                    )
                                                                    .toLowerCase()}
                                                        </button>
                                                )} */}
                                            </td>
                                        </tr>
                                    ))}
                                </TBody>
                            </Table>
                        </DashboardCard>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
