// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/user/Dashboard.scss';
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
                        <div className="col-md-3 col-sm-6">
                            <DashboardCard>
                                <span className="section__one__dataTitle">
                                    Available Fund
                                </span>
                                <span className="section__one__dataValue">
                                    {(data.balance &&
                                        data.balance.toFixed(2)) ||
                                        '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <DashboardCard>
                                <span className="section__one__dataTitle">
                                    Total Spent
                                </span>
                                <span className="section__one__dataValue">
                                    {(data.spent && data.spent.toFixed(2)) ||
                                        '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <DashboardCard>
                                <span className="section__one__dataTitle">
                                    Total Order
                                </span>
                                <span className="section__one__dataValue">
                                    {(orders && orders.length) || '0'}
                                </span>
                            </DashboardCard>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <DashboardCard>
                                <span className="section__one__dataTitle">
                                    Total Ticket
                                </span>
                                <span className="section__one__dataValue">
                                    {data.totalTickets || '0'}
                                </span>
                            </DashboardCard>
                        </div>
                    </div>
                </section>

                <section className="second mt-2">
                    <div className="row">
                        <div lassName="col-md-9">
                            <div className="m-1">
                                <DashboardCard>
                                    <span className={'graphHeight'}>Graph</span>
                                </DashboardCard>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="m-1">
                                <DashboardCard>
                                    <div className="sectionTitle">Orders</div>
                                    <div className="orderMonitor">
                                        <div className="row">
                                            <div className="column60">
                                                <span className="orderStatusTitle pendingColor">
                                                    Pending:-
                                                </span>

                                                <span className="orderStatusTitle processingColor">
                                                    Processing:-
                                                </span>

                                                <span className="orderStatusTitle inProgressColor">
                                                    InProgress:-
                                                </span>

                                                <span className="orderStatusTitle completedColor">
                                                    Completed:-
                                                </span>

                                                <span className="orderStatusTitle partialColor">
                                                    Partial:-
                                                </span>

                                                <span
                                                    className="orderStatusTitle
                                                            cancelledColor"
                                                >
                                                    Cancelled:-
                                                </span>

                                                <span
                                                    className="orderStatusTitle
                                                            refundedColor"
                                                >
                                                    Refunded:-
                                                </span>
                                            </div>

                                            <div className={'column25'}>
                                                <span
                                                    className="orderStatusData
                                                            pendingColor"
                                                >
                                                    {pending
                                                        ? pending.length
                                                        : 0}
                                                </span>

                                                <span
                                                    className="orderStatusData
                                                            processingColor"
                                                >
                                                    {processing
                                                        ? processing.length
                                                        : 0}
                                                </span>

                                                <span
                                                    className="
                                                            orderStatusData
                                                            inProgressColor"
                                                >
                                                    {inProgress
                                                        ? inProgress.length
                                                        : 0}
                                                </span>

                                                <span
                                                    className="
                                                            orderStatusData
                                                            completedColor"
                                                >
                                                    {completed
                                                        ? completed.length
                                                        : 0}
                                                </span>

                                                <span className="orderStatusData partialColor">
                                                    {partial
                                                        ? partial.length
                                                        : 0}
                                                </span>

                                                <span className="orderStatusData cancelledColor,">
                                                    {cancelled
                                                        ? cancelled.length
                                                        : 0}
                                                </span>

                                                <span className="orderStatusData refundedColor">
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
                            <div className={'sectionTitle'}>
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
                                            topServicesList.map((service) => (
                                                <tr key={service.id}>
                                                    <td>{service.id}</td>
                                                    <td>
                                                        {service.title.length >
                                                        30
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
                                                                    'successBtn'
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
                                            ))}
                                    </tbody>
                                </Table>
                            </div>
                        </DashboardCard>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
