// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscListSelection } from 'react-icons/vsc';
import { Form, Modal, Button, DropdownButton } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/admin/apiServices.scss';
import Card from '../../../../components/UI/Card/Card';

const ApiServices = () => {
    const { id } = useParams();

    const [services, setServices] = useState();
    const [categories, setCategories] = useState();
    const [profitMargin, setProfitMargin] = useState(10);

    const [selectedService, setSelectedService] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const url = `/admin/api-provider/service-list/${id}`;
        Axios.get(url)
            .then((res) => {
                const { data } = res;

                setServices(data.services);
                setCategories(data.categories);
            })
            .catch((err) => console.log(err.response.data.message));
    }, [id]);

    const addButtonHandler = async (e) => {
        setShowAddModal(true);
        const serviceId = e.target.value;

        const service = await services.filter(
            (ser) => ser.service === serviceId
        );

        console.log(service);
        setSelectedService({
            description: service[0].desc,
            dripFeed: +service[0].dripfeed,
            max: +service[0].max,
            min: +service[0].min,
            title: service[0].name,
            apiServiceId: +service[0].service,
            rate: +service[0].rate,
            refill: service[0].refill,
        });
        return;
    };

    const handleClose = (e) => {
        setShowAddModal(false);

        setSelectedService('');
        return;
    };

    const titleChangeHandler = (e) => {
        setSelectedService((preState) => ({
            ...preState,
            title: e.target.value,
        }));
        return;
    };

    const categoryChangeHandler = (e) => {
        const value = +e.target.value;
        setSelectedService((preState) => ({
            ...preState,
            categoryId: value,
        }));
    };

    const minChangeHandler = (e) => {
        const value = +e.target.value;
        setSelectedService((preState) => ({
            ...preState,
            min: value,
        }));
    };

    const maxChangeHandler = (e) => {
        const value = +e.target.value;
        setSelectedService((preState) => ({
            ...preState,
            max: value,
        }));
    };

    const profitMarginChangeHandler = (e) => {
        setProfitMargin(+e.target.value);
    };

    const descChangeHandler = (e) => {
        setSelectedService((preState) => ({
            ...preState,
            description: e.target.value,
        }));
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const serviceData = { ...selectedService, profitMargin, provider: +id };
        const url = '/admin/api-provider/service/add';
        try {
            Axios.post(url, serviceData);
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    const percentageCount = () => {
        const countList = [];
        let count = 0;
        while (count <= 500) {
            countList.push(count);
            count++;
        }
        return countList;
    };

    const counter = percentageCount();
    const editModal = (
        <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>
            <form onSubmit={formSubmitHandler}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="label">Title</Form.Label>
                        <Form.Control
                            placeholder="Title"
                            value={selectedService.title || ''}
                            onChange={titleChangeHandler}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="label">Category</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={categoryChangeHandler}
                        >
                            <option>Choose a category</option>
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

                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <Form.Group>
                                <Form.Label className="label">Min</Form.Label>
                                <Form.Control
                                    value={selectedService.min || 0}
                                    onChange={minChangeHandler}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <Form.Group>
                                <Form.Label className="label">Max</Form.Label>
                                <Form.Control
                                    value={selectedService.max || 0}
                                    onChange={maxChangeHandler}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <Form.Group>
                                <Form.Label className="label">Price</Form.Label>
                                <Form.Control
                                    placeholder="Price"
                                    type="number"
                                    value={selectedService.rate || 0}
                                    disabled
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <Form.Group>
                                <Form.Label className="label">
                                    Price increase in (%)
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={profitMargin}
                                    onChange={profitMarginChangeHandler}
                                >
                                    {counter &&
                                        counter.map((count) => (
                                            <option key={count} value={count}>
                                                {`${count}%`}
                                            </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group>
                        <Form.Label className="label">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="5"
                            value={selectedService.description || ''}
                            onChange={descChangeHandler}
                        />
                    </Form.Group>
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

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Api Services - SMT Panel</title>
            </Helmet>

            {editModal}

            <div className="container">
                <div className="apiServices">
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
                        Services From Api
                    </h2>
                    <Card>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Min/Max</th>
                                    <th>Price</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services &&
                                    services.map((service) => (
                                        <tr key={service.service}>
                                            <td>{service.service}</td>
                                            <td>{service.category}</td>
                                            <td>{service.name}</td>
                                            <td>{`${service.min} / ${service.max}`}</td>
                                            <td>{service.rate}</td>
                                            <td>
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                        },
                                                    }}
                                                >
                                                    <DropdownButton
                                                        className="dropdownButton"
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
                                                                    service.service
                                                                }
                                                                onClick={
                                                                    addButtonHandler
                                                                }
                                                            >
                                                                Edit
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
};

export default ApiServices;
