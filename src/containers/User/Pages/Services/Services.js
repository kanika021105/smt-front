import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import Loading from '../../../../components/UI/Loading/Loading';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Context from '../../../../store/context';

import '../../../../sass/pages/user/services.scss';

function Services() {
    const [services, setServices] = useState();
    const [categories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { websiteName } = useContext(Context);

    useEffect(() => {
        setIsLoading(false);

        const url = '/services';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);
                const { data } = res;
                setServices(data.services);
                setCategories(data.categories);
            })
            .catch((err) => {
                Toast.failed(err.response.data.message);
            });
    }, []);

    const getServiceByCateId = (cateId) => {
        const servicesList = services
            && services.filter((service) => service.categoryId === cateId);

        return servicesList.map((service) => (
            <tr key={service.id}>
                <td>{service.id}</td>
                <td>
                    {service.title.length > 35 ? `${service.title.slice(0, 35)}...` : service.title}
                </td>
                <td>{`${service.min} / ${service.max}`}</td>
                <td>{service.rate.toFixed(2)}</td>
                <td>{service.dripFeed}</td>
                <td><Button.Active /></td>
            </tr>
        ));
    };

    return (
        <>
            <Helmet>
                <title>
                    Services -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            <div className="container Services">
                <h2 className="pageTitle">
                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                        <VscListSelection />
                    </IconContext.Provider>
                    {' '}
                    Services
                </h2>

                {categories && categories.map((category) => (
                    <div className="serviceListCard" key={category.id}>
                        <Card>
                            <h3 className="categoryTitle ">
                                {category.title}
                            </h3>

                            <Table>
                                <THead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Min / Max</th>
                                        <th>Price</th>
                                        <th>Drip Feed</th>
                                        <th>Status</th>
                                    </tr>
                                </THead>

                                <TBody>
                                    {getServiceByCateId(category.id)}
                                </TBody>
                            </Table>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Services;
