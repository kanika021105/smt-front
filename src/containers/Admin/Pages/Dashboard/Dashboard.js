// jshint esversion:9

import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import Axios from '../../../../axiosIns';
import Loading from '../../../../components/UI/Loading/Loading';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';

import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import './dashboard.scss';
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
                setIsLoading(false);

                setGraphData(res.data.graphData);
                return setData(res.data);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.msg);
            });
    }, []);

    const {
        lastUsers,
        totalUsers,
        lastOrders,
        totalOrders,
        lastServices,
        totalTickets,
        totalAmount,
    } = data;

    const getServiceTitle = (id) => {
        if (lastServices) {
            const service = lastServices.filter(
                (service) => +service.id === +id
            );

            if (!service[0]) return null;
            return service[0].title;
        }
        return null;
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

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return (
                    <button className="btn btn-active btn-disabled" disabled>
                        {status}
                    </button>
                );

            case 'disable':
                return (
                    <button className="btn btn-inactive btn-disabled" disabled>
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
                <title>Dashboard - {websiteName || 'SMT'}</title>
            </Helmet>

            {<Loading show={isLoading} />}

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
                        </IconContext.Provider>{' '}
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
                                        {(totalAmount &&
                                            totalAmount.toFixed(2)) ||
                                            '0'}
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
                                        {totalUsers || '0'}
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
                                            width={'100%'}
                                            height="100%"
                                        >
                                            <AreaChart
                                                data={graphData}
                                                margin={{
                                                    top: 10,
                                                    right: 30,
                                                    left: 0,
                                                    bottom: 0,
                                                }}
                                            >
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />

                                                <Area
                                                    type="monotone"
                                                    dataKey="pending"
                                                    stroke={0}
                                                    fill="#ff632aed"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="processing"
                                                    stroke={0}
                                                    fill="#5dc508"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="inprogress"
                                                    fill="#2172f3"
                                                    stroke={0}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="completed"
                                                    fill="#268b4a"
                                                    stroke={0}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="partial"
                                                    fill="#f34242"
                                                    stroke={0}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="cancelled"
                                                    fill="#cc1f1f"
                                                    stroke={0}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="refunded"
                                                    fill="#8F44FD"
                                                    stroke={0}
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

                                    <div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Title</th>
                                                    <th>status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {lastServices &&
                                                    lastServices.map(
                                                        (service) => (
                                                            <tr
                                                                key={service.id}
                                                            >
                                                                <td>
                                                                    {service.id}
                                                                </td>
                                                                <td>
                                                                    {service
                                                                        .title
                                                                        .length >
                                                                    30
                                                                        ? service.title.substr(
                                                                              0,
                                                                              31
                                                                          ) +
                                                                          '...'
                                                                        : service.title}
                                                                </td>
                                                                <td>
                                                                    {checkStatus(
                                                                        service.status
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </DashboardCard>
                            </div>

                            <div className={classes.section__three__item}>
                                <DashboardCard>
                                    <div className={'tableTitle'}>
                                        Last 10 Account created
                                    </div>

                                    <div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Email</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {lastUsers &&
                                                    lastUsers.map((user) => (
                                                        <tr key={user.id}>
                                                            <td>{user.id}</td>
                                                            <td>
                                                                {user.email
                                                                    .length > 30
                                                                    ? user.email.substr(
                                                                          0,
                                                                          31
                                                                      ) + '...'
                                                                    : user.email}
                                                            </td>

                                                            <td>
                                                                {checkStatus(
                                                                    user.status
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </DashboardCard>
                            </div>
                        </div>
                    </section>

                    <section className={classes.section__four}>
                        <DashboardCard>
                            <div className={'tableTitle'}>Last 10 orders</div>

                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Service</th>
                                            <th>Link</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {lastOrders &&
                                            lastOrders.map((order) => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>
                                                        {getServiceTitle(
                                                            order.serviceId
                                                        ) &&
                                                        getServiceTitle(
                                                            order.serviceId
                                                        ).length > 35
                                                            ? getServiceTitle(
                                                                  order.serviceId
                                                              ).slice(0, 35) +
                                                              '...'
                                                            : getServiceTitle(
                                                                  order.serviceId
                                                              )}
                                                    </td>
                                                    <td>
                                                        {order.link.length > 35
                                                            ? order.link.slice(
                                                                  0,
                                                                  35
                                                              ) + '...'
                                                            : order.link}
                                                    </td>
                                                    <td>{order.quantity}</td>
                                                    <td>{order.charge}</td>
                                                    <td>
                                                        {getStatus(
                                                            order.status
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </DashboardCard>
                    </section>

                    <section className={classes.section__five}>
                        <DashboardCard>
                            <div className={'tableTitle'}>
                                Top 10 best selling services
                            </div>

                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {lastServices &&
                                            lastServices.map((service) => (
                                                <tr key={service.id}>
                                                    <td>{service.id}</td>

                                                    <td>
                                                        {service.title.length >=
                                                        30
                                                            ? service.title.substr(
                                                                  0,
                                                                  31
                                                              ) + '...'
                                                            : service.title}
                                                    </td>

                                                    <td>
                                                        {checkStatus(
                                                            service.status
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
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
