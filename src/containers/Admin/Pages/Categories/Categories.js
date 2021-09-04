import React, {
    useContext, useEffect, useReducer, lazy,
} from 'react';
import { Helmet } from 'react-helmet';

import Modal from 'react-bootstrap/Modal';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Loading from '../../../../components/UI/Loading/Loading';
import AuthContext from '../../../../store/AuthContext';
import Axios from '../../../../axiosIns';

import 'bootstrap/js/dist/dropdown';
import './categories.scss';

import Button from '../../../../components/UI/Button/Button';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Toast from '../../../../components/UI/Toast/Toast';

const Card = lazy(() => import('../../../../components/UI/Card/Card'));
const Select = lazy(() => import('../../../../components/UI/Select/Select'));
const Textarea = lazy(() => import('../../../../components/UI/Textarea/Textarea'));
const DataNotFound = lazy(() => import('../../../../components/UI/DataNotFound/DataNotFound'));

// Reducer function to update state
function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: !state.isLoading,
            };

        case 'setCategory':
            return {
                ...state,
                categories: [...action.payload],
            };

        case 'addModal':
            return {
                ...state,
                showAddModal: !state.showAddModal,
            };

        case 'newCategory':
            return {
                ...state,
                newCategory: { ...state.newCategory, ...action.payload },
            };

        case 'updateCategoriesList':
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };

        case 'clearAddCategory':
            return {
                ...state,
                newCategory: {
                    title: '',
                    description: '',
                    short: '',
                    status: 'active',
                },
            };

        case 'editModal':
            return { ...state, showEditModal: !state.showEditModal };

        case 'editCategory':
            return {
                ...state,
                editingCategory: { ...action.payload },
            };

        case 'editingDetails':
            return {
                ...state,
                editingCategory: {
                    ...state.editingCategory,
                    ...action.payload,
                },
            };

        case 'clearEditingCategory':
            return {
                ...state,
                editingCategory: {
                    id: '',
                    title: '',
                    description: '',
                    short: '',
                    status: '',
                },
            };

        case 'editCategoriesList':
            return {
                ...state,
                categories: [action.payload, ...action.newList],
            };

        case 'deleteCategory':
            return {
                ...state,
                categories: [...action.newList],
            };

        default:
            return { ...state };
    }
}

