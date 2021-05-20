// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Form, FormControl, FormLabel } from 'react-bootstrap';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/user/NewOrder.scss';
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
                <title>New Order - {websiteName || 'SMT Panel'}</title>
            </Helmet>

            <div className="container newOrder">
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
                    New Order
                </h2>

                <Card>
                    {/* {showError && (
                        <div className="errorMsg">
                            <small>{errorMsg}</small>
                        </div>
                    )} */}

                    <form onSubmit={orderSubmitHandler}>
                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    <label className="input__label">
                                        Category
                                    </label>
                                    <select
                                        class="select"
                                        value={selectedCategory}
                                        onChange={selectedCategoryHandler}
                                    >
                                        <option defaultValue>
                                            Choose a Category
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
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <label className="input__label">
                                        Services
                                    </label>
                                    <select
                                        class="select"
                                        value={selectedService}
                                        onChange={selectedServiceHandler}
                                    >
                                        <option defaultValue>
                                            Choose a Service
                                        </option>
                                        {servicesByCategory &&
                                            servicesByCategory.map(
                                                (service) => {
                                                    return (
                                                        <option
                                                            key={service.id}
                                                            value={service.id}
                                                        >
                                                            {service.title} -{' '}
                                                            {service.rate}
                                                        </option>
                                                    );
                                                }
                                            )}
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <label className="input__label">Link</label>
                                    <input
                                        type="url"
                                        value={link}
                                        className="input"
                                        placeholder="https://..."
                                        onChange={linkInputHandler}
                                    />
                                </div>

                                <div className="pt-2">
                                    <label className="input__label">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={quantity}
                                        className="input"
                                        placeholder="1000"
                                        onChange={quantityInputHandler}
                                    />
                                </div>

                                <div className="pt-2">
                                    <FormLabel>Total = </FormLabel>
                                    <button
                                        className="btn btn-disabled"
                                        disabled
                                    >
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
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default NewOrder;
