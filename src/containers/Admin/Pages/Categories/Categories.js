// jshint esversion:9

import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Modal from 'react-bootstrap/Modal';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Input from '../../../../components/UI/Input/Input';
import Select from '../../../../components/UI/Select/Select';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';

import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import WebsiteDetail from '../../../Context/WebsiteDetailContext';

import 'bootstrap/js/dist/dropdown';
import './categories.scss';

const Categories = () => {
    const [categories, setCategories] = useState();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [newCategoryDetails, setNewCategoryDetails] = useState({
        title: '',
        description: '',
        short: '',
        status: 'active',
    });
    const [editingCategoryDetails, setEditingCategoryDetails] = useState({
        id: '',
        title: '',
        description: '',
        short: '',
        status: '',
    });

    const { websiteName } = useContext(WebsiteDetail);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/categories';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                setCategories(res.data.categories || {});
            })
            .catch((err) => {
                setIsLoading(false);

                // TODO Remove this
                // eslint-disable-next-line no-console
                console.log(err.response);
            });
    }, []);

    // Adding Category
    const handleAddButtonClick = () => {
        setShowAddModal(true);
    };

    const addTitleChangeHandler = (e) => {
        setNewCategoryDetails((preState) => ({
            ...preState,
            title: e.target.value,
        }));
    };

    const addShortChangeHandler = (e) => {
        setNewCategoryDetails((preState) => ({
            ...preState,
            short: e.target.value,
        }));
    };

    const addDescChangeHandler = (e) => {
        setNewCategoryDetails((preState) => ({
            ...preState,
            desc: e.target.value,
        }));
    };

    const addStatusChangeHandler = (e) => {
        setNewCategoryDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const url = '/admin/category/add';
        const cateData = {
            ...newCategoryDetails,
        };

        try {
            const { data } = await Axios.post(url, cateData);

            if (data.status !== 'success') {
                return;
            }

            setCategories((preState) => [
                {
                    ...data.createdCategory,
                },
                ...preState,
            ]);
            setShowAddModal(false);
        } catch (err) {
            // TODO Remove this
            // eslint-disable-next-line no-console
            console.log(err.response.data);
        }
    };

    const handleBackdropClick = () => {
        setShowAddModal(false);
        setNewCategoryDetails({
            title: '',
            short: '',
            description: '',
            status: 'active',
        });
    };

    const addModal = (
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>

            <form onSubmit={formSubmitHandler}>
                <Modal.Body>
                    <Input label="Title" placeholder="Enter title" type="text" value={newCategoryDetails.title} onChange={addTitleChangeHandler} />
                    <Input label="Short" placeholder="Enter short number" type="number" value={newCategoryDetails.short} onChange={addShortChangeHandler} />

                    <div>
                        <label className="input__label">Desc</label>
                        <textarea
                            placeholder="Enter description..."
                            className="input"
                            value={newCategoryDetails.desc || ''}
                            rows={3}
                            onChange={addDescChangeHandler}
                        />
                    </div>

                    <Select
                        label="Status"
                        value={newCategoryDetails.status}
                        onChange={addStatusChangeHandler}
                    >
                        <option value="active">Active</option>
                        <option value="disable">Disable</option>
                    </Select>
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
                        className="btn btn-primary"
                        type="submit"
                        onClick={formSubmitHandler}
                    >
                        Create
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    // Editing Category
    const editButtonHandler = async (e) => {
        setShowEditModal(true);

        const categoryId = +e.target.value;
        const category = await categories.filter(
            (cate) => cate.id === categoryId,
        );

        setEditingCategoryDetails({
            id: category[0].id,
            title: category[0].title,
            description: category[0].description,
            short: category[0].short,
            status: category[0].status,
        });
    };

    const titleChangeHandler = (e) => {
        setEditingCategoryDetails((preState) => ({
            ...preState,
            title: e.target.value,
        }));
    };

    const descChangeHandler = (e) => {
        setEditingCategoryDetails((preState) => ({
            ...preState,
            description: e.target.value,
        }));
    };

    const shortChangeHandler = (e) => {
        setEditingCategoryDetails((preState) => ({
            ...preState,
            short: e.target.value,
        }));
    };

    const statusChangeHandler = (e) => {
        setEditingCategoryDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const handleClose = () => {
        setEditingCategoryDetails({
            id: '',
            title: '',
            description: '',
            short: '',
            status: '',
        });
        setShowEditModal(false);
    };

    const editingSubmitHandler = async (e) => {
        e.preventDefault();

        const { id } = editingCategoryDetails;
        const url = `/admin/category/update/${id}`;
        const newList = await categories.filter((cate) => cate.id !== id);

        try {
            const { data } = await Axios.patch(url, {
                ...editingCategoryDetails,
            });

            if (!data) {
                // TODO Remove this
                // eslint-disable-next-line no-console
                console.log('Failed to update Category!');
            }

            setCategories([
                {
                    ...editingCategoryDetails,
                },
                ...newList,
            ]);
            handleClose();
        } catch (err) {
            // TODO Remove this
            // eslint-disable-next-line no-console
            console.log(err);
        }
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>

            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>

                    <Input label="Title" placeholder="Title" type="text" value={editingCategoryDetails.title} onChange={titleChangeHandler} />

                    <div className="pt-3">
                        <label className="input__label">Description</label>
                        <textarea
                            rows="3"
                            className="input"
                            placeholder="Description..."
                            value={editingCategoryDetails.description}
                            onChange={descChangeHandler}
                        />
                    </div>

                    <Input label="Short" placeholder="Short" type="number" value={editingCategoryDetails.short} onChange={shortChangeHandler} />

                    <Select
                        label="Status"
                        value={editingCategoryDetails.status}
                        onChange={statusChangeHandler}
                    >
                        <option value="disable">Disable</option>
                        <option value="active">Active</option>
                    </Select>
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

    // Delete
    const deleteButtonHandler = async (e) => {
        const id = +e.target.value;
        const url = `/admin/category/delete/${id}`;
        const newList = categories.filter((category) => category.id !== +id);

        try {
            await Axios.delete(url, {
                id,
            });
        } catch (err) {
            // TODO Remove this
            // eslint-disable-next-line no-console
            console.log(err.response.data);
        }

        setCategories([...newList]);
    };

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return (
                    <button
                        type="button"
                        className="btn btn-active btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'disable':
                return (
                    <button
                        type="button"
                        className="btn btn-inactive btn-disabled"
                        disabled
                    >
                        {status}
                    </button>
                );
            default:
                break;
        }
    };

    const categoriesTable = categories && categories.length <= 0 ? (
        <DataNotFound message="Please addd some categories to show here." />
    ) : (
        <Card>
            <Table>
                <THead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Desc</th>
                        <th>Short</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </THead>

                <TBody>
                    {categories
                            && categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.title}</td>
                                    <td>{category.description}</td>
                                    <td>{category.short}</td>

                                    <td>{checkStatus(category.status)}</td>

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
                                                            value={category.id}
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
                                                            value={category.id}
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
                </TBody>
            </Table>
        </Card>
    );

    // TODO
    return (
        <>
            <Helmet>
                <title>
                    Categories -
                    {' '}
                    {websiteName || 'SMT'}
                </title>
            </Helmet>

            {editModal}
            {addModal}
            <Loading show={isLoading} />

            <main className="categories">
                <div className="container">
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
                            Categories
                        </h2>
                        <button
                            type="button"
                            className="add-button"
                            onClick={handleAddButtonClick}
                        >
                            +
                        </button>
                    </div>

                    {categoriesTable}
                </div>
            </main>
        </>
    );
};

export default Categories;
