import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';

import Axios from '../../../../../axiosIns';
import AuthContext from '../../../../../store/AuthContext';

import Toast from '../../../../../components/UI/Toast/Toast';
import PageTitle from '../../../../../components/Extra/PageTitle';
import PageHeader from '../../../../../components/UI/PageHeader/PageHeader';
import MessageContainer from '../../../../../components/UI/MessageContainer/MessageContainer';

import classes from './messages.module.scss';

const Message = () => {
    const params = useParams();
    const { clientId: userId } = useContext(AuthContext);
    const { uid } = params;

    const [ticket, setTicket] = useState();
    const [messages, setMessages] = useState();
    const [inputMessage, setInputMessage] = useState('');

    useEffect(async () => {
        try {
            const url = `/admin/support/ticket/${uid}`;
            const { data } = await Axios.get(url);

            setTicket(data.ticket);
            setMessages(data.messages);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong while loading!');
        }
    }, [uid]);

    async function submitMessageHandler(e) {
        e.preventDefault();

        try {
            const url = `/admin/support/ticket/update/${uid}`;
            await Axios.post(url, { message: inputMessage });
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong while sending message!');
        }

        setMessages((prevState) => [
            ...prevState,
            {
                userId,
                uid: `${Math.random()}${Math.random()}`,
                message: inputMessage,
                createdAt: Date.now(),
            },
        ]);
    }

    function inputChangeHandler(e) {
        setInputMessage(e.target.value);
    }

    return (
        <>
            <PageTitle title="Ticket" />
            <div className="container">
                <div className={classes.support}>
                    <PageHeader header="Ticket" />

                    <MessageContainer
                        ticket={ticket}
                        onChange={inputChangeHandler}
                        inputValue={inputMessage}
                        onSubmit={submitMessageHandler}
                        messages={messages}
                        side="admin"
                    />
                </div>
            </div>
        </>
    );
};

export default Message;
