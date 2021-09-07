import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { InputGroup, Card } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../../axiosIns';
import classes from './messages.module.scss';
import Toast from '../../../../../components/UI/Toast/Toast';
import supportSVG from '../../../../../assets/icons/ts.svg';
import customerSVG from '../../../../../assets/icons/cus.svg';

import AuthContext from '../../../../../store/AuthContext';

const Message = () => {
    const [ticket, setTicket] = useState();
    const [messages, setMessages] = useState();
    const [inputMessage, setInputMessage] = useState('');

    const { websiteName, email } = useContext(AuthContext);

    const params = useParams();
    const { uid } = params;

    useEffect(() => {
        const url = `/support/ticket/${uid}`;
        Axios.get(url).then((res) => {
            const { data } = res;

            if (data.status === 'success') {
                setTicket(data.ticket);
                setMessages(data.messages);
            }
        });
    }, [uid]);

    const submitMessageHandler = async (e) => {
        e.preventDefault();

        try {
            const url = `/support/ticket/update/${uid}`;
            const { data } = await Axios.post(url, {
                message: inputMessage,
            });

            if (data.status === 'success') {
                return setMessages((prevState) => [
                    ...prevState,
                    {
                        email,
                        createdAt: Date.now(),
                        message: inputMessage,
                    },
                ]);
            }
            return Toast.failed('Something went wrong!');
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    };

    const inputChangeHandler = (e) => setInputMessage(e.target.value);
    const keyNum = 0;
    const ticketMessage = messages
        && ticket
        && messages.map((msg) => {
            if (email === msg.email) {
                return (
                    <div
                        key={keyNum + 1}
                        className={classes.message__sent__container}
                    >
                        <div className={classes.message__container}>
                            <span className={classes.message}>
                                {msg.message}
                            </span>
                            <img src={customerSVG} alt="user Avatar" />
                        </div>

                        <div className={classes.sentTime}>
                            {new Date(msg.createdAt).toLocaleString('en-us')}
                        </div>
                    </div>
                );
            }

            return (
                <div
                    key={keyNum + 1}
                    className={classes.message__received__container}
                >
                    <div className={classes.message__container}>
                        <img src={supportSVG} alt="user Avatar" />
                        <span className={classes.message}>{msg.message}</span>
                    </div>

                    <div className={classes.sentTime}>
                        {new Date(msg.createdAt).toLocaleString('en-us')}
                    </div>
                </div>
            );
        });

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>
                    Ticket -
                    {' '}
                    {websiteName || ''}
                    {' '}
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
