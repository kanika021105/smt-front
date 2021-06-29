import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Axios from '../../../../axiosIns';
import Loading from '../../../../components/UI/Loading/Loading';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';

import WebsiteDetail from '../../../Context/WebsiteDetailContext';

import classes from './dashboard.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [graphData, setGraphData] = useState();
    const { websiteName } = useContext(WebsiteDetail);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/dashboard';
        Axios.get(url)
            .then((res) => {
                console.log();

                setIsLoading(false);

                setGraphData(res.data.graphData);
                setData(res.data);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.msg);
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
            const { title } = lastServices.filter(
                (service) => +service.id === +id,
            );

            if (title) return title;
            return null;
        }
        return null;
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

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return (
                    <button
                        type="button"
                        className="btn btn-active btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'disable':
                return (
                    <button
                        type="button"
                        className="btn btn-inactive btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            default:
                break;
        }
    };

    // TODO
    return (
        <>
            <Helmet>
                <title>
                    Dashboard -
                    {' '}
                    {websiteName || 'SMT'}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            <div className="container">
                <div className={classes.dashboard}>
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
                        Dashboard
                    </h2>

                    <section className={classes.section__one}>
                        <div className={classes.section__one__container}>
                            <div className={classes.section__one__item}>
                                <DashboardCard>
                                    <span
                                        className={
                                            classes.section__one__dataTitle
                                        }
                                    >
                                        Total Amount
                                    </span>
                                    <span
                                        className={
                                            classes.section__one__dataValue
                                        }
                                    >
                                        {(totalAmount
                                            && totalAmount.toFixed(2))
                                            || '0'}
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__one__item}>
                                <DashboardCard>
                                    <span
                                        className={
                                            classes.section__one__dataTitle
                                        }
                                    >
                                        Total User
                                    </span>
                                    <span
                                        className={
                                            classes.section__one__dataValue
                                        }
                                    >
                                        {totalClients || '0'}
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__one__item}>
                                <DashboardCard>
                                    <span
                                        className={
                                            classes.section__one__dataTitle
                                        }
                                    >
                                        Total Order
                                    </span>
                                    <span
                                        className={
                                            classes.section__one__dataValue
                                        }
                                    >
                                        {totalOrders || '0'}
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__one__item}>
                                <DashboardCard>
                                    <span
                                        className={
                                            classes.section__one__dataTitle
                                        }
                                    >
                                        Total Ticket
                                    </span>
                                    <span
                                        className={
                                            classes.section__one__dataValue
                                        }
                                    >
                                        {totalTickets || '0'}
                                    </span>
                                </DashboardCard>
                            </div>
                        </div>
                    </section>

                    <section className={classes.section__two}>
                        <div className={classes.section__two__container}>
                            <div className={classes.section__two__graph}>
                                <DashboardCard>
                                    <div
                                        className={
                                            classes.section__two__graph_container
                                        }
                                    >
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
                                                        <stop offset="10%" stopColor="#ff750ced" stopOpacity={0.8} />
                                                        <stop offset="90%" stopColor="#ff632aed" stopOpacity={0} />
                                                    </linearGradient>

                                                    <linearGradient id="colorProcessing" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#5ef108ed" stopOpacity={0.8} />
                                                        <stop offset="90%" stopColor="#5dc508" stopOpacity={0} />
                                                    </linearGradient>

                                                    <linearGradient id="colorInprogress" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#0983f3ed" stopOpacity={0.8} />
                                                        <stop offset="90%" stopColor="#2172f3" stopOpacity={0} />
                                                    </linearGradient>

                                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#099e7aed" stopOpacity={0.8} />
                                                        <stop offset="90%" stopColor="#268b4a" stopOpacity={0} />
                                                    </linearGradient>

                                                    <linearGradient id="colorPartial" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#f86444ed" stopOpacity={0.8} />
                                                        <stop offset="90%" stopColor="#f34242" stopOpacity={0} />
                                                    </linearGradient>

                                                    <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#cf3558ed" stopOpacity={0.8} />
                                                        <stop offset="90%" stopColor="#cc1f1f" stopOpacity={0} />
                                                    </linearGradient>

                                                    <linearGradient id="colorRefunded" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#8F66f4ed" stopOpacity={0.8} />
                                                        <stop offset="90%" stopColor="#8F44FD" stopOpacity={0} />
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
                                                    style={{
                                                        strokeLinecap: 'round',
                                                    }}
                                                />

                                                <Area
                                                    type="monotone"
                                                    dataKey="processing"
                                                    stroke="url(#colorProcessing)"
                                                    strokeOpacity="0.8"
                                                    strokeWidth="2"
                                                    fill="url(#colorProcessing)"
                                                    fillOpacity="1"
                                                    style={{
                                                        strokeLinecap: 'round',
                                                    }}
                                                />

                                                <Area
                                                    type="monotone"
                                                    dataKey="inprogress"
                                                    stroke="url(#colorInprogress)"
                                                    strokeOpacity="0.8"
                                                    strokeWidth="2"
                                                    fill="url(#colorInprogress)"
                                                    fillOpacity="1"
                                                    style={{
                                                        strokeLinecap: 'round',
                                                    }}
                                                />

                                                <Area
                                                    type="monotone"
                                                    dataKey="completed"
                                                    stroke="url(#colorCompleted)"
                                                    strokeOpacity="0.8"
                                                    strokeWidth="2"
                                                    fill="url(#colorCompleted)"
                                                    fillOpacity="1"
                                                    style={{
                                                        strokeLinecap: 'round',
                                                    }}
                                                />

                                                <Area
                                                    type="monotone"
                                                    dataKey="partial"
                                                    stroke="url(#colorPartial)"
                                                    strokeOpacity="0.8"
                                                    strokeWidth="2"
                                                    fill="url(#colorPartial)"
                                                    fillOpacity="1"
                                                    style={{
                                                        strokeLinecap: 'round',
                                                    }}
                                                />

                                                <Area
                                                    type="monotone"
                                                    dataKey="cancelled"
                                                    stroke="url(#colorCancelled)"
                                                    strokeOpacity="0.8"
                                                    strokeWidth="2"
                                                    fill="url(#colorCancelled)"
                                                    fillOpacity="1"
                                                    style={{
                                                        strokeLinecap: 'round',
                                                    }}
                                                />

                                                <Area
                                                    type="monotone"
                                                    dataKey="refunded"
                                                    stroke="url(#colorRefunded)"
                                                    strokeOpacity="0.8"
                                                    strokeWidth="2"
                                                    fill="url(#colorRefunded)"
                                                    fillOpacity="1"
                                                    style={{
                                                        strokeLinecap: 'round',
                                                    }}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__two__summary}>
                                <DashboardCard>
                                    <div
                                        className={
                                            classes.section__two__summary_container
                                        }
                                    >
                                        <div
                                            className={
                                                classes.section__two__summaryTitle
                                            }
                                        >
                                            Summary
                                        </div>

                                        <div
                                            className={
                                                classes.section__two__summaryData
                                            }
                                        >
                                            <div
                                                className={
                                                    classes.section__two__summaryData_items
                                                }
                                            >
                                                <span
                                                    className={
                                                        classes.section__two_statusTitle
                                                    }
                                                >
                                                    Pending:-
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusTitle
                                                    }
                                                >
                                                    Processing:-
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusTitle
                                                    }
                                                >
                                                    InProgress:-
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusTitle
                                                    }
                                                >
                                                    Completed:-
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusTitle
                                                    }
                                                >
                                                    Partial:-
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusTitle
                                                    }
                                                >
                                                    Cancelled:-
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusTitle
                                                    }
                                                >
                                                    Refunded:-
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    classes.section__two__summaryData_item
                                                }
                                            >
                                                <span
                                                    className={
                                                        classes.section__two_statusData
                                                    }
                                                >
                                                    {data.pendingOrders || 0}
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusData
                                                    }
                                                >
                                                    {data.processingOrders || 0}
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusData
                                                    }
                                                >
                                                    {data.inprogressOrders || 0}
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusData
                                                    }
                                                >
                                                    {data.completedOrders || 0}
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusData
                                                    }
                                                >
                                                    {data.partialOrders || 0}
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusData
                                                    }
                                                >
                                                    {data.cancelledOrders || 0}
                                                </span>

                                                <span
                                                    className={
                                                        classes.section__two_statusData
                                                    }
                                                >
                                                    {data.refundedOrders || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </DashboardCard>
                            </div>
                        </div>
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
                                            {lastServices
                                                && lastServices.map((service) => (
                                                    <tr key={service.id}>
                                                        <td>{service.id}</td>
                                                        <td>
                                                            {service.title
                                                                .length > 30
                                                                ? `${service.title.substr(
                                                                    0,
                                                                    31,
                                                                )}...`
                                                                : service.title}
                                                        </td>
                                                        <td>
                                                            {checkStatus(
                                                                service.status,
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
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
                                                <th>ID</th>
                                                <th>Email</th>
                                                <th>Status</th>
                                            </tr>
                                        </THead>

                                        <TBody>
                                            {lastClients
                                                && lastClients.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>
                                                            {user.email.length
                                                            > 30
                                                                ? `${user.email.substr(
                                                                    0,
                                                                    31,
                                                                )}...`
                                                                : user.email}
                                                        </td>

                                                        <td>
                                                            {checkStatus(
                                                                user.status,
                                                            )}
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
                                    {lastOrders
                                        && lastOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>
                                                    {getServiceTitle(
                                                        order.serviceId,
                                                    )
                                                    && getServiceTitle(
                                                        order.serviceId,
                                                    ).length > 35
                                                        ? `${getServiceTitle(
                                                            order.serviceId,
                                                        ).slice(0, 35)}...`
                                                        : getServiceTitle(
                                                            order.serviceId,
                                                        )}
                                                </td>
                                                <td>
                                                    {order.link.length > 35
                                                        ? `${order.link.slice(
                                                            0,
                                                            35,
                                                        )}...`
                                                        : order.link}
                                                </td>
                                                <td>{order.quantity}</td>
                                                <td>{order.charge}</td>
                                                <td>
                                                    {getStatus(order.status)}
                                                </td>
                                            </tr>
                                        ))}
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
                                                        ? `${service.title.substr(
                                                            0,
                                                            31,
                                                        )}...`
                                                        : service.title}
                                                </td>

                                                <td>
                                                    {checkStatus(
                                                        service.status,
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </TBody>
                            </Table>
                        </DashboardCard>

                        {/* <div className="col-md-3">
                                <div className="m-1">
                                    <DashboardCard>
                                        <div className={classes.sectionTitle}>
                                            Tickets
                                        </div>
                                    </DashboardCard>
                                    <div style={{ padding: '5px' }}></div>
                                    <DashboardCard>
                                        <div className={classes.sectionTitle}>
                                            Users
                                        </div>
                                    </DashboardCard>
                                </div>
                            </div> */}
                    </section>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
