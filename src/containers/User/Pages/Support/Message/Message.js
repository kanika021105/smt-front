import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';

import Axios from '../../../../../axiosIns';
import AuthContext from '../../../../../store/AuthContext';

import Toast from '../../../../../components/UI/Toast/Toast';
import PageTitle from '../../../../../components/Extra/PageTitle';
import PageHeader from '../../../../../components/UI/PageHeader/PageHeader';
import MessageContainer from '../../../../../components/UI/MessageContainer/MessageContainer';

import classes from './messages.module.scss';
import PageContainer from '../../../../../components/UI/PageContainer/PageContainer';

function Message() {
    const params = useParams();
    const { uid } = params;

    const [ticket, setTicket] = useState('');
    const [messages, setMessages] = useState();
    const [inputMessage, setInputMessage] = useState('');

    const { clientId: userId } = useContext(AuthContext);

    useEffect(async () => {
        try {
            const url = `/support/ticket/${uid}`;
            const { data } = await Axios.get(url);

            setTicket(data.ticket);
            return setMessages(data.messages);
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Something went wrong while loading!');
        }
    }, [uid]);

    function inputChangeHandler(e) {
        setInputMessage(e.target.value);
    }

    async function submitMessageHandler(e) {
        e.preventDefault();

        try {
            const url = `/support/ticket/update/${uid}`;
            await Axios.post(url, { message: inputMessage });
            setInputMessage('');

            setMessages((prevState) => [
                ...prevState,
                {
                    userId,
                    uid: `${Math.random()}${Math.random()}`,
                    createdAt: Date.now(),
                    message: inputMessage,
                },
            ]);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong while sending message!');
        }
    }

    return (
        <>
            <PageTitle title="Ticket" />
            <PageContainer>
                <div className={classes.support}>
                    <PageHeader header="Ticket" />

                    <MessageContainer
                        ticket={ticket}
                        onChange={inputChangeHandler}
                        inputValue={inputMessage}
                        onSubmit={submitMessageHandler}
                        messages={messages}
                        side="user"
                    />
                </div>
            </PageContainer>
        </>
    );
}

export default Message;
