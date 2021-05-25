// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import '../../../../sass/pages/admin/support.scss';

const Support = () => {
    const history = useHistory();

    const [tickets, setTickets] = useState();
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/support';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                const { data } = res;

                setTickets(data.tickets.reverse());
                setUsers(data.users);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.msg);
            });
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
