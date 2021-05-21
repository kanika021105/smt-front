// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormLabel } from 'react-bootstrap';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { FiSliders } from 'react-icons/fi';

import Axios from '../../../../axiosIns';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [selectedService, setSelectedService] = useState('');
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
        setMin(0);
        setMax(0);
        setLink('');
        setQuantity(0);
        setCharge(0.0);
        const serviceDetail = await services.filter(
            (service) => +service.id === +e.target.value
        );
        console.log(serviceDetail[0]);
        setSelectedService(serviceDetail[0]);

        if (!serviceDetail[0]) return;

        setMin(serviceDetail[0].min);
        setMax(serviceDetail[0].max);
    };

    const linkInputHandler = (e) => {
        setLink(e.target.value);
    };

    const quantityInputHandler = async (e) => {
        let orderQuantity = e.target.value;
        setQuantity(orderQuantity);

        // let serviceDetail = await services.filter(
        //     (service) => +service.id === +selectedService.id
        // );
        if (!selectedService) return;

        let totalAmount = (selectedService.rate / 1000) * orderQuantity;

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
            service: selectedService.id,
            category: selectedCategory,
        };

        try {
            let { data } = await Axios.post(url, orderData);

            if (data.status === 'failed') {
                setErrorMsg(data.error);
                setShowError(true);
            }
        } catch (err) {
            console.log(err.response.data);
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

                {/* {showError && (
                        <div className="errorMsg">
                            <small>{errorMsg}</small>
                        </div>
                    )} */}

                <div className="row">
                    <div className="col-md-6 u-sm-mb-1">
                        <Card>
                            <form onSubmit={orderSubmitHandler}>
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
                                        value={
                                            selectedService &&
                                            selectedService.id
                                        }
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

                                    <div className="mt-2 ">
                                        Min: {min || 0} / Max:
                                        {max || 0}
                                    </div>
                                </div>

                                <div className="mt-4 pl-2 newOrder__totalAmount">
                                    Total = {charge}
                                </div>

                                <div className="mt-3 newOrder__checkbox">
                                    <input type="checkbox" />
                                    <p>Yeah, I have confirmed my order!</p>
                                </div>

                                <div className="pt-1">
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

                    <div className="col-md-6">
                        <Card>
                            <div className="service__details">
                                <h3 className="service__details__title">
                                    <FiSliders /> Service Details
                                </h3>

                                <div className="pt-2">
                                    <label className="input__label">
                                        Service Title
                                    </label>
                                    <input
                                        className="input "
                                        value={
                                            selectedService &&
                                            selectedService.title
                                        }
                                        disabled
                                    />
                                </div>

                                <div className="row pt-2">
                                    <div className="col-md-4">
                                        <label className="input__label">
                                            Min
                                        </label>
                                        <input
                                            className="input "
                                            value={
                                                selectedService &&
                                                selectedService.min
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="input__label">
                                            Max
                                        </label>
                                        <input
                                            className="input "
                                            value={
                                                selectedService &&
                                                selectedService.max
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="input__label">
                                            Speed
                                        </label>
                                        <input
                                            className="input "
                                            value={
                                                (selectedService &&
                                                    selectedService.speed) ||
                                                ''
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="row pt-2">
                                    <div className="col-md-6 ">
                                        <label className="input__label">
                                            Price
                                        </label>
                                        <input
                                            className="input "
                                            value={
                                                selectedService &&
                                                selectedService.rate
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="input__label">
                                            Average Time
                                        </label>
                                        <input
                                            className="input "
                                            value={
                                                (selectedService &&
                                                    selectedService.avgtime) ||
                                                ''
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <label className="input__label">
                                        Description
                                    </label>
                                    <textarea
                                        className="input "
                                        value={
                                            (selectedService &&
                                                selectedService.desc) ||
                                            ''
                                        }
                                        rows="7"
                                        disabled
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewOrder;
