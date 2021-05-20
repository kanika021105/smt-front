// jshint esversion:9
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscListSelection } from 'react-icons/vsc';
import {
    Form,
    Modal,
    Button,
    InputGroup,
    FormControl,
    DropdownButton,
} from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import 'bootstrap/js/dist/dropdown';
import '../../../../sass/pages/admin/clients.scss';
import Card from '../../../../components/UI/Card/Card';

export default function Services() {
    const [users, setUsers] = useState();
    const [showEditModal, setShowEditModal] = useState(false);

    const [editingUser, setEditingUser] = useState();

    const [editedRole, setEditedRole] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedStatus, setEditedStatus] = useState('');
    const [editedContact, setEditedContact] = useState('');
    const [editedBalance, setEditedBalance] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');

    useEffect(() => {
        Axios.get('/admin/clients')
            .then((res) => setUsers(res.data.users.reverse()))
            .catch((err) => console.log(err));
    }, []);

    const editButtonHandler = (e) => {
        const id = e.target.value;
        const user = users.filter((user) => user.id === +id);

        setEditedRole(user[0].role || '');
        setEditedEmail(user[0].email || '');
        setEditedStatus(user[0].status || '');
        setEditedContact(user[0].contact || '');
        setEditedBalance(user[0].balance || 0.0);
        setEditedLastName(user[0].l_name || '');
        setEditedFirstName(user[0].f_name || '');

        setEditingUser(user[0] || {});
        setShowEditModal(true);
    };

    const eFNChangeHandler = (e) => {
        setEditedFirstName(e.target.value);
        return;
    };

    const eLNChangeHandler = (e) => {
        setEditedLastName(e.target.value);
        return;
    };

    const eEmailChangeHandler = (e) => {
        setEditedEmail(e.target.value);
        return;
    };

    const eBalanceChangeHandler = (e) => {
        setEditedBalance(e.target.value);
        return;
    };

    const eContactChangeHandler = (e) => {
        setEditedContact(e.target.value);
        return;
    };

    const eRoleChangeHandler = (e) => {
        setEditedRole(e.target.value);
        return;
    };

    const eStatusChangeHandler = (e) => {
        setEditedStatus(e.target.value);
        return;
    };

    const handleClose = () => {
        setEditedRole('');
        setEditingUser('');
        setEditedEmail('');
        setEditedStatus('');
        setEditedContact('');
        setEditedBalance(0.0);
        setEditedLastName('');
        setEditedFirstName('');

        setShowEditModal(false);
    };

    const eSubmitHandler = async (e) => {
        e.preventDefault();

        const id = editingUser.id;
        let url = `/admin/client/update/${id}`;
        let newList = users.filter((user) => user.id !== id);
        let userData = {
            id,
            role: editedRole,
            email: editedEmail,
            status: editedStatus,
            contact: editedContact,
            balance: editedBalance,
            l_name: editedLastName,
            f_name: editedFirstName,
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
                                value={editedFirstName}
                                onChange={eFNChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Last Name</label>
                            <input
                                placeholder="Last Name"
                                type="text"
                                className="input"
                                value={editedLastName}
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
                            value={editedEmail}
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
                                value={editedBalance}
                                onChange={eBalanceChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Contact</label>
                            <input
                                placeholder="Contact"
                                className="input"
                                type="number"
                                value={editedContact}
                                onChange={eContactChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="row pt-2">
                        <div className="col-md-6">
                            <label className="input__label">Role</label>
                            <select
                                className="select"
                                value={editedRole}
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
                                value={editedStatus}
                                onChange={eStatusChangeHandler}
                            >
                                <option value="disable">Disable</option>
                                <option value="active">Active</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const deleteButtonHandler = async (e) => {
        const id = e.target.value;

        let url = `/admin/client/delete/${id}`;
        const newList = users.filter((user) => user.id !== +id);

        await Axios.delete(url);
        setUsers([...newList]);
        return;
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
                <title>Users - SMT Panel</title>
            </Helmet>

            {editModal}

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
                        Users
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
}
