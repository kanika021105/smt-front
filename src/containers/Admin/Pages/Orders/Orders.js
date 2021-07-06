import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Modal from 'react-bootstrap/Modal';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Axios from '../../../../axiosIns';
import Context from '../../../../store/context';
import Card from '../../../../components/UI/Card/Card';
import Toast from '../../../../components/UI/Toast/Toast';
import Loading from '../../../../components/UI/Loading/Loading';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Select from '../../../../components/UI/Select/Select';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import Button from '../../../../components/UI/Button/Button';

import classes from './orders.module.scss';
import 'bootstrap/js/dist/dropdown';

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

    const { websiteName } = useContext(Context);

    const [showEditModal, setShowEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/orders';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                const { data } = res;
                setClients(data.clients);
                setServices(data.services);
                setOrders(data.orders);
            })
            .catch((err) => {
                setIsLoading(false);
                return Toast.failed(err.response.message || 'Something went wrong!');
            });
    }, []);

    const getServiceTitle = (id) => {
        if (services) {
            const details = services.filter((service) => service.id === id);

            if (details[0]) return details[0].title;
            return '';
        }
        return '';
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
            await Axios.delete(url);
            const newList = await orders.filter((order) => order.id !== +id);
            setOrders([...newList]);
            Toast.warning(`Order id "${id}" deleted!`);
        } catch (err) {
            Toast.failed(err.response.message);
        }
    };

    // Editing order
    const editButtonHandler = (e) => {
        setShowEditModal(true);

        const orderId = e.target.value;
        if (!orders) throw new Error('Orders list not available!');

        const order = orders.filter((ordr) => +ordr.id === +orderId);
        if (!order) throw new Error('Orders not found');

        setEditingOrder(order[0]);
        const {
            link,
            startCounter,
            remains,
            status,
        } = order[0];

        setEditedDetails({
            link,
            startCounter,
            remains,
            status,
        });
    };

    const startCounterChangeHandler = (e) => {
        setEditedDetails((preState) => ({ ...preState, startCounter: e.target.value }));
    };

    const remainChangeHandler = (e) => {
        setEditedDetails((preState) => ({ ...preState, remains: e.target.value }));
    };

    const statusChangeHandler = (e) => {
        setEditedDetails((preState) => ({ ...preState, status: e.target.value }));
    };

    const linkChangeHandler = (e) => {
        setEditedDetails((preState) => ({ ...preState, link: e.target.value }));
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

        const { id } = editingOrder;
        const newList = orders.filter((order) => order.id !== id);

        try {
            const url = `/admin/order/edit/${id}`;
            const { data } = await Axios.patch(url, { ...editedDetails });

            setOrders(() => [{ ...data.updatedOrder }, ...newList]);
            handleClose();
            Toast.success(`Order id "${id}"`);
        } catch (err) {
            Toast.failed(err.response.message);
        }
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Edit Order</Modal.Title>
            </Modal.Header>

            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    {editingOrder && (
                        <>
                            <InputGroup>
                                <Input
                                    label="Order Id"
                                    value={editingOrder.id}
                                    disabled
                                />

                                <Input
                                    label="API Order Id"
                                    value={editingOrder.apiOrderId || 'Manual'}
                                    disabled
                                />
                            </InputGroup>

                            <Input
                                label="Service"
                                value={getServiceTitle(editingOrder.serviceId) || ''}
                                disabled
                            />

                            <InputGroup>
                                <Input
                                    label="Order Type"
                                    value={editingOrder.type || 'Manual'}
                                    disabled
                                />

                                <Input
                                    label="User"
                                    value={getUserEmail(editingOrder.clientId) || ''}
                                    disabled
                                />
                            </InputGroup>

                            <InputGroup>
                                <Input
                                    label="Amount"
                                    value={editingOrder.charge || 0}
                                    disabled
                                />

                                <Input
                                    label="Quantity"
                                    value={editingOrder.quantity || 0}
                                    disabled
                                />
                            </InputGroup>

                            <InputGroup>
                                <Input
                                    label="Start Counter"
                                    type="number"
                                    value={editedDetails.startCounter || 0}
                                    onChange={startCounterChangeHandler}
                                />

                                <Input
                                    label="Remains"
                                    type="number"
                                    value={editedDetails.remains || 0}
                                    onChange={remainChangeHandler}
                                />

                            </InputGroup>

                            <InputGroup>
                                <Input
                                    label="Link"
                                    type="url"
                                    value={editedDetails.link || ''}
                                    onChange={linkChangeHandler}
                                />

                                <Select
                                    label="Status"
                                    value={editedDetails.status}
                                    onChange={statusChangeHandler}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="partial">Partial</option>
                                    <option value="cancelled">Cancelled</option>
                                </Select>
                            </InputGroup>

                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary type="button" onClick={handleClose}>
                        Close
                    </Button.ModalSecondary>

                    <Button.ModalPrimary type="submit" onClick={editingSubmitHandler}>
                        Submit
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const getStatus = (status) => {
        switch (status) {
            case 'pending':
                return <Button.OrderPending />;

            case 'processing':
                return <Button.OrderProcessing />;

            case 'inprogress':
                return <Button.OrderInprogress />;

            case 'completed':
                return <Button.OrderCompleted />;

            case 'cancelled':
                return <Button.OrderCancelled />;

            case 'partial':
                return <Button.OrderPartial />;

            case 'refunded':
                return <Button.OrderRefunded />;

            default:
                break;
        }
    };

    const ordersTable = orders && orders.length <= 0 ? (
        <DataNotFound message="Please wait for clients to create some order." />
    ) : (
        <Card>
            <Table>
                <THead>
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
                </THead>

                <TBody>
                    {orders && orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                                {getServiceTitle(order.serviceId)
                                    && getServiceTitle(order.serviceId).length > 30
                                    ? `${order.serviceId} - ${getServiceTitle(order.serviceId).slice(0, 30)}...`
                                    : `${order.serviceId} - ${getServiceTitle(order.serviceId)}`}
                            </td>
                            <td>
                                {order.link.length > 20 ? `${order.link.slice(0, 20)}...` : order.link}
                            </td>
                            <td>{order.charge}</td>
                            <td>{order.quantity}</td>
                            <td>{order.startCounter}</td>
                            <td>{getStatus(order.status)}</td>
                            <td>
                                <IconContext.Provider
                                    value={{ style: { fontSize: '30px', padding: 'auto' } }}
                                >
                                    <div className="dropdown">
                                        <span
                                            id="option"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <BsThreeDotsVertical />
                                        </span>

                                        <ul className="dropdown-menu" aria-labelledby="option">
                                            <li>
                                                <Button.Edit
                                                    value={order.id}
                                                    onClick={editButtonHandler}
                                                />
                                            </li>

                                            <li>
                                                <Button.Delete
                                                    value={order.id}
                                                    onClick={deleteButtonHandler}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </IconContext.Provider>
                            </td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    );

    return (
        <>
            <Helmet>
                <title>
                    Orders -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            {editModal}
            <Loading show={isLoading} />

            <div className="container">
                <div className={classes.Orders}>
                    <h2 className="pageTitle">
                        <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
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
