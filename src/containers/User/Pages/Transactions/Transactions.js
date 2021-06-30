import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';

import WebsiteDetail from '../../../Context/WebsiteDetailContext';

import '../../../../sass/pages/user/transactions.scss';

export default function Services() {
    const [transactions, setTransactions] = useState();

    const { websiteName } = useContext(WebsiteDetail);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/transactions';
        Axios.get(url)
            .then((res) => {
                const { data } = res;

                if (data.status !== 'success') return;

                setIsLoading(false);
                setTransactions(data.transactions);
            })
            .catch((err) => console.log(err));
    }, []);

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>
                    Transactions -
                    {' '}
                    {websiteName || 'SMT'}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            <div className="container Transactions">
                <h2 className="pageTitle">
                    <IconContext.Provider
                        value={{
                            style: {
                                fontSize: '30px',
                            },
                        }}
                    >
                        <VscListSelection />
                    </IconContext.Provider>
                    {' '}
                    Services
                </h2>

                <Card>
                    <Table>
                        <THead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                            </tr>
                        </THead>

                        <TBody>
                            {transactions
                                && transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.email}</td>
                                        <td>{transaction.transactionId}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.paymentMethod}</td>
                                        <td>
                                            {transaction.status === 'success'
                                            && (
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-disabled"
                                                    disabled
                                                >
                                                    {transaction.status}
                                                </button>
                                            )}

                                            {transaction.status === 'failed'
                                            && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-disabled"
                                                    disabled
                                                >
                                                    {transaction.status}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </TBody>
                    </Table>
                </Card>
            </div>
        </>
    );
}
