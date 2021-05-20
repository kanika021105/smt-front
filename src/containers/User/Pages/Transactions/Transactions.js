// jshint esversion: 9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/user/transactions.scss';
import Card from '../../../../components/UI/Card/Card';

export default function Services() {
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const [transactions, setTransactions] = useState();

    useEffect(() => {
        let url = '/transactions';
        Axios.get(url)
            .then((res) => {
                let { data } = res;

                if (data.status === 'success') {
                    setErrorMsg('');
                    setShowError(false);
                    setTransactions(data.transactions.reverse());

                    return;
                }

                setErrorMsg(
                    'Failed to load transactions please try again or contact support team.'
                );
                setShowError(true);
            })
            .catch((err) => console.log(err));
    }, []);

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Transactions - SMT Panel</title>
            </Helmet>

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
                    </IconContext.Provider>{' '}
                    Services
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
                                                className="btn btn-success btn-disabled"
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
        </>
    );
}
