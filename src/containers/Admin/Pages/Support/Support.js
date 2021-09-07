import React, { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Theme from '../../../../store/theme';
import Toast from '../../../../components/UI/Toast/Toast';

import './support.scss';
import AuthContext from '../../../../store/AuthContext';
import 'bootstrap/dist/js/bootstrap.min';

const Support = () => {
    const [tickets, setTickets] = useState();
    const [clients, setClients] = useState();
    const { websiteName } = useContext(AuthContext);
    const { darkTheme } = useContext(Theme);
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
                throw new Error(err.response.message);
            });
    }, []);

    // Send delete request to api and remove deleted ticket from state
    async function deleteTicket(e) {
        const uid = e.target.value;
        try {
            const url = `/admin/support/ticket/delete/${uid}`;
            await Axios.delete(url);
            Toast.success('Ticket deleted!');

            const newList = tickets.filter((ticket) => ticket.uid !== uid);
            setTickets([...newList]);
        } catch (err) {
            Toast.failed(err.response.data.message);
        }
    }

    // Change status of ticket to "Answered"
    async function updateStatus(e) {
        const uid = e.target.value;

        try {
            const url = `/admin/support/ticket/update/status/${uid}`;
            await Axios.post(url);

            const newList = tickets.filter((ticket) => ticket.uid !== uid);
            const updatedTicket = tickets.filter((ticket) => ticket.uid === uid);
            setTickets([{ ...updatedTicket[0], status: 'answered' }, ...newList]);
        } catch (err) {
            Toast.failed(err.response.data.message);
        }
    }

    const ticketList = tickets
        && clients
        && tickets.map((ticket) => {
            const clientDetail = clients.filter(
                (client) => client.id === ticket.clientId,
            );

            return (
                ticket && (
                    <tr key={ticket.id}>
                        <td>{ticket.id}</td>
                        <td>
                            <Link to={`/admin/support/ticket/${ticket.uid}`}>
                                {clientDetail[0] && clientDetail[0].email}
                            </Link>
                        </td>
                        <td className="subject">{ticket.subject}</td>
                        <td className="status">{ticket.status}</td>
                        <td>
                            <IconContext.Provider value={{ style: { fontSize: '30px', padding: 'auto' } }}>
                                <div className="dropdown">
                                    <span
                                        id="option"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <BsThreeDotsVertical />
                                    </span>
                                    <ul className="dropdown-menu" aria-labelledby="option">
                                        <li>
                                            <button
                                                type="button"
                                                className="btn btn-edit"
                                                style={{
                                                    width: '100%',
                                                }}
                                                value={ticket.uid}
                                                onClick={updateStatus}
                                            >
                                                Mark As Answered
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                type="button"
                                                className="btn btn-delete"
                                                style={{
                                                    width: '100%',
                                                }}
                                                value={ticket.uid}
                                                onClick={deleteTicket}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </IconContext.Provider>
                        </td>
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
                        <th>Option</th>
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

            <div className={darkTheme ? 'dark container' : 'container'}>
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
