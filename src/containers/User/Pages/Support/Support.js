import React, { useEffect, useContext, useReducer } from 'react';
import { useHistory } from 'react-router';

import Axios from '../../../../axiosIns';
import Theme from '../../../../store/theme';
import AuthContext from '../../../../store/AuthContext';

import Toast from '../../../../components/UI/Toast/Toast';
import Input from '../../../../components/UI/Input/Input';
import Modal from '../../../../components/UI/Modal/Modal';
import Select from '../../../../components/UI/Select/Select';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import classes from './Support.module.scss';

// Reducer function for useReducer hook
function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: !state.isLoading,
            };

        case 'onLoad':
            return {
                ...state,
                tickets: [...action.payload.tickets.reverse()],
            };

        case 'showAddModal':
            return {
                ...state,
                showAddModal: !state.showAddModal,
            };

        case 'clearNewTicket':
            return {
                ...state,
                newTicket: {
                    orderId: '',
                    message: '',
                    serviceId: '',
                    transactionId: '',
                    subject: 'order',
                    request: '',
                    paymentMethod: '',
                },
            };

        case 'newTicket':
            return {
                ...state,
                newTicket: {
                    ...state.newTicket,
                    ...action.payload,
                },
            };

        case 'addTicket':
            return {
                ...state,
                tickets: [
                    { ...action.payload },
                    ...state.tickets,
                ],
            };

        default:
            return { ...state };
    }
}

