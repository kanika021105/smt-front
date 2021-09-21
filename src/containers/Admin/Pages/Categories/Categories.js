import React, { useEffect, useReducer } from 'react';

import Axios from '../../../../axiosIns';

import Card from '../../../../components/UI/Card/Card';
import Modal from '../../../../components/UI/Modal/Modal';
import Toast from '../../../../components/UI/Toast/Toast';
import Select from '../../../../components/UI/Select/Select';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import Dropdown from '../../../../components/UI/Dropdown/Dropdown';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

import './categories.scss';

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
        <Modal
            title="Add Category"
            show={state.showAddModal}
            onClose={handleBackdropClick}
        >
            <form onSubmit={formSubmitHandler}>
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
        <Modal
            title="Edit Category"
            show={state.showEditModal}
            onClose={handleClose}
        >
            <form onSubmit={editingSubmitHandler}>
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
                                <Dropdown>
                                    <ul>
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
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    );

    return (
        <>
            <PageTitle title="Categories" />
            <Loading show={state.isLoading} />

            {editModal}
            {addModal}

            <div className="container categories">
                <PageHeader header="Categories" />
                <button
                    type="button"
                    className="add-button"
                    onClick={handleAddButtonClick}
                >
                    +
                </button>

                {categoriesTable}
            </div>
        </>
    );
}

export default Categories;
