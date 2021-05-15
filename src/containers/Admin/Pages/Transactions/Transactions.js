// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import axios from '../../../../axiosIns';
import '../../../../sass/pages/admin/transactions.scss';
import Card from '../../../../components/UI/Card/Card';

export default function Services() {
    const [transactions, setTransactions] = useState();

    useEffect(() => {
        let url = '/admin/transactions';

        axios
            .get(url)
            .then((res) => setTransactions(res.data.transactions.reverse()))
            .catch((err) => console.log(err));
    }, []);

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Transactions - SMT Panel</title>
            </Helmet>

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
}
