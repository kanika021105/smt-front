import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import Axios from '../../../../axiosIns';

import Card from '../../../../components/UI/Card/Card';
import Toast from '../../../../components/UI/Toast/Toast';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import Dropdown from '../../../../components/UI/Dropdown/Dropdown';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import './support.scss';

// Reducer function to update state data according to dispatched data
function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: !state.isLoading };

        case 'setTickets':
            return { ...state, tickets: [...action.payload] };

        case 'setClients':
            return { ...state, clients: [...action.payload] };

        default:
            return { ...state };
    }
}

const Support = () => {
    const [state, dispatch] = useReducer(reducer, {
        tickets: [],
        clients: [],
        isLoading: false,
    });

    // Fetching data when page loads
    useEffect(() => {
        dispatch({ type: 'loading' });

        const url = '/admin/support';
        Axios.get(url)
            .then((res) => {
                dispatch({ type: 'loading' });

                const { data } = res;
                dispatch({ type: 'setTickets', payload: data.tickets });
                dispatch({ type: 'setClients', payload: data.clients });
            })
            .catch((err) => {
                dispatch({ type: 'loading' });
                Toast.failed(err.response.data.message);
            });
    }, []);

    // Send delete request to api and remove deleted ticket from state
    async function deleteTicket(e) {
        const uid = e.target.value;
        try {
            const url = `/admin/support/ticket/delete/${uid}`;
            const newList = state.tickets.filter((ticket) => ticket.uid !== uid);

            await Axios.delete(url);
            Toast.success('Ticket deleted!');
            dispatch({ type: 'setTickets', payload: newList });
        } catch (err) {
            Toast.failed(err.response.data.message);
        }
    }

    // Change status of ticket to "Answered"
    async function updateStatus(e) {
        const uid = e.target.value;
        const url = `/admin/support/ticket/update/status/${uid}`;
        const newList = state.tickets.filter((ticket) => ticket.uid !== uid);
        const updatedTicket = state.tickets.find((ticket) => ticket.uid === uid);

        try {
            await Axios.post(url);
            dispatch({ type: 'setTickets', payload: [{ ...updatedTicket, status: 'answered' }, ...newList] });
        } catch (err) {
            Toast.failed(err.response.data.message);
        }
    }

    const ticketList = state.tickets
        && state.clients
        && state.tickets.map((ticket) => {
            const clientDetail = state.clients.find((client) => client.id === ticket.userId);

            return (
                ticket && (
                    <tr key={ticket.id}>
                        <td>{ticket.id}</td>
                        <td><Link to={`/admin/support/ticket/${ticket.uid}`}>{clientDetail && clientDetail.email}</Link></td>
                        <td className="subject">{ticket.subject}</td>
                        <td className="status">{ticket.status}</td>
                        <td>
                            <Dropdown id={ticket.uid}>
                                <ul>
                                    <li>
                                        <button type="button" className="btn btn-edit" style={{ width: '100%' }} value={ticket.uid} onClick={updateStatus}>
                                            Mark As Answered
                                        </button>
                                    </li>

                                    <li>
                                        <button type="button" className="btn btn-delete" style={{ width: '100%' }} value={ticket.uid} onClick={deleteTicket}>
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
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

    const isSupportEmpty = state.tickets && state.tickets.length <= 0;
    const DataToShow = isSupportEmpty ? (<DataNotFound message="Please wait for users to create support Tickets." />) : (supportDataTable);

    return (
        <>
            <PageTitle title="Support" />
            <Loading show={state.isLoading} />

            <PageContainer>
                <PageHeader header="Support" />
                {DataToShow}
            </PageContainer>
        </>
    );
};

export default Support;
