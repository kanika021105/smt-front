// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Axios from '../../../../axiosIns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Dashboard.module.css';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';
import { Table } from 'react-bootstrap';

const Dashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        let url = '/dashboard';
        Axios.get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    let { orders } = data;
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

    let { services } = data;
    let topServicesList =
        services &&
        services
            .sort((a, b) => parseFloat(b.min) - parseFloat(a.min))
            .slice(0, 10);

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <meta name="description" content="Helmet application" />
                <title>Dashboard</title>
            </Helmet>

            <div className="container">
                <div className={classes.Dashboard}>
                    <h3 className={classes.pageTitle}>Dashboard</h3>

                    <section className="first">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="m-1">
                                    <DashboardCard>
                                        <span className={classes.dataTitle}>
                                            Available Fund
                                        </span>
                                        <span className={classes.dataValue}>
                                            {(data.balance &&
                                                data.balance.toFixed(2)) ||
                                                '0'}
                                        </span>
                                    </DashboardCard>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="m-1">
                                    <DashboardCard>
                                        <span className={classes.dataTitle}>
                                            Total Spent
                                        </span>
                                        <span className={classes.dataValue}>
                                            {(data.spent &&
                                                data.spent.toFixed(2)) ||
                                                '0'}
                                        </span>
                                    </DashboardCard>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="m-1">
                                    <DashboardCard>
                                        <span className={classes.dataTitle}>
                                            Total Order
                                        </span>
                                        <span className={classes.dataValue}>
                                            {(orders && orders.length) || '0'}
                                        </span>
                                    </DashboardCard>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="m-1">
                                    <DashboardCard>
                                        <span className={classes.dataTitle}>
                                            Total Ticket
                                        </span>
                                        <span className={classes.dataValue}>
                                            {data.totalTickets || '0'}
                                        </span>
                                    </DashboardCard>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="second mt-3">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="m-1">
                                    <DashboardCard>
                                        <span className={classes.graphHeight}>
                                            Graph
                                        </span>
                                    </DashboardCard>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="m-1">
                                    <DashboardCard>
                                        <div className={classes.sectionTitle}>
                                            Orders
                                        </div>
                                        <div className={classes.orderMonitor}>
                                            <div className={classes.row}>
                                                <div
                                                    className={classes.column60}
                                                >
                                                    <span
                                                        className={[
                                                            classes.orderStatusTitle,
                                                            classes.pendingColor,
                                                        ].join(' ')}
                                                    >
                                                        Pending:-
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusTitle,
                                                            classes.processingColor,
                                                        ].join(' ')}
                                                    >
                                                        Processing:-
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusTitle,
                                                            classes.inProgressColor,
                                                        ].join(' ')}
                                                    >
                                                        InProgress:-
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusTitle,
                                                            classes.completedColor,
                                                        ].join(' ')}
                                                    >
                                                        Completed:-
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusTitle,
                                                            classes.partialColor,
                                                        ].join(' ')}
                                                    >
                                                        Partial:-
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusTitle,
                                                            classes.cancelledColor,
                                                        ].join(' ')}
                                                    >
                                                        Cancelled:-
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusTitle,
                                                            classes.refundedColor,
                                                        ].join(' ')}
                                                    >
                                                        Refunded:-
                                                    </span>
                                                </div>

                                                <div
                                                    className={classes.column25}
                                                >
                                                    <span
                                                        className={[
                                                            classes.orderStatusData,
                                                            classes.pendingColor,
                                                        ].join(' ')}
                                                    >
                                                        {pending
                                                            ? pending.length
                                                            : 0}
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusData,
                                                            classes.processingColor,
                                                        ].join(' ')}
                                                    >
                                                        {processing
                                                            ? processing.length
                                                            : 0}
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusData,
                                                            classes.inProgressColor,
                                                        ].join(' ')}
                                                    >
                                                        {inProgress
                                                            ? inProgress.length
                                                            : 0}
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusData,
                                                            classes.completedColor,
                                                        ].join(' ')}
                                                    >
                                                        {completed
                                                            ? completed.length
                                                            : 0}
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusData,
                                                            classes.partialColor,
                                                        ].join(' ')}
                                                    >
                                                        {partial
                                                            ? partial.length
                                                            : 0}
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusData,
                                                            classes.cancelledColor,
                                                        ].join(' ')}
                                                    >
                                                        {cancelled
                                                            ? cancelled.length
                                                            : 0}
                                                    </span>

                                                    <span
                                                        className={[
                                                            classes.orderStatusData,
                                                            classes.refundedColor,
                                                        ].join(' ')}
                                                    >
                                                        {refunded
                                                            ? refunded.length
                                                            : 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </DashboardCard>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="third mt-3">
                        <div className="m-1">
                            <DashboardCard>
                                <div className={classes.sectionTitle}>
                                    Top 10 best selling services
                                </div>

                                <div>
                                    <Table
                                        striped
                                        bordered
                                        hover
                                        responsive
                                        size="sm"
                                    >
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
                                                                        className={
                                                                            classes.successBtn
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
                                                                            classes.dangerBtn
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
                                    </Table>
                                </div>
                            </DashboardCard>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
