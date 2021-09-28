import React, { useContext, useEffect, useState } from 'react';

import Axios from '../../../../axiosIns';
import Theme from '../../../../store/theme';

import Card from '../../../../components/UI/Card/Card';
import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';

import '../../../../sass/pages/user/services.scss';

function Services() {
    const [services, setServices] = useState();
    const [categories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { darkTheme } = useContext(Theme);

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
            <PageTitle title="Services" />
            <Loading show={isLoading} />

            <div className={darkTheme ? 'dark container Services' : 'container Services'}>
                <PageHeader header="Services" />

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
