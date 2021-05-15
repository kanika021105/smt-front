// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
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
import classes from './Services.module.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../../../../components/UI/Card/Card';

export default function Services() {
    const [services, setServices] = useState();
    const [providers, setProviders] = useState();
    const [categories, setCategories] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [min, setMin] = useState(0);
    const [title, setTitle] = useState('');
    const [max, setMax] = useState(0);
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [cateId, setCateId] = useState('');
    const [provider, setProvider] = useState('');
    const [status, setStatus] = useState('active');
    const [dripFeed, setDripFeed] = useState('disable');
    const [apiServiceId, setApiServiceId] = useState('');

    const [editedTitle, setEditedTitle] = useState('');
    const [editedDesc, setEditedDesc] = useState('');
    const [editedApi, setEditedApi] = useState('');
    const [editedMin, setEditedMin] = useState(0);
    const [editedMax, setEditedMax] = useState(0);
    const [editedStatus, setEditedStatus] = useState('');
    const [editedPrice, setEditedPrice] = useState(0);
    const [editedCateId, setEditedCateId] = useState('');
    const [editedDripFeed, setEditedDripFeed] = useState('');
    const [editedApiServiceId, setEditedApiServiceId] = useState('');

    const [editingService, setEditingService] = useState();

    const [errorMsg, setErrorMsg] = useState('');
    const [addError, setAddError] = useState(false);

    useEffect(() => {
        Axios.get('/admin/services')
            .then((res) => {
                let { data } = res;
                setServices(data.services);
                setCategories(data.categories);
                setProviders(data.apiProviders);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAddButtonClick = () => {
        setShowAddModal(true);
        return;
    };

    const addCategoryChangeHandler = (e) => {
        setCateId(e.target.value);
        return;
    };

    const addTitleChangeHandler = (e) => {
        setTitle(e.target.value);
        return;
    };

    const addApiProviderChange = (e) => {
        setProvider(e.target.value);
        return;
    };

    const addApiServiceIdChangeHandler = (e) => {
        setApiServiceId(e.target.value);
        return;
    };

    const addMinChangeHandler = (e) => {
        setMin(e.target.value);
        return;
    };

    const addMaxChangeHandler = (e) => {
        setMax(e.target.value);
        return;
    };

    const addPriceChangeHandler = (e) => {
        setPrice(e.target.value);
        return;
    };

    const addStatusChangeHandler = (e) => {
        setStatus(e.target.value);
        return;
    };

    const addDripFeedChangeHandler = (e) => {
        setDripFeed(e.target.value);
        return;
    };

    const addDescChangeHandler = (e) => {
        setDesc(e.target.value);
        return;
    };

    const addFormSubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMsg('');
        setAddError(false);

        let url = '/admin/service/add';
        const serviceData = {
            title,
            min,
            max,
            desc,
            price,
            status,
            cateId,
            provider,
            dripFeed,
            apiServiceId,
        };

        try {
            const { data } = await Axios.post(url, { ...serviceData });
            if (data.status === 'success') {
                setServices((preState) => [{ ...data.result }, ...preState]);
                setShowAddModal(false);
                return;
            }
        } catch (err) {
            setErrorMsg(err.response.data.message);
            setAddError(true);
            console.log(err.response.data);
            return;
        }
    };

    const handleBackdropClick = () => {
        setErrorMsg('');
        setAddError(false);
        setShowAddModal(false);
        return;
    };

    const addModal = (
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {addError ? (
                        <span className={classes.addError}>{errorMsg}</span>
                    ) : (
                        'Add Service'
                    )}
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={addFormSubmitHandler}>
                <Modal.Body>
                    <div className="pr-2">
                        <label>Category</label>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                value={cateId}
                                onChange={addCategoryChangeHandler}
                            >
                                <option key={0} value={null}>
                                    Choose a service
                                </option>
                                {categories &&
                                    categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.title}
                                        </option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className="pr-2">
                        <label>Title</label>
                        <InputGroup.Prepend>
                            <FormControl
                                value={title}
                                onChange={addTitleChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>

                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>Api Provider</label>
                                <FormControl
                                    value={provider}
                                    onChange={addApiProviderChange}
                                />
                            </div>

                            <div className="pl-1">
                                <label>Api Service Id</label>
                                <FormControl
                                    value={apiServiceId}
                                    onChange={addApiServiceIdChangeHandler}
                                />
                            </div>
                        </InputGroup>
                    </div>

                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>Min</label>
                                <FormControl
                                    value={min}
                                    onChange={addMinChangeHandler}
                                />
                            </div>

                            <div className="pl-1">
                                <label>Max</label>
                                <FormControl
                                    value={max}
                                    onChange={addMaxChangeHandler}
                                />
                            </div>
                        </InputGroup>
                    </div>

                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>Price</label>
                                <FormControl
                                    value={price}
                                    onChange={addPriceChangeHandler}
                                />
                            </div>

                            <div className="pl-1">
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

                            <div className="pl-1">
                                <label>Drip Feed</label>
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        value={dripFeed}
                                        onChange={addDripFeedChangeHandler}
                                    >
                                        <option value="disable">Disable</option>
                                        <option value="active">Active</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </InputGroup>
                    </div>

                    <div>
                        <label>Desc</label>
                        <InputGroup.Prepend>
                            <FormControl
                                as="textarea"
                                value={desc}
                                onChange={addDescChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleBackdropClick}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addFormSubmitHandler}>
                        Submit
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const editButtonHandler = (e) => {
        const id = e.target.value;
        const service = services.filter((service) => service.id === +id);

        setEditedMin(service[0].min || '');
        setEditedTitle(service[0].title || '');
        setEditedMax(service[0].max || '');
        setEditedDesc(service[0].desc || '');
        setEditedPrice(service[0].price || '');
        setEditedStatus(service[0].status || '');
        setEditedApi(service[0].provider || '');
        setEditedCateId(service[0].cateId || '');
        setEditedDripFeed(service[0].dripFeed || '');
        setEditedApiServiceId(service[0].api_service_id || '');

        setShowEditModal(true);
        setEditingService(service[0]);
        return;
    };

    const categoryChangeHandler = (e) => {
        setEditedCateId(e.target.value);
        return;
    };

    const titleChangeHandler = (e) => {
        setEditedTitle(e.target.value);
        return;
    };

    const providerChangeHandler = (e) => {
        setEditedApi(e.target.value);
        return;
    };

    const apiServiceChangeHandler = (e) => {
        setEditedApiServiceId(e.target.value);
        return;
    };

    const minChangeHandler = (e) => {
        setEditedMin(e.target.value);
    };

    const maxChangeHandler = (e) => {
        setEditedMax(e.target.value);
    };

    const priceChangeHandler = (e) => {
        setEditedPrice(e.target.value);
        return;
    };

    const statusChangeHandler = (e) => {
        setEditedStatus(e.target.value);
        return;
    };

    const dripFeedChangeHandler = (e) => {
        setEditedDripFeed(e.target.value);
        return;
    };

    const descChangeHandler = (e) => {
        setEditedDesc(e.target.value);
        return;
    };

    const handleClose = () => {
        setEditedApi('');
        setEditedMin('');
        setEditedTitle('');
        setEditedMax('');
        setEditedDesc('');
        setEditedPrice('');
        setEditedStatus('');
        setEditedCateId('');
        setEditedDripFeed('');
        setEditedApiServiceId('');

        setShowEditModal(false);
        setEditingService(null);
        return;
    };

    const editingSubmitHandler = async () => {
        setShowEditModal(false);

        let url = `admin/service/update/${editingService.id}`;
        let data = {
            min: editedMin,
            title: editedTitle,
            max: editedMax,
            desc: editedDesc,
            price: editedPrice,
            status: editedStatus,
            provider: editedApi,
            cateId: editedCateId,
            dripFeed: editedDripFeed,
            api_service_id: editedApiServiceId,
        };

        let newList = services.filter(
            (service) => service.id !== editingService.id
        );
        let response = await Axios.patch(url, data);

        setServices((preState) => [
            { id: editingService.id, ...data },
            ...newList,
        ]);
        handleClose();
        return;
    };

    // Edit
    const editModal = editingService && (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Service</Modal.Title>
            </Modal.Header>
            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    <div className="pr-2">
                        <label>Category</label>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                value={editedCateId}
                                onChange={categoryChangeHandler}
                            >
                                {categories &&
                                    categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.title}
                                        </option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className="pr-2">
                        <label>Title</label>
                        <InputGroup.Prepend>
                            <FormControl
                                value={editedTitle}
                                onChange={titleChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>

                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>Api Provider</label>
                                <FormControl
                                    value={editedApi}
                                    onChange={providerChangeHandler}
                                />
                            </div>

                            <div className="pl-1">
                                <label>Api Service Id</label>
                                <FormControl
                                    value={editedApiServiceId}
                                    onChange={apiServiceChangeHandler}
                                />
                            </div>
                        </InputGroup>
                    </div>

                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>Min</label>
                                <FormControl
                                    value={editedMin}
                                    onChange={minChangeHandler}
                                />
                            </div>

                            <div className="pl-1">
                                <label>Max</label>
                                <FormControl
                                    value={editedMax}
                                    onChange={maxChangeHandler}
                                />
                            </div>
                        </InputGroup>
                    </div>

                    <div>
                        <InputGroup>
                            <div className="pr-1">
                                <label>Price</label>
                                <FormControl
                                    value={editedPrice}
                                    onChange={priceChangeHandler}
                                />
                            </div>

                            <div className="pl-1">
                                <label>Status</label>
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        value={editedStatus}
                                        onChange={statusChangeHandler}
                                    >
                                        <option value="disable">Disable</option>
                                        <option value="active">Active</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>

                            <div className="pl-1">
                                <label>Drip Feed</label>
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        value={editedDripFeed}
                                        onChange={dripFeedChangeHandler}
                                    >
                                        <option value="deactive">
                                            Disable
                                        </option>
                                        <option value="active">Active</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </InputGroup>
                    </div>

                    <div>
                        <label>Desc</label>
                        <InputGroup.Prepend>
                            <FormControl
                                as="textarea"
                                value={editedDesc}
                                onChange={descChangeHandler}
                            />
                        </InputGroup.Prepend>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editingSubmitHandler}>
                        Submit
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const deleteButtonHandler = async (e) => {
        const id = await e.target.value;
        let url = `/admin/service/delete/${id}`;
        const newList = await services.filter((service) => service.id !== +id);

        try {
            await Axios.delete(url);
        } catch (err) {
            console.log(err.response.data);
        }
        setServices([...newList]);
        return;
    };

    const getProviderName = (provider, apiServiceId) => {
        const providerDetail =
            providers &&
            providers.filter((apiProvider) => apiProvider.id === +provider);

        return (
            <td>
                {providerDetail && providerDetail[0]
                    ? `${providerDetail[0].name} - `
                    : 'Manual'}
                {apiServiceId && apiServiceId}
            </td>
        );
    };

    const getServiceByCategory = (id) => {
        let servicesList =
            services && services.filter((service) => service.categoryId === id);

        return servicesList.map((service) => (
            <tr key={service.id}>
                <td>{service.id}</td>
                <td>
                    {service.title.length > 35
                        ? service.title.slice(0, 35) + '...'
                        : service.title}
                </td>
                {getProviderName(service.provider, service.apiServiceId)}
                <td>
                    {service.min} / {service.max}
                </td>
                <td>{service.rate.toFixed(2)}</td>
                <td>{service.dripFeed}</td>
                <td>{service.status}</td>
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
                            className={classes.dropdownButton}
                            id="dropdown-item-button"
                            title={<BsThreeDotsVertical />}
                        >
                            <div>
                                <button
                                    className="btn btn-info"
                                    style={{
                                        width: '100%',
                                    }}
                                    value={service.id}
                                    onClick={editButtonHandler}
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
                                    value={service.id}
                                    onClick={deleteButtonHandler}
                                >
                                    Delete
                                </button>
                            </div>
                        </DropdownButton>
                    </IconContext.Provider>
                </td>
            </tr>
        ));
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Services - SMT Panel</title>
            </Helmet>

            {editModal}
            {addModal}

            <div className="container">
                <div className={classes.Services}>
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
                            Services
                        </h2>
                        <span className={classes.addButton}>
                            <button onClick={handleAddButtonClick}>+</button>
                        </span>
                    </div>
                    {categories &&
                        categories.map((category) => (
                            <div
                                key={category.id}
                                className={classes.serviceListCard}
                            >
                                <Card>
                                    <h3 className={classes.categoryTitle}>
                                        {category.title}
                                    </h3>
                                    <div className={classes.customTable}>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Title</th>
                                                    <th>
                                                        Provider - Service Id
                                                    </th>
                                                    <th>Min / Max</th>
                                                    <th>Price</th>
                                                    <th>Drip Feed</th>
                                                    <th>Status</th>
                                                    <th>Option</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getServiceByCategory(
                                                    category.id
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
