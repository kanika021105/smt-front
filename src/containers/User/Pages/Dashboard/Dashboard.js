// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Loading from '../../../../components/UI/Loading/Loading';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';

import '../../../../sass/pages/user/Dashboard.scss';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/dashboard';
        Axios.get(url)
            .then((res) => {
                setData(res.data);

                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err);
            });
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

            {<Loading show={isLoading} />}

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

                <main className="main">
                    <section className="section__one">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6 u-mb-2 u-sm-mb-1">
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

                            <div className="col-lg-3 col-md-6 col-sm-6 u-mb-2 u-sm-mb-1">
                                <DashboardCard>
                                    <span className="section__one__dataTitle">
                                        Total Spent
                                    </span>
                                    <span className="section__one__dataValue">
                                        {(data.spent &&
                                            data.spent.toFixed(2)) ||
                                            '0'}
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-6 u-mb-2 u-sm-mb-1">
                                <DashboardCard>
                                    <span className="section__one__dataTitle">
                                        Total Order
                                    </span>
                                    <span className="section__one__dataValue">
                                        {(orders && orders.length) || '0'}
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-6 u-mb-2 u-sm-mb-1">
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

                    <section className="section__two">
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-12 u-mb-2 u-sm-mb-1">
                                <DashboardCard>
                                    <span
                                        className={'section__two--graphHeight'}
                                    >
                                        Graph
                                    </span>
                                </DashboardCard>
                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-12 u-mb-2 u-sm-mb-1">
                                <DashboardCard>
                                    <div className="section__two--summaryTitle">
                                        Orders
                                    </div>
                                    <div className="section__two--summaryData">
                                        <div className="row">
                                            <div className="col-6">
                                                <span className="section__two--statusTitle">
                                                    Pending:-
                                                </span>

                                                <span className="section__two--statusTitle">
                                                    Processing:-
                                                </span>

                                                <span className="section__two--statusTitle">
                                                    InProgress:-
                                                </span>

                                                <span className="section__two--statusTitle">
                                                    Completed:-
                                                </span>

                                                <span className="section__two--statusTitle">
                                                    Partial:-
                                                </span>

                                                <span className="section__two--statusTitle">
                                                    Cancelled:-
                                                </span>

                                                <span className="section__two--statusTitle">
                                                    Refunded:-
                                                </span>
                                            </div>

                                            <div className={'col-6'}>
                                                <span className="section__two--statusData">
                                                    {pending
                                                        ? pending.length
                                                        : 0}
                                                </span>

                                                <span className="section__two--statusData">
                                                    {processing
                                                        ? processing.length
                                                        : 0}
                                                </span>

                                                <span className="section__two--statusData">
                                                    {inProgress
                                                        ? inProgress.length
                                                        : 0}
                                                </span>

                                                <span className="section__two--statusData">
                                                    {completed
                                                        ? completed.length
                                                        : 0}
                                                </span>

                                                <span className="section__two--statusData">
                                                    {partial
                                                        ? partial.length
                                                        : 0}
                                                </span>

                                                <span className="section__two--statusData">
                                                    {cancelled
                                                        ? cancelled.length
                                                        : 0}
                                                </span>

                                                <span className="section__two--statusData">
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
                    </section>

                    <section className="section__third mt-2">
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
                                                                className="btn btn-success btn-disabled"
                                                                disabled
                                                            >
                                                                {service.status}
                                                            </button>
                                                        )}
                                                        {service.status ===
                                                            'deactive' && (
                                                            <button
                                                                className={
                                                                    'btn btn-inactive btn-disabled'
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
                                </table>
                            </div>
                        </DashboardCard>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Dashboard;