function Categories() {
    const { websiteName } = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, {
        isLoading: false,
        showAddModal: false,
        showEditModal: false,
        categories: '',
        newCategory: {
            title: '',
            description: '',
            short: '',
            status: 'active',
        },
        editingCategory: {
            id: '',
            title: '',
            description: '',
            short: '',
            status: '',
        },
    });

    useEffect(() => {
        dispatch({ type: 'loading' });
        const url = '/admin/categories';
        Axios.get(url)
            .then((res) => {
                dispatch({ type: 'loading' });
                dispatch({ type: 'setCategory', payload: res.data.categories });
            })
            .catch((err) => {
                dispatch({ type: 'loading' });
                Toast.failed(err.response.message);
            });
    }, []);

    // Open Add Category Modal
    function handleAddButtonClick() {
        dispatch({ type: 'addModal' });
    }

    // Update title of new category details
    function addTitleChangeHandler(e) {
        dispatch({ type: 'newCategory', payload: { title: e.target.value } });
    }

    // Update short number of new category details
    function addShortChangeHandler(e) {
        dispatch({ type: 'newCategory', payload: { short: e.target.value } });
    }

    // Update description of new category details
    function addDescChangeHandler(e) {
        dispatch({ type: 'newCategory', payload: { description: e.target.value } });
    }

    // Update status of new category details
    function addStatusChangeHandler(e) {
        dispatch({ type: 'newCategory', payload: { status: e.target.value } });
    }

    // Handle form submission of create and update category list on website
    async function formSubmitHandler(e) {
        e.preventDefault();

        const url = '/admin/category/add';
        const categoryData = { ...state.newCategory };

        try {
            const { data } = await Axios.post(url, categoryData);
            dispatch({ type: 'addModal' });
            dispatch({ type: 'updateCategoriesList', payload: { ...data.createdCategory } });
            Toast.success('Category created!');
        } catch (err) {
            Toast.failed(err.response.data.message || 'Failed to add category!');
        }
    }

    // Handle modal close from different method and clear data from add modal inputs
    function handleBackdropClick() {
        dispatch({ type: 'addModal' });
        dispatch({ type: 'clearAddCategory' });
    }

    // Add Modal codes
    const addModal = (
        <Modal show={state.showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>

            <form onSubmit={formSubmitHandler}>
                <Modal.Body>
                    <Input
                        label="Title"
                        placeholder="Enter title"
                        type="text"
                        value={state.newCategory.title}
                        onChange={addTitleChangeHandler}
                    />

                    <InputGroup>
                        <Input
                            label="Short"
                            placeholder="Enter short number"
                            type="number"
                            value={state.newCategory.short}
                            onChange={addShortChangeHandler}
                        />
                        <Select
                            label="Status"
                            value={state.newCategory.status}
                            onChange={addStatusChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="disable">Disable</option>
                        </Select>
                    </InputGroup>

                    <Textarea
                        label="Description"
                        placeholder="Enter description..."
                        value={state.newCategory.description || ''}
                        rows={4}
                        onChange={addDescChangeHandler}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary
                        type="button"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </Button.ModalSecondary>

                    <Button.ModalPrimary
                        type="submit"
                        onClick={formSubmitHandler}
                    >
                        Create
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    // Editing Category
    async function editButtonHandler(e) {
        dispatch({ type: 'editModal' });

        const categoryId = e.target.value;
        const category = await state.categories.filter((cate) => cate.id === categoryId);
        const {
            id, title, description, short, status,
        } = category[0];
        dispatch({
            type: 'editCategory',
            payload: {
                id, title, description, short, status,
            },
        });
    }

    // Saving changes for title in state data
    function titleChangeHandler(e) {
        dispatch({ type: 'editingDetails', payload: { title: e.target.value } });
    }

    // Saving changes for description in state data
    function descChangeHandler(e) {
        dispatch({ type: 'editingDetails', payload: { description: e.target.value } });
    }

    // Saving changes for short in state data
    function shortChangeHandler(e) {
        dispatch({ type: 'editingDetails', payload: { short: e.target.value } });
    }

    // Saving changes for status in state data
    function statusChangeHandler(e) {
        dispatch({ type: 'editingDetails', payload: { status: e.target.value } });
    }

    // Handle edit modal close
    function handleClose() {
        dispatch({ type: 'clearEditingCategory' });
        dispatch({ type: 'editModal' });
    }

    // Handling form submission for edit Modal
    async function editingSubmitHandler(e) {
        e.preventDefault();

        const { id } = state.editingCategory;
        const url = `/admin/category/update/${id}`;
        const newList = await state.categories.filter((cate) => cate.id !== id);

        try {
            await Axios.patch(url, { ...state.editingCategory });
            dispatch({
                type: 'editCategoriesList',
                payload: { ...state.editingCategory },
                newList,
            });

            handleClose();
            Toast.success('Category update!');
        } catch (err) {
            Toast.failed(err.response.message || 'Something went wrong!');
        }
    }

    // Edit Modal code
    const editModal = (
        <Modal show={state.showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>

            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>

                    <Input
                        label="Title"
                        placeholder="Title"
                        type="text"
                        value={state.editingCategory.title}
                        onChange={titleChangeHandler}
                    />

                    <InputGroup>
                        <Input
                            label="Short"
                            placeholder="Short"
                            type="number"
                            value={state.editingCategory.short}
                            onChange={shortChangeHandler}
                        />

                        <Select
                            label="Status"
                            value={state.editingCategory.status}
                            onChange={statusChangeHandler}
                        >
                            <option value="disable">Disable</option>
                            <option value="active">Active</option>
                        </Select>
                    </InputGroup>

                    <Textarea
                        label="Description"
                        rows={4}
                        placeholder="Description..."
                        value={state.editingCategory.description}
                        onChange={descChangeHandler}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary
                        type="button"
                        onClick={handleClose}
                    >
                        Close
                    </Button.ModalSecondary>

                    <Button.ModalPrimary
                        type="submit"
                    >
                        Submit
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    // Delete functionality
    async function deleteButtonHandler(e) {
        const id = e.target.value;
        const url = `/admin/category/delete/${id}`;
        const newList = state.categories.filter((category) => category.id !== id);

        try {
            await Axios.delete(url, { id });
            dispatch({ type: 'deleteCategory', newList });
            Toast.warning(`Category "${id}" deleted!`);
        } catch (err) {
            Toast.failed(err.response.message);
        }
    }

    // Check status and return button for the status
    function checkStatus(status) {
        switch (status) {
            case 'active':
                return <Button.Active />;

            case 'disable':
                return <Button.Disable />;

            default:
                return Toast.failed('Something went wrong!');
        }
    }

    // Categories Table check for categories data show table or empty page accordingly
    const categoriesTable = state.categories && state.categories.length <= 0 ? (
        <DataNotFound message="Please addd some categories to show here." />
    ) : (
        <Card>
            <Table>
                <THead>
                    <tr>
                        <th>Title</th>
                        <th>Desc</th>
                        <th>Short</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </THead>

                <TBody>
                    {state.categories.length >= 1 && state.categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.title}</td>
                            <td>{category.description}</td>
                            <td>{category.short}</td>
                            <td>{category.status && checkStatus(category.status)}</td>
                            <td>
                                <IconContext.Provider value={{ style: { fontSize: '30px', padding: 'auto' } }}>
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
                                                <Button.Edit
                                                    value={category.id}
                                                    onClick={editButtonHandler}
                                                />
                                            </li>

                                            <li>
                                                <Button.Delete
                                                    value={category.id}
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
                    Categories -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            {editModal}
            {addModal}
            <Loading show={state.isLoading} />

            <div className="container categories">
                <div>
                    <h2 className="pageTitle">
                        <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
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
        </>
    );
}

export default Categories;