function Support() {
    const history = useHistory();

    const [state, dispatch] = useReducer(reducer, {
        tickets: [],
        isLoading: false,
        showAddModal: false,
        newTicket: {
            orderId: '',
            message: '',
            serviceId: '',
            transactionId: '',
            subject: 'order',
            request: '',
            paymentMethod: '',
        },
    });

    const { email } = useContext(AuthContext);
    const { darkTheme } = useContext(Theme);

    useEffect(async () => {
        dispatch({ type: 'loading' });

        try {
            const url = '/support';
            const { data } = await Axios.get(url);
            dispatch({ type: 'loading' });
            return dispatch({ type: 'onLoad', payload: { ...data } });
        } catch (err) {
            return Toast.failed(err.response.data.message);
        }
    }, []);

    function ticketClickHandler(uid) {
        const path = `/support/ticket/${uid}`;
        return history.push(path);
    }

    const ticketList = state.tickets && state.tickets.map((ticket) => (
        <tr key={ticket.id} onClick={() => ticketClickHandler(ticket.uid)}>
            <td>{ticket.id}</td>
            <td>{email}</td>
            <td>{ticket.subject}</td>
            <td>{ticket.status}</td>
        </tr>
    ));

    function handleAddButtonClick() {
        dispatch({ type: 'showAddModal' });
    }

    function subjectChangeHandler(e) {
        dispatch({ type: 'clearNewTicket' });
        dispatch({ type: 'newTicket', payload: { subject: e.target.value } });
    }

    function orderIdChangeHandler(e) {
        dispatch({ type: 'newTicket', payload: { orderId: e.target.value } });
    }

    function requestChangeHandler(e) {
        dispatch({ type: 'newTicket', payload: { request: e.target.value } });
    }

    function messageChangeHandler(e) {
        dispatch({ type: 'newTicket', payload: { message: e.target.value } });
    }

    function serviceIdChangeHandler(e) {
        dispatch({ type: 'newTicket', payload: { serviceId: e.target.value } });
    }

    function paymentMethodChangeHandler(e) {
        dispatch({ type: 'newTicket', payload: { paymentMethod: e.target.value } });
    }

    function transactionIdChangeHandler(e) {
        dispatch({ type: 'newTicket', payload: { transactionId: e.target.value } });
    }

    function handleBackdropClick() {
        dispatch({ type: 'clearNewTicket' });
        dispatch({ type: 'showAddModal' });
    }

    async function addFormSubmitHandler(e) {
        e.preventDefault();

        let ticketData;
        switch (state.newTicket.subject) {
            case 'order':
                ticketData = {
                    orderId: state.newTicket.orderId,
                    message: state.newTicket.message,
                    subject: state.newTicket.subject,
                    request: state.newTicket.request,
                };
                break;

            case 'payment':
                ticketData = {
                    message: state.newTicket.message,
                    transactionId: state.newTicket.transactionId,
                    subject: state.newTicket.subject,
                    paymentMethod: state.newTicket.paymentMethod,
                };
                break;

            case 'service':
                ticketData = {
                    message: state.newTicket.message,
                    serviceId: state.newTicket.serviceId,
                    subject: state.newTicket.subject,
                };
                break;

            case 'other':
                ticketData = {
                    message: state.newTicket.message,
                    subject: state.newTicket.subject,
                };
                break;

            default:
                Toast.failed('Something went wrong!');
        }

        try {
            const url = '/support/create-ticket';
            const { data } = await Axios.post(url, { ...ticketData });
            dispatch({ type: 'addTicket', payload: { ...data.ticket } });
            dispatch({ type: 'showAddModal' });

            Toast.success('Ticket created!');
            handleBackdropClick();
            return dispatch({ type: 'clearNewTicket' });
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    function selectedSubjectSection() {
        switch (state.newTicket.subject) {
            case 'order':
                return (
                    <>
                        <Input label="Order Id" type="number" value={state.newTicket.orderId} placeholder="Order Id" onChange={orderIdChangeHandler} required />
                        <Select label="Request" value={state.newTicket.request} onChange={requestChangeHandler} required>
                            <option key={0} value={null}>Choose request!</option>
                            <option key="cancel" value="cancel">Cancel</option>
                            <option key="refill" value="refill">Refill</option>
                            <option key="speedUp" value="speedUp">Speed Up</option>
                            <option key="other" value="other">Other</option>
                        </Select>
                        <Textarea label="Message" value={state.newTicket.message} onChange={messageChangeHandler} rows={5} />
                    </>
                );

            case 'payment':
                return (
                    <>
                        <Select label="Select Payment Method" value={state.newTicket.paymentMethod} onChange={paymentMethodChangeHandler} required>
                            <option key={0} value={null}>Choose payment method!</option>
                            <option key="razorpay" value="razorpay">Razorpay</option>
                            <option key="other" value="other">Other</option>
                        </Select>
                        <Input label="Transaction Id" type="text" value={state.newTicket.transactionId} placeholder="Transaction Id" onChange={transactionIdChangeHandler} />
                        <Textarea label="Message" value={state.newTicket.message} onChange={messageChangeHandler} rows={7} />
                    </>
                );

            case 'service':
                return (
                    <>
                        <Input label="Service Id" type="number" value={state.newTicket.serviceId} placeholder="Service Id" onChange={serviceIdChangeHandler} />
                        <Textarea label="Message" value={state.newTicket.message} onChange={messageChangeHandler} rows={5} />
                    </>
                );

            case 'other':
                return (
                    <Textarea label="Message" value={state.newTicket.message} onChange={messageChangeHandler} rows={7} />
                );

            default:
                return Toast.failed('Something went wrong!');
        }
    }

    const addModal = (
        <Modal show={state.showAddModal} onClose={handleBackdropClick} title="Create Ticket" onSubmit={addFormSubmitHandler}>
            <form onSubmit={addFormSubmitHandler}>
                <Select label="Subject" value={state.newTicket.subject} onChange={subjectChangeHandler}>
                    <option key={0} value="">Choose a subject!</option>
                    <option key="order" value="order">Order</option>
                    <option key="payment" value="payment">Payment</option>
                    <option key="service" value="service">Service</option>
                    <option key="other" value="other">Other</option>
                </Select>
                {selectedSubjectSection()}
            </form>
        </Modal>
    );

    return (
        <>
            <PageTitle title="Support" />
            <Loading show={state.isLoading} />

            {addModal}

            <PageContainer>
                <div className={darkTheme ? classes.dark : ''}>
                    <PageHeader header="Support"><Button.Add onClick={handleAddButtonClick} /></PageHeader>

                    <Table>
                        <THead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Status</th>
                            </tr>
                        </THead>

                        <TBody>{ticketList}</TBody>
                    </Table>
                </div>
            </PageContainer>
        </>
    );
}

export default React.memo(Support);
