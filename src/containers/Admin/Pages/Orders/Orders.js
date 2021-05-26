/*jshint esversion: 9 */

import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Axios from '../../../../axiosIns';
import Modal from 'react-bootstrap/Modal';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import 'bootstrap/js/dist/dropdown';
import '../../../../sass/pages/admin/orders.scss';

const Orders = () => {
    const [users, setUsers] = useState();
    const [orders, setOrders] = useState();
    const [services, setServices] = useState();

    const [editingOrder, setEditingOrder] = useState();
    const [editedOrder, setEditedOrder] = useState({
        id: '',
        link: '',
        startCounter: 0,
        remains: 0,
        status: '',
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const { websiteName } = useContext(WebsiteDetail);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/orders';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                const { data } = res;

                if (!data) return console.log('something went wrong!');

                setUsers(data.users);
                setServices(data.services);
                setOrders(data.orders.reverse());
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response);
            });
    }, []);

    const getServiceTitle = (id) => {
        if (services) {
            const service = services.filter((service) => service.id === id);

            if (service[0]) return service[0].title;
            return null;
        }

        return null;
    };

    const getUserEmail = (id) => {
        if (users) {
            const user = users.filter((user) => user.id === id);

            if (user[0]) return user[0].email;
            return null;
        }

        return null;
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
        setEditedOrder({
            id: order[0].id,
            link: order[0].link,
            startCounter: order[0].startCounter,
            remains: order[0].remains,
            status: order[0].status,
        });
    };

    const startCounterChangeHandler = (e) => {
        setEditedOrder((preState) => ({
            ...preState,
            startCounter: e.target.value,
        }));
    };

    const remainChangeHandler = (e) => {
        setEditedOrder((preState) => ({
            ...preState,
            remains: e.target.value,
        }));
    };

    const statusChangeHandler = (e) => {
        setEditedOrder((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const linkChangeHandler = (e) => {
        setEditedOrder((preState) => ({
            ...preState,
            link: e.target.value,
        }));
    };

    const editingSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const orderId = editingOrder.id;
        const url = `/admin/order/edit/${orderId}`;
        const editingData = { ...editedOrder };

        const newList = orders.filter((order) => order.id !== editingOrder.id);

        try {
            const { data } = await Axios.patch(url, editingData);
            if (data.status !== 'success') {
                return console.log('Something went wrong');
            }

            handleClose();
            setIsLoading(false);
            setOrders((preState) => [{ ...data.updatedOrder }, ...newList]);
        } catch (err) {
            console.log(err.response);
        }
    };

    const handleClose = () => {
        setEditedOrder('');
        setEditingOrder('');
        setShowEditModal(false);
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
                                            editingOrder.serviceId
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
                                            getUserEmail(editingOrder.userId) ||
                                            ''
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
                                        value={editedOrder.startCounter || ''}
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
                                        value={editedOrder.remains || ''}
                                        onChange={remainChangeHandler}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="input__label">
                                        Status
                                    </label>
                                    <select
                                        className="select"
                                        value={editedOrder.status || ''}
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
                                    value={editedOrder.link || ''}
                                    onChange={linkChangeHandler}
                                />
                            </div>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button
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
                    <button className={'btn btn-pending btn-disabled'} disabled>
                        {status}
                    </button>
                );

            case 'processing':
                return (
                    <button
                        className={'btn btn-processing btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'inprogress':
                return (
                    <button
                        className={'btn btn-inprogress btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'completed':
                return (
                    <button
                        className={'btn btn-completed btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'cancelled':
                return (
                    <button
                        className={'btn btn-cancelled btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'partial':
                return (
                    <button className={'btn btn-partial btn-disabled'} disabled>
                        {status}
                    </button>
                );

            default:
                break;
        }
    };

    // TODO
    return (
        <>
            <Helmet>
                <title>Orders - {websiteName || 'SMT'} </title>
            </Helmet>

            {editModal}
            {<Loading show={isLoading} />}

            <div className="container">
                <div className="Orders">
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
                        Orders
                    </h2>

                    <Card>
                        <table className="table">
                            <thead>
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
                            </thead>

                            <tbody>
                                {orders &&
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>

                                            <td>
                                                {getServiceTitle(
                                                    order.serviceId
                                                ) &&
                                                getServiceTitle(order.serviceId)
                                                    .length > 30
                                                    ? order.serviceId +
                                                      '- ' +
                                                      getServiceTitle(
                                                          order.serviceId
                                                      ).slice(0, 30) +
                                                      '...'
                                                    : order.serviceId +
                                                      '- ' +
                                                      getServiceTitle(
                                                          order.serviceId
                                                      )}
                                            </td>

                                            <td>
                                                {order.link.length > 20
                                                    ? order.link.slice(0, 20) +
                                                      '...'
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
                                                                    className="btn btn-edit"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    value={
                                                                        order.id
                                                                    }
                                                                    onClick={
                                                                        editButtonHandler
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="btn btn-delete"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    value={
                                                                        order.id
                                                                    }
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
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Orders;
