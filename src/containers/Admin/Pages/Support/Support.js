import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';

import './support.scss';
import Context from '../../../../store/context';

const Support = () => {
    const history = useHistory();

    const [tickets, setTickets] = useState();
    const [clients, setClients] = useState();

    const { websiteName } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/support';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                const { data } = res;

                setTickets(data.tickets);
                setClients(data.clients);
            })
            .catch((err) => {
                setIsLoading(false);

                // console.log(err.response.msg);
                throw new Error(err.response.message);
            });
    }, []);

    const ticketClickHandler = (id) => {
        const path = `/admin/support/ticket/${id}`;
        return history.push(path);
    };

    const ticketList = tickets
        && clients
        && tickets.map((ticket) => {
            const clientDetail = clients.filter(
                (client) => client.id === ticket.clientId,
            );

            return (
                ticket && (
                    <tr
                        key={ticket.id}
                        onClick={() => ticketClickHandler(ticket.id)}
                    >
                        <td>{ticket.id}</td>
                        <td>{clientDetail[0] && clientDetail[0].email}</td>
                        <td>{ticket.subject}</td>
                        <td>{ticket.status}</td>
                    </tr>
                )
            );
        });

    const supportDataTable = (
        <Card>
            <Table>
                <THead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Status</th>
                    </tr>
                </THead>

                <TBody>{ticketList}</TBody>
            </Table>
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
                <title>
                    Support -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            <Loading show={isLoading} />

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
                        </IconContext.Provider>
                        {' '}
                        Support
                    </h2>

                    {DataToShow}
                </div>
            </div>
        </>
    );
};

export default Support;
