// jshint esversion:9

import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import '../../../../sass/pages/admin/transactions.scss';

const Transactions = () => {
    const [transactions, setTransactions] = useState();

    const { websiteName } = useContext(WebsiteDetail);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/transactions';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                setTransactions(res.data.transactions);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.msg);
            });
    }, []);

    // TODO
    return (
        <>
            <Helmet>
                <title>Transactions - {websiteName || 'SMT'}</title>
            </Helmet>

            {<Loading show={isLoading} />}

            <div className="container">
                <div className="Transactions">
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
                        Transactions
                    </h2>

                    <Card>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Transaction Id</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions &&
                                    transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.id}</td>
                                            <td>{transaction.email}</td>
                                            <td>{transaction.transactionId}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.paymentMethod}</td>
                                            <td>
                                                <button
                                                    className={
                                                        'btn btn-success btn-disabled'
                                                    }
                                                    disabled
                                                >
                                                    {transaction.status}
                                                </button>
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

export default Transactions;
