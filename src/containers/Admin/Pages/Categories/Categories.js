// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Modal from 'react-bootstrap/Modal';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import 'bootstrap/js/dist/dropdown';
import '../../../../sass/pages/admin/categories.scss';

const Categories = () => {
    const [categories, setCategories] = useState();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [short, setShort] = useState('');
    const [status, setStatus] = useState('active');

    const [editedTitle, setEditedTitle] = useState('');
    const [editedDesc, setEditedDesc] = useState('');
    const [editedShort, setEditedShort] = useState('');
    const [editedStatus, setEditedStatus] = useState('');
    const [editingCategory, setEditingCategory] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [addError, setAddError] = useState(false);

    // const [loadingError, setLoadingError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        let url = '/admin/categories';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                setCategories(res.data.categories.reverse() || {});
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.data);
            });
    }, []);

    const handleAddButtonClick = () => {
        setShowAddModal(true);
        return;
    };

    const addTitleChangeHandler = (e) => {
        setTitle(e.target.value);
        return;
    };

    const addShortChangeHandler = (e) => {
        setShort(e.target.value);
        return;
    };

    const addDescChangeHandler = (e) => {
        setDesc(e.target.value);
        return;
    };

    const addStatusChangeHandler = (e) => {
        setStatus(e.target.value);
        return;
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMsg('');
        setAddError(false);

        const url = '/admin/categories/add';
        let cateData = {
            title,
            desc,
            short,
            status,
        };
        let { data } = await Axios.post(url, cateData);

        if (data.status === 'success') {
            setCategories((preState) => [
                { ...data.createdCategory },
                ...preState,
            ]);
            setShowAddModal(false);
            return;
        }

        setErrorMsg(data.error);
        setAddError(true);
        return;
    };

    const handleBackdropClick = () => {
        setShowAddModal(false);

        setTitle('');
        setDesc('');
        setShort('');
        setStatus('');
        setErrorMsg('');
        setAddError(false);

        return;
    };

    const addModal = (
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>

            <form onSubmit={formSubmitHandler}>
                <Modal.Body>
                    <div>
                        <label className="input__label">Title</label>
                        <input
                            className="input"
                            placeholder="Enter title"
                            type="text"
                            value={title || ''}
                            onChange={addTitleChangeHandler}
                        />
                    </div>

                    <div>
                        <label className="input__label">Short</label>
                        <input
                            placeholder="Enter short number"
                            className="input"
                            type="number"
                            value={short || ''}
                            onChange={addShortChangeHandler}
                        />
                    </div>

                    <div>
                        <label className="input__label">Desc</label>
                        <textarea
                            placeholder="Enter description..."
                            className="input"
                            value={desc || ''}
                            rows={3}
                            onChange={addDescChangeHandler}
                        />
                    </div>

                    <div>
                        <label className="input__label">Status</label>
                        <select
                            className="select"
                            value={status}
                            onChange={addStatusChangeHandler}
                        >
                            <option value="disable">Disable</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
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
                        type="submit"
                        onClick={formSubmitHandler}
                    >
                        Create
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const editButtonHandler = async (e) => {
        setShowEditModal(true);

        const categoryId = +e.target.value;
        const category = await categories.filter(
            (cate) => cate.id === categoryId
        );

        setEditedTitle(category[0].title);
        setEditedDesc(category[0].desc);
        setEditedShort(category[0].short);
        setEditedStatus(category[0].status);
        setEditingCategory(category[0]);

        return;
    };

    const titleChangeHandler = (e) => {
        setEditedTitle(e.target.value);
        return;
    };

    const descChangeHandler = (e) => {
        setEditedDesc(e.target.value);
        return;
    };

    const shortChangeHandler = (e) => {
        setEditedShort(e.target.value);
        return;
    };

    const statusChangeHandler = (e) => {
        setEditedStatus(e.target.value);
        return;
    };

    const editingSubmitHandler = async (e) => {
        e.preventDefault();

        const { id } = editingCategory;

        const editingData = {
            title: editedTitle,
            desc: editedDesc,
            short: editedShort,
            status: editedStatus,
        };

        const url = `/admin/category/update/${id}`;
        const newList = await categories.filter((cate) => cate.id !== id);

        const { data } = await Axios.patch(url, { ...editingData });

        if (!data) {
        }

        setCategories((preState) => [
            { id: editingCategory, ...editingData },
            ...newList,
        ]);
        handleClose();
        return;
    };

    const handleClose = () => {
        setShowEditModal(false);

        setEditedTitle('');
        setEditedDesc('');
        setEditedShort('');
        setEditedStatus('');
        setEditingCategory('');
        return;
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>

            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    <div>
                        <label className="input__label">Title</label>
                        <input
                            className="input"
                            placeholder="Title"
                            type="text"
                            value={editedTitle || ''}
                            onChange={titleChangeHandler}
                        />
                    </div>

                    <div className="pt-3">
                        <label className="input__label">Description</label>
                        <textarea
                            rows="3"
                            className="input"
                            placeholder="Description..."
                            value={editedDesc || ''}
                            onChange={descChangeHandler}
                        />
                    </div>

                    <div className="pt-3">
                        <label className="input__label">Short</label>
                        <input
                            className="input"
                            type="number"
                            placeholder="short"
                            value={(editedShort && editedShort) || ''}
                            onChange={shortChangeHandler}
                        />
                    </div>

                    <div className="pt-3">
                        <label className="input__label">Status</label>
                        <select
                            className="select"
                            value={editedStatus || ''}
                            onChange={statusChangeHandler}
                        >
                            <option value="disable">Disable</option>
                            <option value="active">Active</option>
                        </select>
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

    // Delete
    const deleteButtonHandler = async (e) => {
        const id = e.target.value;
        let url = `/admin/category/delete/${id}`;
        const newList = categories.filter((category) => category.id !== +id);

        await Axios.delete(url, { id });
        setCategories([...newList]);
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
                <title>Categories - SMT Panel</title>
            </Helmet>

            {editModal}
            {addModal}
            {<Loading show={isLoading} />}

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
                            </IconContext.Provider>{' '}
                            Categories
                        </h2>
                        <button
                            className="add-button"
                            onClick={handleAddButtonClick}
                        >
                            +
                        </button>
                    </div>

                    <Card>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Desc</th>
                                    <th>Short</th>
                                    <th>Status</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories &&
                                    categories.map((category) => (
                                        <tr key={category.id}>
                                            <td>{category.id}</td>
                                            <td>{category.title}</td>
                                            <td>{category.desc}</td>
                                            <td>{category.short}</td>
                                            <td>
                                                {checkStatus(category.status)}
                                            </td>
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
                                                                        category.id
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
                                                                        category.id
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
            </main>
        </>
    );
};

export default Categories;
