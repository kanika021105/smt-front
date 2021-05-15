// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Form, FormControl, FormLabel } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './NewOrder.module.css';
import Card from '../../../../components/UI/Card/Card';

const NewOrder = () => {
    let websiteName = process.env.REACT_APP_WEBSITE_NAME;

    const [services, setServices] = useState();
    const [categories, setCategories] = useState();

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const [link, setLink] = useState('');
    const [charge, setCharge] = useState(0.0);
    const [quantity, setQuantity] = useState(0);
    const [selectedService, setSelectedService] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
        let url = '/new-order';

        Axios.get(url).then((res) => {
            let { data } = res;

            if (data.status === 'success') {
                setCategories(data.categories);
                setServices(data.services);
                return;
            }

            setErrorMsg(
                'Something went wrong please try again or contact us if error continue to show.'
            );
            setShowError(true);
            return;
        });
    }, []);

    const servicesByCategory =
        services &&
        services.filter((service) => +service.categoryId === +selectedCategory);

    const selectedCategoryHandler = (e) => {
        setSelectedCategory(e.target.value);
        return;
    };

    const selectedServiceHandler = async (e) => {
        setCharge(0.0);
        setQuantity(0);
        setSelectedService(e.target.value);
        const serviceDetail = await services.filter(
            (service) => +service.id === +e.target.value
        );
        setMin(serviceDetail[0].min);
        setMax(serviceDetail[0].max);
    };

    const linkInputHandler = (e) => {
        setLink(e.target.value);
    };

    const quantityInputHandler = async (e) => {
        let orderQuantity = e.target.value;
        setQuantity(orderQuantity);

        let serviceDetail = await services.filter(
            (service) => +service.id === +selectedService
        );

        let totalAmount = (serviceDetail[0].rate / 1000) * orderQuantity;

        setCharge(totalAmount);
    };

    const orderSubmitHandler = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setShowError(false);

        let url = '/new-order';
        let orderData = {
            link,
            charge,
            quantity,
            service: selectedService,
            category: selectedCategory,
        };

        try {
            let { data } = await Axios.post(url, orderData);
            // console.log(data);

            if (data.status === 'failed') {
                setErrorMsg(data.error);
                setShowError(true);
            }
        } catch (err) {
            // console.log(err.response.data);
        }
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>
                    New Order - {websiteName ? websiteName : 'SMT Panel'}
                </title>
            </Helmet>

            <div className="container pb-5">
                <div className={classes.newOrder}>
                    <h3 className={classes.pageTitle}>New Order</h3>

                    <Card>
                        {showError && (
                            <div className={classes.errorMsg}>
                                <small>{errorMsg}</small>
                            </div>
                        )}

                        <form onSubmit={orderSubmitHandler}>
                            <div>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedCategory}
                                    onChange={selectedCategoryHandler}
                                >
                                    <option defaultValue>
                                        Choose a service
                                    </option>
                                    {categories &&
                                        categories.map((category) => {
                                            return (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.title}
                                                </option>
                                            );
                                        })}
                                </Form.Control>
                            </div>

                            <div>
                                <Form.Label>Services</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedService}
                                    onChange={selectedServiceHandler}
                                >
                                    <option defaultValue>
                                        Choose a Service
                                    </option>
                                    {servicesByCategory &&
                                        servicesByCategory.map((service) => {
                                            return (
                                                <option
                                                    key={service.id}
                                                    value={service.id}
                                                >
                                                    {service.title} -{' '}
                                                    {service.rate}
                                                </option>
                                            );
                                        })}
                                </Form.Control>
                            </div>

                            <div>
                                <FormLabel>Link</FormLabel>
                                <FormControl
                                    type="link"
                                    value={link}
                                    placeholder="https://..."
                                    onChange={linkInputHandler}
                                />
                            </div>

                            <div>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl
                                    type="number"
                                    value={quantity}
                                    placeholder="1000"
                                    onChange={quantityInputHandler}
                                />
                                <div className="row">
                                    <div className="col-md-2 col-sm-2">
                                        <p>Min = {min}</p>
                                    </div>
                                    <div className="col-md-3 col-sm-2">
                                        <p>Max ={max} </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <FormLabel>Total</FormLabel>
                                <button className="btn btn-secondary" disabled>
                                    {charge}
                                </button>
                            </div>

                            <div className="mt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default NewOrder;
