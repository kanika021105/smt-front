// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/user/support.scss';
import Card from '../../../../components/UI/Card/Card';
import { Table, Modal } from 'react-bootstrap';

const Support = () => {
    const history = useHistory();

    const [errorMsg, setErrorMsg] = useState('');
    const [addError, setAddError] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [orderId, setOrderId] = useState('');
    const [message, setMessage] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedRequest, setSelectedRequest] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const [tickets, setTickets] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        setShowError(false);
        setErrorMsg('');

        let url = '/support';
        Axios.get(url).then((res) => {
            let { data } = res;

            if (data.status === 'success') {
                setUser(data.user);
                setTickets(data.tickets.reverse());
                return;
            }

            setShowError(true);
            setErrorMsg(
                'Failed to load tickets, Please try again or contact support team'
            );
            return;
        });
    }, []);

    const ticketClickHandler = (id) => {
        setShowError(false);
        setErrorMsg('');

        let path = `/support/ticket/${id}`;
        return history.push(path);
    };

    let ticketList =
        tickets &&
        user &&
        tickets.map((ticket) => {
            return (
                <tr
                    key={ticket.id}
                    onClick={() => ticketClickHandler(ticket.id)}
                >
                    <td>{ticket.id}</td>
                    <td>{user.email}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.status}</td>
                </tr>
            );
        });

    const handleAddButtonClick = () => {
        setShowAddModal(true);
        return;
    };

    const subjectChangeHandler = (e) => {
        setOrderId('');
        setMessage('');
        setServiceId('');
        setTransactionId('');
        setSelectedSubject('');
        setSelectedRequest('');
        setPaymentMethod('');

        setSelectedSubject(e.target.value);
        return;
    };

    const orderIdChangeHandler = (e) => {
        setOrderId(e.target.value);
        return;
    };

    const requestChangeHandler = (e) => {
        setSelectedRequest(e.target.value);
        return;
    };

    const messageChangeHandler = (e) => {
        setMessage(e.target.value);
        return;
    };

    const serviceIdChangeHandler = (e) => {
        setServiceId(e.target.value);
        return;
    };

    const paymentMethodChangeHandler = (e) => {
        setPaymentMethod(e.target.value);
        return;
    };

    const transactionIdChangeHandler = (e) => {
        setTransactionId(e.target.value);
        return;
    };

    const addFormSubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMsg('');
        setAddError(false);

        const url = '/support/create-ticket';

        let ticketData = {};
        switch (selectedSubject) {
            case 'order':
                ticketData = {
                    orderId,
                    message,
                    subject: selectedSubject,
                    request: selectedRequest,
                };
                break;

            case 'payment':
                ticketData = {
                    message,
                    transactionId,
                    subject: selectedSubject,
                    method: paymentMethod,
                };
                break;

            case 'service':
                ticketData = {
                    message,
                    serviceId,
                    subject: selectedSubject,
                };
                break;

            case 'other':
                ticketData = {
                    message,
                    subject: selectedSubject,
                };
                break;

            default:
                break;
        }

        try {
            const { data } = await Axios.post(url, { ...ticketData });

            setTickets((preState) => [{ ...data.ticket }, ...preState]);
            setShowAddModal(false);

            setOrderId('');
            setMessage('');
            setServiceId('');
            setTransactionId('');
            setSelectedSubject('');
            setSelectedRequest('');
            setPaymentMethod('');
            return;
        } catch (err) {
            console.log(err.response.data);

            setErrorMsg(err.response.data.message);
            setAddError(true);
            return;
        }
    };

    const handleBackdropClick = () => {
        setOrderId('');
        setMessage('');
        setServiceId('');
        setTransactionId('');
        setSelectedSubject('');
        setSelectedRequest('');
        setPaymentMethod('');

        setErrorMsg('');
        setAddError(false);
        setShowAddModal(false);
        return;
    };

    const selectedSubjectSection = () => {
        switch (selectedSubject) {
            case 'order':
                return (
                    <>
                        <div className="mt-2">
                            <label className="input__label">OrderId</label>
                            <input
                                type="number"
                                value={orderId}
                                className="input"
                                placeholder="Order Id"
                                onChange={orderIdChangeHandler}
                                required
                            />
                        </div>

                        <div className="mt-2">
                            <label className="input__label">Request</label>
                            <select
                                className="select"
                                value={selectedRequest}
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
                            </select>
                        </div>

                        <div className="mt-2">
                            <label className="input__label">Message</label>
                            <textarea
                                className="input"
                                value={message}
                                onChange={messageChangeHandler}
                                rows={5}
                            />
                        </div>
                    </>
                );

            case 'payment':
                return (
                    <>
                        <div className="mt-2">
                            <label className="input__label">
                                Select Payment Method
                            </label>
                            <select
                                className="select"
                                value={paymentMethod}
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
                            </select>
                        </div>

                        <div className="mt-2">
                            <label className="input__label">
                                Transaction Id
                            </label>
                            <input
                                type="text"
                                className="input"
                                value={transactionId}
                                placeholder="Transaction Id"
                                onChange={transactionIdChangeHandler}
                            />
                        </div>

                        <div className="mt-2">
                            <label className="input__label">Message</label>
                            <textarea
                                className="input"
                                value={message}
                                onChange={messageChangeHandler}
                                rows={7}
                            />
                        </div>
                    </>
                );

            case 'service':
                return (
                    <>
                        <div className="mt-2">
                            <label className="input__label">Service Id</label>
                            <input
                                type="number"
                                className="input"
                                value={serviceId}
                                placeholder="Service Id"
                                onChange={serviceIdChangeHandler}
                                label
                            />
                        </div>

                        <div className="mt-2">
                            <label className="input__label">Message</label>
                            <textarea
                                className="input"
                                value={message}
                                onChange={messageChangeHandler}
                                rows={5}
                            />
                        </div>
                    </>
                );

            case 'other':
                return (
                    <>
                        <div className="mt-2">
                            <label className="input__label">Message</label>
                            <textarea
                                className="input"
                                value={message}
                                onChange={messageChangeHandler}
                                rows={7}
                            />
                        </div>
                    </>
                );
            default:
                break;
        }
    };

    const addModal = (
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Create Ticket</Modal.Title>
            </Modal.Header>

            <form onSubmit={addFormSubmitHandler}>
                <Modal.Body>
                    <div>
                        <label className="input__label">Subject</label>
                        <select
                            className="select"
                            value={selectedSubject}
                            onChange={subjectChangeHandler}
                        >
                            <option key={0} value={null}>
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
                        </select>
                    </div>

                    {selectedSubjectSection()}
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className="btn btn-secondary"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </button>
                    <button
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
                    Support -{' '}
                    {process.env.REACT_APP_WEBSITE_NAME || 'SMT Panel'}
                </title>
            </Helmet>

            {addModal}

            <div className="container Support">
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
                        </IconContext.Provider>{' '}
                        Services
                    </h2>
                    <button className="btn-add" onClick={handleAddButtonClick}>
                        +
                    </button>
                </div>

                <Card>
                    {showError && (
                        <div>
                            <small className="errorMsg">{errorMsg}</small>
                        </div>
                    )}
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
        </>
    );
};

export default React.memo(Support);
