/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import {
    array, func, object, oneOfType, string,
} from 'prop-types';

import Theme from '../../../store/theme';
import Input, { InputGroup } from '../Input/Input';
import AuthContext from '../../../store/AuthContext';

import supportSVG from '../../../assets/icons/ts.svg';
import customerSVG from '../../../assets/icons/cus.svg';

import classes from './MessageContainer.module.scss';

function MessageContainer({
    inputValue, onChange, onSubmit, messages, ticket, side,
}) {
    const { clientId: userId } = useContext(AuthContext);
    const { darkTheme } = useContext(Theme);

    return (
        <div className={`${classes.message__container} ${darkTheme ? classes.dark : ''} `}>
            <div className={classes.message__header}>
                {
                    ticket && `${ticket.subject} ${(ticket.serviceId ? ` - ${ticket.serviceId}` : '')
                    || (ticket.orderId ? ` - ${ticket.orderId}` : '')
                    || (ticket.transactionId ? ` - ${ticket.transactionId}` : '')} 
                    ${ticket.request ? ` - ${ticket.request}` : ''}`
                }
            </div>

            <div id="support_messages" className={classes.message__body}>
                {
                    messages && messages.map((_message) => {
                        if (userId === _message.userId) {
                            return (
                                <div key={_message.uid} className={classes.user__message}>
                                    <div className={classes.message__card}>
                                        <span className={classes.message_user}>
                                            {_message.message}
                                        </span>
                                        <img src={side === 'admin' ? supportSVG : customerSVG} alt="User Avatar" />
                                    </div>

                                    <div className={classes.sent_time}>{new Date(_message.createdAt).toLocaleString('en-us')}</div>
                                </div>
                            );
                        }

                        return (
                            <div key={_message.uid} className={classes.admin__message}>
                                <div className={classes.message__card}>
                                    <img src={side === 'admin' ? customerSVG : supportSVG} alt="Admin Avatar" />
                                    <span className={classes.message_admin}>
                                        {_message.message}
                                    </span>
                                </div>

                                <div className={classes.sent_time}>
                                    {new Date(_message.createdAt).toLocaleString('en-us')}
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <div className={classes.message__footer}>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Input id="btn-input" type="text" placeholder="Write your message here..." value={inputValue} onChange={onChange} name="message" />
                        <span className="input-group-btn">
                            <button className={classes.send__button} id="btn-chat" type="submit">
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
