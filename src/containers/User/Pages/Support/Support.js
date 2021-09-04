import React, {
    useEffect, useContext, useReducer,
} from 'react';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import Modal from 'react-bootstrap/Modal';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Toast from '../../../../components/UI/Toast/Toast';
import Input from '../../../../components/UI/Input/Input';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import Select from '../../../../components/UI/Select/Select';
import Theme from '../../../../store/theme';

import AuthContext from '../../../../store/AuthContext';
import '../../../../sass/pages/user/support.scss';

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

const Support = () => {
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

    const { email, websiteName } = useContext(AuthContext);
    const { darkTheme } = useContext(Theme);

    useEffect(() => {
        dispatch({ type: 'loading' });

        const url = '/support';
        Axios.get(url)
            .then((res) => {
                const { data } = res;
                dispatch({ type: 'loading' });
                dispatch({ type: 'onLoad', payload: { ...data } });
            }).catch((err) => {
                Toast.failed(err.response.data.message);
            });
    }, []);

    const ticketClickHandler = (id) => {
        const path = `/support/ticket/${id}`;
        return history.push(path);
    };

    const ticketList = state.tickets
        && state.tickets.map((ticket) => (
            <tr key={ticket.id} onClick={() => ticketClickHandler(ticket.id)}>
                <td>{ticket.id}</td>
                <td>{email}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.status}</td>
            </tr>
        ));

    const handleAddButtonClick = () => {
        // setShowAddModal(true);
        dispatch({ type: 'showAddModal' });
    };

    const subjectChangeHandler = (e) => {
        dispatch({ type: 'clearNewTicket' });

        dispatch({ type: 'newTicket', payload: { subject: e.target.value } });
        // setSelectedSubject(e.target.value);
    };

    const orderIdChangeHandler = (e) => {
        // setOrderId(e.target.value);
        dispatch({ type: 'newTicket', payload: { orderId: e.target.value } });
    };

    const requestChangeHandler = (e) => {
        // setSelectedRequest(e.target.value);
        dispatch({ type: 'newTicket', payload: { request: e.target.value } });
    };

    const messageChangeHandler = (e) => {
        // setMessage(e.target.value);
        dispatch({ type: 'newTicket', payload: { message: e.target.value } });
    };

    const serviceIdChangeHandler = (e) => {
        // setServiceId(e.target.value);
        dispatch({ type: 'newTicket', payload: { serviceId: e.target.value } });
    };

    const paymentMethodChangeHandler = (e) => {
        // setPaymentMethod(e.target.value);
        dispatch({ type: 'newTicket', payload: { paymentMethod: e.target.value } });
    };

    const transactionIdChangeHandler = (e) => {
        // setTransactionId(e.target.value);
        dispatch({ type: 'newTicket', payload: { transactionId: e.target.value } });
    };

    const addFormSubmitHandler = async (e) => {
        e.preventDefault();

        // setErrorMsg('');

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
            return dispatch({ type: 'clearNewTicket' });
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    };

    const handleBackdropClick = () => {
        // resetState();
        dispatch({ type: 'clearNewTicket' });
        // setErrorMsg('');
        // setShowAddModal(false);
        dispatch({ type: 'showAddModal' });
    };

    const selectedSubjectSection = () => {
        switch (state.newTicket.subject) {
            case 'order':
                return (
                    <>
                        <Input
                            label="Order Id"
                            type="number"
                            value={state.newTicket.orderId}
                            placeholder="Order Id"
                            onChange={orderIdChangeHandler}
                            required
                        />

                        <Select
                            label="Request"
                            value={state.newTicket.request}
                            onChange={requestChangeHandler}
                            required
                        >
                            <option key={0} value={null}>
                                Choose request!
                            </option>
                            <option key="cancel" value="cancel">
                                Cancel
                            </option>
                            <option key="refill" value="refill">
                                Refill
                            </option>
                            <option key="speedUp" value="speedUp">
                                Speed Up
                            </option>
                            <option key="other" value="other">
                                Other
                            </option>
                        </Select>

                        <Textarea
                            label="Message"
                            value={state.newTicket.message}
                            onChange={messageChangeHandler}
                            rows={5}
                        />
                    </>
                );

            case 'payment':
                return (
                    <>
                        <Select
                            label="Select Payment Method"
                            value={state.newTicket.paymentMethod}
                            onChange={paymentMethodChangeHandler}
                            required
                        >
                            <option key={0} value={null}>
                                Choose payment method!
                            </option>
                            <option key="razorpay" value="razorpay">
                                Razorpay
                            </option>
                            <option key="other" value="other">
                                Other
                            </option>
                        </Select>

                        <Input
                            label="Transaction Id"
                            type="text"
                            value={state.newTicket.transactionId}
                            placeholder="Transaction Id"
                            onChange={transactionIdChangeHandler}
                        />

                        <Textarea
                            label="Message"
                            value={state.newTicket.message}
                            onChange={messageChangeHandler}
                            rows={7}
                        />
                    </>
                );

            case 'service':
                return (
                    <>
                        <Input
                            label="Service Id"
                            type="number"
                            value={state.newTicket.serviceId}
                            placeholder="Service Id"
                            onChange={serviceIdChangeHandler}
                        />

                        <Textarea
                            label="Message"
                            value={state.newTicket.message}
                            onChange={messageChangeHandler}
                            rows={5}
                        />
                    </>
                );

            case 'other':
                return (
                    <Textarea
                        label="Messsage"
                        value={state.newTicket.message}
                        onChange={messageChangeHandler}
                        rows={7}

                    />
                );

            default:
                return Toast.failed('Something went wrong!');
        }
    };

    const addModal = (
        <Modal show={state.showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Create Ticket</Modal.Title>
            </Modal.Header>

            <form onSubmit={addFormSubmitHandler}>
                <Modal.Body>
                    <Select
                        label="Subject"
                        value={state.newTicket.subject}
                        onChange={subjectChangeHandler}
                    >
                        <option key={0} value="">
                            Choose a subject!
                        </option>
                        <option key="order" value="order">
                            Order
                        </option>
                        <option key="payment" value="payment">
                            Payment
                        </option>
                        <option key="service" value="service">
                            Service
                        </option>
                        <option key="other" value="other">
                            Other
                        </option>
                    </Select>

                    {selectedSubjectSection()}
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={addFormSubmitHandler}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    return (
        <>
            <Helmet>
                <title>
                    Support -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>
            {addModal}

            <Loading show={state.isLoading} />

            <div className={darkTheme ? 'dark container Support' : 'container Support'}>
                <div>
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
                        Services
                    </h2>
                    <button
                        type="button"
                        className="btn-add"
                        onClick={handleAddButtonClick}
                    >
                        +
                    </button>
                </div>

                <Card>
                    <Table className="table">
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
                </Card>
            </div>
        </>
    );
};

export default React.memo(Support);
