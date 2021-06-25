/* eslint-disable indent */
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Table from '../../../../components/UI/Table/Table';

import WebsiteDetail from '../../../Context/WebsiteDetailContext';

import classes from './orders.module.scss';
import 'bootstrap/js/dist/dropdown';

import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

const Orders = () => {
    const [clients, setClients] = useState();
    const [orders, setOrders] = useState();
    const [services, setServices] = useState();

    const [editingOrder, setEditingOrder] = useState();
    const [editedDetails, setEditedDetails] = useState({
        link: '',
        startCounter: 0,
        remains: 0,
        status: '',
    });

    const { websiteName } = useContext(WebsiteDetail);

    const [showEditModal, setShowEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/orders';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                const { data } = res;
                if (!data) return console.log('something went wrong!');

                setClients(data.clients);
                setServices(data.services);
                setOrders(data.orders);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response);
            });
    }, []);

    const getServiceTitle = (id) => {
        if (services) {
            const details = services.filter((service) => service.id === id);

            if (details[0]) return details[0].title;
            return null;
        }

        return null;
    };

    const getUserEmail = (id) => {
        if (clients) {
            const { email } = clients.filter((client) => client.id === id);

            if (email) return email;
            return null;
        }
    };

    // Deleting Order
    const deleteButtonHandler = async (e) => {
        const id = e.target.value;
        const url = `/admin/order/delete/${id}`;

        try {
            setIsLoading(true);

            const { data } = await Axios.delete(url);
            if (!data) {
                setIsLoading(false);
                return console.log('something went wrong');
            }

            const newList = await orders.filter((order) => order.id !== +id);
            setOrders([...newList]);

            setIsLoading(false);
        } catch (err) {
            console.log(err.response);
        }
    };

    // Editing order
    const editButtonHandler = (e) => {
        setShowEditModal(true);
        const orderId = e.target.value;

        if (!orders) return console.log('Orders list not available!');

        const order = orders.filter((ordr) => +ordr.id === +orderId);
        if (!order) return console.log('order not found!');

        setEditingOrder(order[0]);
        setEditedDetails({
            link: order[0].link,
            startCounter: order[0].startCounter,
            remains: order[0].remains,
            status: order[0].status,
        });
    };

    const startCounterChangeHandler = (e) => {
        setEditedDetails((preState) => ({
            ...preState,
            startCounter: e.target.value,
        }));
    };

    const remainChangeHandler = (e) => {
        setEditedDetails((preState) => ({
            ...preState,
            remains: e.target.value,
        }));
    };

    const statusChangeHandler = (e) => {
        setEditedDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const linkChangeHandler = (e) => {
        setEditedDetails((preState) => ({
            ...preState,
            link: e.target.value,
        }));
    };

    const handleClose = () => {
        setEditedDetails({
            link: '',
            startCounter: 0,
            remains: 0,
            status: '',
        });
        setEditingOrder('');
        setShowEditModal(false);
    };

    const editingSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const orderId = editingOrder.id;
        const url = `/admin/order/edit/${orderId}`;
        const newList = orders.filter((order) => order.id !== editingOrder.id);

        try {
            const { data } = await Axios.patch(url, {
                ...editedDetails,
            });
            if (data.status !== 'success') {
                return console.log('Something went wrong');
            }

            handleClose();
            setIsLoading(false);
            setOrders(() => [
                {
                    ...data.updatedOrder,
                },
                ...newList,
            ]);
        } catch (err) {
            console.log(err);
        }
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit Order</Modal.Title>
            </Modal.Header>

            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    {editingOrder && (
                        <>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="input__label">
                                        OrderId
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={editingOrder.id}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="input__label">
                                        Api OrderId
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={
                                            editingOrder.apiOrderId || 'Manual'
                                        }
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input__label">Service</label>
                                <input
                                    className="input input--disabled"
                                    value={
                                        getServiceTitle(
                                            editingOrder.serviceId,
                                        ) || ''
                                    }
                                    disabled
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label className="input__label ">
                                        Order Type
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={editingOrder.type || 'Manual'}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="input__label">User</label>
                                    <input
                                        className="input input--disabled"
                                        value={
                                            getUserEmail(
                                                editingOrder.clientId,
                                            ) || ''
                                        }
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label className="input__label">
                                        Amount
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={editingOrder.charge || 0}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="input__label">
                                        Quantity
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={editingOrder.quantity || 0}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <label className="input__label">
                                        Start Counter
                                    </label>
                                    <input
                                        className="input"
                                        type="number"
                                        value={editedDetails.startCounter || 0}
                                        onChange={startCounterChangeHandler}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="input__label">
                                        Remains
                                    </label>
                                    <input
                                        className="input"
                                        type="number"
                                        value={editedDetails.remains || 0}
                                        onChange={remainChangeHandler}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="input__label">
                                        Status
                                    </label>
                                    <select
                                        className="select"
                                        value={editedDetails.status}
                                        onChange={statusChangeHandler}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">
                                            Processing
                                        </option>
                                        <option value="inprogress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="partial">Partial</option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="input__label">Link</label>
                                <input
                                    className="input"
                                    type="url"
                                    value={editedDetails.link || ''}
                                    onChange={linkChangeHandler}
                                />
                            </div>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        Close
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={editingSubmitHandler}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const getStatus = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <button
                        type="button"
                        className="btn btn-pending btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'processing':
                return (
                    <button
                        type="button"
                        className="btn btn-processing btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'inprogress':
                return (
                    <button
                        type="button"
                        className="btn btn-inprogress btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'completed':
                return (
                    <button
                        type="button"
                        className="btn btn-completed btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'cancelled':
                return (
                    <button
                        type="button"
                        className="btn btn-cancelled btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'partial':
                return (
                    <button
                        type="button"
                        className="btn btn-partial btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            default:
                break;
        }
    };

    const ordersTable = orders && orders.length <= 0 ? (
        <DataNotFound message="Please wait for clients to create some order." />
        ) : (
            <Card>
                <Table>
                    <Table.Head>
                        <tr>
                            <th>ID</th>
                            <th>Service</th>
                            <th>Link</th>
                            <th>Charge</th>
                            <th>QTY</th>
                            <th>Start Counter</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </Table.Head>

                    <Table.Body>
                        {orders
                            && orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>

                                    <td>
                                        {getServiceTitle(order.serviceId)
                                        && getServiceTitle(order.serviceId)
                                            .length > 30
                                            ? `${order.serviceId} 
                                            - ${getServiceTitle(
                                                order.serviceId,
                                            ).slice(0, 30)}...`
                                            : `${order.serviceId} - getServiceTitle(order.serviceId)`}
                                    </td>

                                    <td>
                                        {order.link.length > 20
                                            ? `${order.link.slice(0, 20)}...`
                                            : order.link}
                                    </td>

                                    <td>{order.charge}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.startCounter}</td>
                                    <td>{getStatus(order.status)}</td>

                                    <td>
                                        <IconContext.Provider
                                            value={{
                                                style: {
                                                    fontSize: '30px',
                                                    padding: 'auto',
                                                },
                                            }}
                                        >
                                            <div className="dropdown ">
                                                <span
                                                    id="option"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <BsThreeDotsVertical />
                                                </span>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="option"
                                                >
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="btn btn-edit"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            value={order.id}
                                                            onClick={
                                                                editButtonHandler
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="btn btn-delete"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            value={order.id}
                                                            onClick={
                                                                deleteButtonHandler
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </IconContext.Provider>
                                    </td>
                                </tr>
                            ))}
                    </Table.Body>
                </Table>
            </Card>
        );

    // TODO
    return (
        <>
            <Helmet>
                <title>
                    Orders -
                    {' '}
                    {websiteName || 'SMT'}
                </title>
            </Helmet>

            {editModal}
            <Loading show={isLoading} />

            <div className="container">
                <div className={classes.Orders}>
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
                        Orders
                    </h2>

                    {ordersTable}
                </div>
            </div>
        </>
    );
};

export default Orders;
