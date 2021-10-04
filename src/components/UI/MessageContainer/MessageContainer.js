/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import {
    array, func, object, oneOfType, string,
} from 'prop-types';

import Input, { InputGroup } from '../Input/Input';
import AuthContext from '../../../store/AuthContext';

import supportSVG from '../../../assets/icons/ts.svg';
import customerSVG from '../../../assets/icons/cus.svg';

import './MessageContainer.scss';

function MessageContainer({
    inputValue, onChange, onSubmit, messages, ticket, side,
}) {
    const { clientId: userId } = useContext(AuthContext);

    return (
        <div className="message__container">
            <div className="message__header">
                {ticket && `
                    ${ticket.subject}
                    ${(ticket.serviceId ? ` - ${ticket.serviceId}` : '')
                    || (ticket.orderId ? ` - ${ticket.orderId}` : '')
                    || (ticket.transactionId ? ` - ${ticket.transactionId}` : '')} 
                    ${ticket.request ? ` - ${ticket.request}` : ''}
                `}
            </div>

            <div id="support_messages" className="message__body">
                {
                    messages && messages.map((_message) => {
                        if (userId === _message.userId) {
                            return (
                                <div
                                    key={_message.uid}
                                    className="user__message"
                                >
                                    <div className="message__card">
                                        <span className="message_user">{_message.message}</span>
                                        <img src={side === 'admin' ? supportSVG : customerSVG} alt="User Avatar" />
                                    </div>

                                    <div className="sent_time">
                                        {new Date(_message.createdAt).toLocaleString('en-us')}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={_message.uid}
                                className="admin__message"
                            >
                                <div className="message__card">
                                    <img src={side === 'admin' ? customerSVG : supportSVG} alt="Admin Avatar" />
                                    <span className="message_admin">{_message.message}</span>
                                </div>

                                <div className="sent_time">
                                    {new Date(_message.createdAt).toLocaleString('en-us')}
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <div className="message__footer">
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Input
                            id="btn-input"
                            type="text"
                            className="form-control input-sm chat_input m-2"
                            placeholder="Write your message here..."
                            value={inputValue}
                            onChange={onChange}
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
            </div>
        </div>
    );
}

MessageContainer.propTypes = {
    inputValue: string,
    onChange: func,
    onSubmit: func,
    messages: array,
    ticket: oneOfType([object, string]),
    side: string,
};

export default MessageContainer;
