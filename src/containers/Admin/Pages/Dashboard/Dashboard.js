// jshint esversion:9

import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/admin/dashboard.scss';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';

const Dashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        let url = '/admin/dashboard';
        Axios.get(url)
            .then((res) => {
                return setData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    let { users } = data;
    let { orders } = data;
    let { services } = data;

    const completed = orders
        ? orders.filter((order) => order.status === 'completed')
        : null;
    const pending = orders
        ? orders.filter((order) => order.status === 'pending')
        : null;
    const processing = orders
        ? orders.filter((order) => order.status === 'processing')
        : null;
    const inProgress = orders
        ? orders.filter((order) => order.status === 'inprogress')
        : null;
    const partial = orders
        ? orders.filter((order) => order.status === 'partial')
        : null;
    const cancelled = orders
        ? orders.filter((order) => order.status === 'cancelled')
        : null;
    const refunded = orders
        ? orders.filter((order) => order.status === 'refunded')
        : null;

    let topServicesList =
        services &&
        services
            .sort((a, b) => parseFloat(b.min) - parseFloat(a.min))
            .slice(0, 10);

    let lastUsersList = users && users.reverse().slice(0, 10);
    let lastOrdersList = orders && orders.reverse().slice(0, 10);

    let getServiceTitle = (id) => {
        if (services) {
            let service = services.filter((service) => +service.id === +id);

            if (service[0]) return service[0].title;
            return null;
        }
        return null;
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <div className="container">
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

                <section className="section__one">
                    <div className="row">
                        <div className="col-1-of-4">
                            <DashboardCard>
                                <span className={'section__one__dataTitle'}>
                                    Total Amount
                                </span>
                                <span className={'section__one__dataValue'}>
                                    {(data.totalAmount &&
                                        data.totalAmount.toFixed(2)) ||
                                        '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className="col-1-of-4">
                            <DashboardCard>
                                <span className={'section__one__dataTitle'}>
                                    Total User
                                </span>
                                <span className={'section__one__dataValue'}>
                                    {(users && users.length) || '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className="col-1-of-4">
                            <DashboardCard>
                                <span className={'section__one__dataTitle'}>
                                    Total Order
                                </span>
                                <span className={'section__one__dataValue'}>
                                    {(orders && orders.length) || '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className="col-1-of-4">
                            <DashboardCard>
                                <span className={'section__one__dataTitle'}>
                                    Total Ticket
                                </span>
                                <span className={'section__one__dataValue'}>
                                    {data.totalTickets || '0'}
                                </span>
                            </DashboardCard>
                        </div>
                    </div>
                </section>

                <section className="section__two">
                    <div className="row">
                        <div className="col-3-of-4">
                            <DashboardCard>
                                <span className={'section__two--graphHeight'}>
                                    Graph
                                </span>
                            </DashboardCard>
                        </div>

                        <div className="col-1-of-4">
                            <DashboardCard>
                                <div className={'section__two--summaryTitle'}>
                                    Orders
                                </div>
                                <div className={'section__two--summaryData'}>
                                    <div className="row">
                                        <div className="col-1-of-2">
                                            <span
                                                className={
                                                    'section__two--statusTitle pendingColor'
                                                }
                                            >
                                                Pending:-
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusTitle processingColor'
                                                }
                                            >
                                                Processing:-
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusTitle inProgressColor'
                                                }
                                            >
                                                InProgress:-
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusTitle completedColor'
                                                }
                                            >
                                                Completed:-
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusTitle partialColor'
                                                }
                                            >
                                                Partial:-
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusTitle cancelledColor'
                                                }
                                            >
                                                Cancelled:-
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusTitle refundedColor'
                                                }
                                            >
                                                Refunded:-
                                            </span>
                                        </div>

                                        <div className="col-1-of-2">
                                            <span
                                                className={
                                                    'section__two--statusData pendingColor'
                                                }
                                            >
                                                {pending ? pending.length : 0}
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusData processingColor'
                                                }
                                            >
                                                {processing
                                                    ? processing.length
                                                    : 0}
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusData inProgressColor'
                                                }
                                            >
                                                {inProgress
                                                    ? inProgress.length
                                                    : 0}
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusData completedColor'
                                                }
                                            >
                                                {completed
                                                    ? completed.length
                                                    : 0}
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusData partialColor'
                                                }
                                            >
                                                {partial ? partial.length : 0}
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusData cancelledColor'
                                                }
                                            >
                                                {cancelled
                                                    ? cancelled.length
                                                    : 0}
                                            </span>

                                            <span
                                                className={
                                                    'section__two--statusData refundedColor'
                                                }
                                            >
                                                {refunded ? refunded.length : 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </DashboardCard>
                        </div>
                    </div>
                </section>

                <section className="section__third">
                    <div className="row">
                        <div className="col-1-of-2">
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
                                                <th>status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topServicesList &&
                                                topServicesList.map(
                                                    (service) => (
                                                        <tr key={service.id}>
                                                            <td>
                                                                {service.id}
                                                            </td>
                                                            <td>
                                                                {service.title
                                                                    .length > 30
                                                                    ? service.title.substr(
                                                                          0,
                                                                          31
                                                                      ) + '...'
                                                                    : service.title}
                                                            </td>
                                                            <td>
                                                                {service.status ===
                                                                    'active' && (
                                                                    <button
                                                                        className="btn btn-success btn-disabled"
                                                                        disabled
                                                                    >
                                                                        {service.status[0].toUpperCase() +
                                                                            service.status
                                                                                .substring(
                                                                                    1
                                                                                )
                                                                                .toLowerCase()}
                                                                    </button>
                                                                )}
                                                                {service.status ===
                                                                    'deactive' && (
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        disabled
                                                                    >
                                                                        {service.status[0].toUpperCase() +
                                                                            service.status
                                                                                .substring(
                                                                                    1
                                                                                )
                                                                                .toLowerCase()}
                                                                    </button>
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

                        <div className="col-1-of-2">
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
                                            {lastUsersList &&
                                                lastUsersList.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>
                                                            {user.email.length >
                                                            30
                                                                ? user.email.substr(
                                                                      0,
                                                                      31
                                                                  ) + '...'
                                                                : user.email}
                                                        </td>
                                                        <td>
                                                            {user.status ===
                                                                'active' && (
                                                                <button
                                                                    className={
                                                                        'btn btn-success btn-disabled'
                                                                    }
                                                                    disabled
                                                                >
                                                                    {user.status[0].toUpperCase() +
                                                                        user.status
                                                                            .substring(
                                                                                1
                                                                            )
                                                                            .toLowerCase()}
                                                                </button>
                                                            )}
                                                            {user.status ===
                                                                'deactive' && (
                                                                <button
                                                                    className={
                                                                        'dangerBtn'
                                                                    }
                                                                    disabled
                                                                >
                                                                    {user.status[0].toUpperCase() +
                                                                        user.status
                                                                            .substring(
                                                                                1
                                                                            )
                                                                            .toLowerCase()}
                                                                </button>
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

                <section className="section__forth">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="m-1">
                                <DashboardCard>
                                    <div className={'tableTitle'}>
                                        Last 10 orders
                                    </div>

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
                                                {lastOrdersList &&
                                                    lastOrdersList.map(
                                                        (order) => (
                                                            <tr key={order.id}>
                                                                <td>
                                                                    {order.id}
                                                                </td>
                                                                <td>
                                                                    {getServiceTitle(
                                                                        order.serviceId
                                                                    ) &&
                                                                    getServiceTitle(
                                                                        order.serviceId
                                                                    ).length >
                                                                        35
                                                                        ? getServiceTitle(
                                                                              order.serviceId
                                                                          ).slice(
                                                                              0,
                                                                              35
                                                                          ) +
                                                                          '...'
                                                                        : getServiceTitle(
                                                                              order.serviceId
                                                                          )}
                                                                </td>
                                                                <td>
                                                                    {order.link
                                                                        .length >
                                                                    35
                                                                        ? order.link.slice(
                                                                              0,
                                                                              35
                                                                          ) +
                                                                          '...'
                                                                        : order.link}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        order.quantity
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        order.charge
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className={
                                                                            'btn btn-success btn-disabled'
                                                                        }
                                                                        disabled
                                                                    >
                                                                        {
                                                                            order.status
                                                                        }
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </DashboardCard>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section__fifth">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="m-1">
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
                                                {topServicesList &&
                                                    topServicesList.map(
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
                                                                        .length >=
                                                                    30
                                                                        ? service.title.substr(
                                                                              0,
                                                                              31
                                                                          ) +
                                                                          '...'
                                                                        : service.title}
                                                                </td>
                                                                <td>
                                                                    {service.status ===
                                                                        'active' && (
                                                                        <button
                                                                            className={
                                                                                'btn btn-success btn-disabled'
                                                                            }
                                                                            disabled
                                                                        >
                                                                            {service.status[0].toUpperCase() +
                                                                                service.status
                                                                                    .substring(
                                                                                        1
                                                                                    )
                                                                                    .toLowerCase()}
                                                                        </button>
                                                                    )}
                                                                    {service.status ===
                                                                        'deactive' && (
                                                                        <button
                                                                            className={
                                                                                'dangerBtn'
                                                                            }
                                                                            disabled
                                                                        >
                                                                            {service.status[0].toUpperCase() +
                                                                                service.status
                                                                                    .substring(
                                                                                        1
                                                                                    )
                                                                                    .toLowerCase()}
                                                                        </button>
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
                        </div>

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
                    </div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
