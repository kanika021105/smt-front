// jshint esversion:9

import React, { useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { InputGroup, Card } from 'react-bootstrap';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../../axiosIns';
import supportSVG from '../../../../../assets/icons/ts.svg';
import customerSVG from '../../../../../assets/icons/cus.svg';

import { AuthContext } from '../../../../Context/AuthContext';
import WebsiteDetail from '../../../../Context/WebsiteDetailContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './messages.module.scss';

const Message = () => {
    const { clientId } = useContext(AuthContext);
    const params = useParams();
    const { id } = params;

    const [ticket, setTicket] = useState();
    const [messages, setMessages] = useState();
    const [inputMessage, setInputMessage] = useState('');

    const { websiteName } = useContext(WebsiteDetail);

    useEffect(() => {
        const url = `/admin/support/ticket/${id}`;
        Axios.get(url)
            .then((res) => {
                const { data } = res;

                setTicket(data.ticket);
                setMessages(data.messages);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const submitMessageHandler = async (e) => {
        e.preventDefault();

        const url = `/admin/support/ticket/update/${id}`;
        try {
            await Axios.post(url, {
                message: inputMessage,
            });
        } catch (err) {
            console.log(err.response.data.message);
        }

        setMessages((prevState) => [
            ...prevState,
            {
                clientId,
                message: inputMessage,
                createdAt: Date.now(),
            },
        ]);
    };

    const inputChangeHandler = (e) => {
        setInputMessage(e.target.value);
    };

    let keyNum = 0;

    const ticketMessage = () => {
        if (messages && ticket) {
            messages.map((msg) => {
                keyNum = +1;

                if (+clientId === +msg.clientId) {
                    return (
                        <div
                            key={keyNum}
                            className={classes.message__sent__container}
                        >
                            <div className={classes.message__container}>
                                <span className={classes.message}>
                                    {msg.message}
                                </span>
                                <img src={supportSVG} alt="user Avatar" />
                            </div>
                            <div className={classes.sentTime}>
                                {new Date(msg.createdAt).toLocaleString(
                                    'en-us',
                                )}
                            </div>
                        </div>
                    );
                }

                return (
                    <div
                        key={keyNum}
                        className={classes.message__received__container}
                    >
                        <div className={classes.message__container}>
                            <img src={customerSVG} alt="user Avatar" />
                            <span className={classes.message}>
                                {msg.message}
                            </span>
                        </div>
                        <div className={classes.sentTime}>
                            {new Date(msg.createdAt).toLocaleString('en-us')}
                        </div>
                    </div>
                );
            });
        }
    };
    // const ticketMessage =
    //     messages &&
    //     ticket &&
    //     messages.map((msg) => {
    //         return +clientId === +msg.clientId ? (
    //             <div
    //                 key={keyNum++}
    //                 className={classes.message__sent__container}
    //             >
    //                 <div className={classes.message__container}>
    //                     <span className={classes.message}>{msg.message}</span>
    //                     <img src={supportSVG} alt="user Avatar" />
    //                 </div>
    //                 <div className={classes.sentTime}>
    //                     {new Date(msg.createdAt).toLocaleString('en-us')}
    //                 </div>
    //             </div>
    //         ) : (
    //             <div
    //                 key={keyNum++}
    //                 className={classes.message__received__container}
    //             >
    //                 <div className={classes.message__container}>
    //                     <img src={customerSVG} alt="user Avatar" />
    //                     <span className={classes.message}>{msg.message}</span>
    //                 </div>

    //                 <div className={classes.sentTime}>
    //                     {new Date(msg.createdAt).toLocaleString('en-us')}
    //                 </div>
    //             </div>
    //         );
    //     });

    // TODO
    return (
        <>
            <Helmet>
                <title>
                    Ticket -
                    {' '}
                    {websiteName || 'SMT'}
                </title>
            </Helmet>

            <div className="container">
                <div className={classes.support}>
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
                        Ticket
                    </h2>

                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <h3>
                                    Subject -
                                    {ticket && ticket.subject}
                                </h3>
                            </Card.Title>
                        </Card.Header>

                        <Card.Body className="CardBody">
                            {ticketMessage}
                        </Card.Body>

                        <Card.Footer>
                            <form onSubmit={submitMessageHandler}>
                                <InputGroup>
                                    <input
                                        id="btn-input"
                                        type="text"
                                        className="form-control input-sm chat_input m-2"
                                        placeholder="Write your message here..."
                                        value={inputMessage}
                                        onChange={inputChangeHandler}
                                        name="message"
                                    />
                                    <span className="input-group-btn">
                                        <button
                                            className="btn btn-primary btn-sm m-2 p-2"
                                            id="btn-chat"
                                            type="submit"
                                        >
                                            Send
                                        </button>
                                    </span>
                                </InputGroup>
                            </form>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default React.memo(Message);
