// jshint esversion:9
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscListSelection } from 'react-icons/vsc';
import {
    Form,
    // Table,
    Modal,
    Button,
    InputGroup,
    FormControl,
    DropdownButton,
} from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import classes from './Clients.module.css';
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
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <form onSubmit={eSubmitHandler}>
                <Modal.Body>
                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>First Name</label>
                                <FormControl
                                    value={editedFirstName}
                                    onChange={eFNChangeHandler}
                                />
                            </div>

                            <div className="pl-1">
                                <label>Last Name</label>
                                <FormControl
                                    value={editedLastName}
                                    onChange={eLNChangeHandler}
                                />
                            </div>
                        </InputGroup>
                    </div>

                    <div className="pr-2">
                        <label>Email</label>
                        <FormControl
                            value={editedEmail}
                            onChange={eEmailChangeHandler}
                        />
                    </div>

                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>Balance</label>
                                <FormControl
                                    value={editedBalance}
                                    onChange={eBalanceChangeHandler}
                                />
                            </div>

                            <div className="pl-1">
                                <label>Contact</label>
                                <FormControl
                                    value={editedContact}
                                    onChange={eContactChangeHandler}
                                />
                            </div>
                        </InputGroup>
                    </div>

                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>Role</label>
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        value={editedRole}
                                        onChange={eRoleChangeHandler}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>

                            <div className="pl-1">
                                <label>Status</label>
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        value={editedStatus}
                                        onChange={eStatusChangeHandler}
                                    >
                                        <option value="disable">Disable</option>
                                        <option value="active">Active</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </InputGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
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

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Users - SMT Panel</title>
            </Helmet>

            {editModal}

            <div className="container">
                <div className={classes.Clients}>
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
                                            <td>{user.status}</td>
                                            <td>
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                        },
                                                    }}
                                                >
                                                    <DropdownButton
                                                        className={
                                                            classes.dropdownButton
                                                        }
                                                        id="dropdown-item-button"
                                                        title={
                                                            <BsThreeDotsVertical />
                                                        }
                                                    >
                                                        <div>
                                                            <button
                                                                className="btn btn-info"
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                                value={user.id}
                                                                onClick={
                                                                    editButtonHandler
                                                                }
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="btn btn-danger"
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                                value={user.id}
                                                                onClick={
                                                                    deleteButtonHandler
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </DropdownButton>
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
