// jshint esversion:9

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';

import Loading from '../../../../components/UI/Loading/Loading';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import './support.scss';

const Support = () => {
    const history = useHistory();

    const [tickets, setTickets] = useState();
    const [users, setUsers] = useState();

    const { websiteName } = useContext(WebsiteDetail);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/support';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                const { data } = res;

                setTickets(data.tickets);
                setUsers(data.users);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.msg);
            });
    }, []);

    const ticketClickHandler = (id) => {
        const path = `/admin/support/ticket/${id}`;
        return history.push(path);
    };

    const ticketList =
        tickets &&
        users &&
        tickets.map((ticket) => {
            const userDetail = users.filter(
                (user) => user.id === ticket.userId
            );

            return (
                ticket && (
                    <tr
                        key={ticket.id}
                        onClick={() => ticketClickHandler(ticket.id)}
                    >
                        <td>{ticket.id}</td>
                        <td>{userDetail[0] && userDetail[0].email}</td>
                        <td>{ticket.subject}</td>
                        <td>{ticket.status}</td>
                    </tr>
                )
            );
        });

    const supportDataTable = (
        <Card>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>{ticketList}</tbody>
            </table>
        </Card>
    );

    const isSupportEmpty = tickets && tickets.length <= 0;

    const DataToShow = isSupportEmpty ? (
        <DataNotFound message="Please wait for users to create support Tickets." />
    ) : (
        supportDataTable
    );

    // TODO
    return (
        <>
            <Helmet>
                <title>Support - {websiteName || 'SMT'}</title>
            </Helmet>

            {<Loading show={isLoading} />}

            <div className="container">
                <div className="Support">
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
                        Support
                    </h2>

                    {DataToShow}
                </div>
            </div>
        </>
    );
};

export default Support;
