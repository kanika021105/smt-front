import React, { useEffect, useState } from 'react';

import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import AreaChart from '../../../../components/UI/Charts/Area/Area';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';
import DashboardCard from '../../../../components/UI/DashboardCard/DashboardCard';

import Axios from '../../../../axiosIns';
import classes from './Dashboard.module.scss';

function Dashboard() {
    const [dashboardData, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [graphData, setGraphData] = useState('');

    useEffect(async () => {
        setIsLoading(true);
        const url = '/dashboard';

        try {
            const { data } = await Axios.get(url);
            setData(data);
            setGraphData(data.graphData);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    const {
        totalOrders,
        services,
        totalTickets,
        balance,
        spent,
    } = dashboardData;

    function checkStatus(status) {
        switch (status) {
            case 'active':
                return <Button.Active />;

            case 'disable':
                return <Button.Disable />;

            default:
                return Toast.failed('Something went wrong!');
        }
    }

    return (
        <>
            <PageTitle title="Dashboard" />
            <Loading show={isLoading} />

            <PageContainer>
                <PageHeader header="Dashboard" />

                <section className={classes.section__one}>
                    <DashboardCard title="Available Fund" value={(balance && balance.toFixed(2)) || '0'} />
                    <DashboardCard title="Total Spent" value={(spent && spent.toFixed(2)) || '0'} />
                    <DashboardCard title="Total Orders" value={totalOrders || '0'} />
                    <DashboardCard title="Total Ticket" value={totalTickets || '0'} />
                </section>

                <section className={classes.section__two}>
                    <div className={classes.section__two__graph}>
                        <AreaChart graphData={graphData} />
                    </div>
                </section>

                <section className={classes.section__third}>
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
                                services && services.map((service) => (
                                    <tr key={service.id}>
                                        <td>{service.id}</td>
                                        <td>{service.title.length > 30 ? `${service.title.substr(0, 31)}...` : service.title}</td>
                                        <td>{checkStatus(service.status)}</td>
                                    </tr>
                                ))
                            }
                        </TBody>
                    </Table>
                </section>
            </PageContainer>
        </>
    );
}

export default Dashboard;
