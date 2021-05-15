// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import axios from '../../../../axiosIns';
import '../../../../sass/pages/admin/support.scss';
import Card from '../../../../components/UI/Card/Card';

const Support = () => {
    const history = useHistory();

    const [tickets, setTickets] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        const url = '/admin/support';

        axios
            .get(url)
            .then((res) => {
                const { data } = res;

                setTickets(data.tickets.reverse());
                setUsers(data.users);
            })
            .catch((err) => console.log(err));
    }, []);

    const ticketClickHandler = (id) => {
        let path = `/admin/support/ticket/${id}`;
        return history.push(path);
    };

    let ticketList =
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

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Support - SMT Panel</title>
            </Helmet>

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
                </div>
            </div>
        </>
    );
};

export default Support;
