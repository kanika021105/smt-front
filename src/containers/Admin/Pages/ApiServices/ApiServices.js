// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import Modal from 'react-bootstrap/Modal';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import 'bootstrap/js/dist/dropdown';
import '../../../../sass/pages/admin/apiServices.scss';

const ApiServices = () => {
    const { id } = useParams();

    const [services, setServices] = useState();
    const [categories, setCategories] = useState();
    const [profitMargin, setProfitMargin] = useState(10);

    const [selectedService, setSelectedService] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = `/admin/api-provider/service-list/${id}`;
        Axios.get(url)
            .then((res) => {
                const { data } = res;

                setServices(data.services);
                setCategories(data.categories);

                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.data.message);
            });
    }, [id]);

    const addButtonHandler = async (e) => {
        setShowAddModal(true);
        const serviceId = e.target.value;

        const service = await services.filter(
            (ser) => ser.service === serviceId
        );

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
    const addUpdateModal = (
        <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>

            <form onSubmit={formSubmitHandler}>
                <Modal.Body>
                    <div>
                        <label className="input__label">Title</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Title"
                            value={selectedService.title || ''}
                            onChange={titleChangeHandler}
                            required
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">Category</label>
                        <select
                            className="select"
                            value={selectedService.categoryId}
                            onChange={categoryChangeHandler}
                            required
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
                        </select>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label className="input__label">
                                Minimum Quantity
                            </label>
                            <input
                                className="input"
                                type="number"
                                placeholder="Minimum"
                                value={selectedService.min || 0}
                                onChange={minChangeHandler}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">
                                Maximum Quantity
                            </label>
                            <input
                                className="input"
                                type="number"
                                placeholder="Maximum"
                                value={selectedService.max || 0}
                                onChange={maxChangeHandler}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label className="input__label">Price</label>
                            <input
                                className="input input--disabled"
                                placeholder="Price"
                                type="number"
                                value={selectedService.rate || 0}
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">
                                Price increase in (%)
                            </label>
                            <select
                                className="select"
                                value={profitMargin}
                                onChange={profitMarginChangeHandler}
                            >
                                {counter &&
                                    counter.map((count) => (
                                        <option key={count} value={count}>
                                            {`${count}%`}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-2">
                        <label className="input__label">Description</label>
                        <textarea
                            className="input"
                            rows="4"
                            placeholder="Description..."
                            value={selectedService.description || ''}
                            onChange={descChangeHandler}
                        />
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

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Api Services - SMT Panel</title>
            </Helmet>

            {addUpdateModal}
            {<Loading show={isLoading} />}

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
                                                                    Add/Update
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

export default ApiServices;
