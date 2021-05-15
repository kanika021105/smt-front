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
import classes from './Categories.module.css';
import Card from '../../../../components/UI/Card/Card';

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

    useEffect(() => {
        let url = '/admin/categories';

        Axios.get(url)
            .then((res) => setCategories(res.data.categories.reverse() || {}))
            .catch((err) => console.log(err.response.data));
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
        /* jshint ignore:start */
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {addError ? (
                        <span className={classes.addError}>{errorMsg}</span>
                    ) : (
                        'Add Category'
                    )}
                </Modal.Title>
            </Modal.Header>

            <form onSubmit={formSubmitHandler}>
                <Modal.Body>
                    <div className="pr-2">
                        <label>Title</label>
                        <InputGroup.Prepend>
                            <FormControl
                                placeholder="Enter title..."
                                value={title || ''}
                                onChange={addTitleChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>

                    <div className="pr-2">
                        <label>Short</label>
                        <InputGroup.Prepend>
                            <FormControl
                                type="number"
                                value={short || ''}
                                onChange={addShortChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>

                    <div className="pr-2">
                        <label>Desc</label>
                        <InputGroup.Prepend>
                            <FormControl
                                as="textarea"
                                value={desc || ''}
                                onChange={addDescChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>

                    <div className="pr-2">
                        <label>Status</label>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={addStatusChangeHandler}
                            >
                                <option value="disable">Disable</option>
                                <option value="active">Active</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleBackdropClick}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
        /* jshint ignore:end */
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
        /* jshint ignore:start */
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    <div className="pr-2">
                        <label>Title</label>
                        <InputGroup.Prepend>
                            <FormControl
                                value={(editedTitle && editedTitle) || ''}
                                onChange={titleChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>

                    <div className="pr-2">
                        <label>Desc</label>
                        <InputGroup.Prepend>
                            <FormControl
                                as="textarea"
                                row="3"
                                value={(editedDesc && editedDesc) || ''}
                                onChange={descChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>

                    <div className="pr-2">
                        <label>Short</label>
                        <InputGroup.Prepend>
                            <FormControl
                                value={(editedShort && editedShort) || ''}
                                onChange={shortChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>

                    <div className="pr-2">
                        <label>Status</label>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                value={(editedStatus && editedStatus) || ''}
                                onChange={statusChangeHandler}
                            >
                                <option value="disable">Disable</option>
                                <option value="active">Active</option>
                            </Form.Control>
                        </Form.Group>
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
        /* jshint ignore:end */
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

    // TODO Change title to dynamic
    return (
        /* jshint ignore:start */
        <>
            <Helmet>
                <title>Categories - SMT Panel</title>
            </Helmet>

            {editModal}
            {addModal}

            <div className="container">
                <div className={classes.Categories}>
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
                        <span className={classes.addButton}>
                            <button
                                className="btn btn-primary font-weight-bold"
                                onClick={handleAddButtonClick}
                            >
                                +
                            </button>
                        </span>
                    </div>

                    <Card>
                        <table striped bordered hover responsive size="sm">
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
                                            <td>{category.status}</td>
                                            <td>
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                            padding: 'auto',
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
                                                                value={
                                                                    category.id
                                                                }
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
                                                                value={
                                                                    category.id
                                                                }
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
        /* jshint ignore:end */
    );
};

export default Categories;
