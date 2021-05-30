// jshint esversion:9

import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Modal from 'react-bootstrap/Modal';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import 'bootstrap/js/dist/dropdown';
import '../../../../sass/pages/admin/clients.scss';

const Clients = () => {
    const [users, setUsers] = useState();
    const [showEditModal, setShowEditModal] = useState(false);

    const [editingUserDetails, setEditingUserDetails] = useState({
        id: '',
        fName: '',
        lName: '',
        email: '',
        balance: '',
        contact: '',
        role: '',
        status: '',
    });

    const [editingUser, setEditingUser] = useState();
    const [editedRole, setEditedRole] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedStatus, setEditedStatus] = useState('');
    const [editedContact, setEditedContact] = useState('');
    const [editedBalance, setEditedBalance] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');

    const { websiteName } = useContext(WebsiteDetail);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/clients';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                setUsers(res.data.users.reverse());
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.message);
            });
    }, []);

    const editButtonHandler = async (e) => {
        const id = e.target.value;
        const user = await users.filter((user) => user.id === +id);

        setEditingUserDetails({
            id: user[0].id,
            fName: user[0].f_name,
            lName: user[0].l_name,
            email: user[0].email,
            balance: user[0].balance,
            contact: user[0].contact,
            role: user[0].role,
            status: user[0].status,
        });

        setShowEditModal(true);
    };

    const eFNChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({
            ...preState,
            fName: e.target.value,
        }));
    };

    const eLNChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({
            ...preState,
            lName: e.target.value,
        }));
    };

    const eEmailChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({
            ...preState,
            email: e.target.value,
        }));
    };

    const eBalanceChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({
            ...preState,
            balance: e.target.value,
        }));
    };

    const eContactChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({
            ...preState,
            contact: e.target.value,
        }));
    };

    const eRoleChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({
            ...preState,
            role: e.target.value,
        }));
    };

    const eStatusChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const handleClose = () => {
        setEditingUserDetails({
            id: '',
            fName: '',
            lName: '',
            email: '',
            balance: 0,
            contact: '',
            role: '',
            status: '',
        });

        setShowEditModal(false);
    };

    const eSubmitHandler = async (e) => {
        e.preventDefault();

        const id = editingUserDetails.id;
        const url = `/admin/client/update/${id}`;
        const newList = users.filter((user) => user.id !== id);
        const userData = {
            id,
            role: editingUserDetails.role,
            email: editingUserDetails.email,
            status: editingUserDetails.status,
            contact: editingUserDetails.contact,
            balance: editingUserDetails.balance,
            l_name: editingUserDetails.lName,
            f_name: editingUserDetails.fName,
        };

        await Axios.patch(url, { ...userData });
        setUsers([{ ...userData }, ...newList]);
        handleClose();
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>

            <form onSubmit={eSubmitHandler}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="input__label">First Name</label>
                            <input
                                placeholder="First Name"
                                type="text"
                                className="input"
                                value={editingUserDetails.fName}
                                onChange={eFNChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Last Name</label>
                            <input
                                placeholder="Last Name"
                                type="text"
                                className="input"
                                value={editingUserDetails.lName}
                                onChange={eLNChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="input__label">Email</label>
                        <input
                            placeholder="Email"
                            type="email"
                            className="input"
                            value={editingUserDetails.email}
                            onChange={eEmailChangeHandler}
                        />
                    </div>

                    <div className="row pt-2">
                        <div className="col-md-6">
                            <label className="input__label">Balance</label>
                            <input
                                placeholder="Balance"
                                className="input"
                                type="number"
                                value={editingUserDetails.balance}
                                onChange={eBalanceChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Contact</label>
                            <input
                                placeholder="Contact"
                                className="input"
                                type="number"
                                value={editingUserDetails.contact}
                                onChange={eContactChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="row pt-2">
                        <div className="col-md-6">
                            <label className="input__label">Role</label>
                            <select
                                className="select"
                                value={editingUserDetails.role}
                                onChange={eRoleChangeHandler}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Status</label>
                            <select
                                className="select"
                                value={editingUserDetails.status}
                                onChange={eStatusChangeHandler}
                            >
                                <option value="active">Active</option>
                                <option value="disable">Disable</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        Close
                    </button>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const deleteButtonHandler = async (e) => {
        const id = e.target.value;

        const url = `/admin/client/delete/${id}`;
        const newList = users.filter((user) => user.id !== +id);

        await Axios.delete(url);
        setUsers([...newList]);
    };

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return (
                    <button className="btn btn-active btn-disabled" disabled>
                        {status}
                    </button>
                );

            case 'disable':
                return (
                    <button className="btn btn-inactive btn-disabled" disabled>
                        {status}
                    </button>
                );
            default:
                break;
        }
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Clients - {websiteName || 'SMT'}</title>
            </Helmet>

            {editModal}
            {<Loading show={isLoading} />}

            <div className="container">
                <div className="Clients">
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
                        Clients
                    </h2>
                    <Card>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Full Name</th>
                                    <th>Role</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.f_name} {user.l_name}
                                            </td>
                                            <td>{user.role}</td>
                                            <td>{user.balance}</td>
                                            <td>{checkStatus(user.status)}</td>
                                            <td>
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
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
                                                            class="dropdown-menu"
                                                            aria-labelledby="options"
                                                        >
                                                            <li>
                                                                <button
                                                                    className="btn btn-edit"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    value={
                                                                        user.id
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
                                                                        user.id
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

export default Clients;
