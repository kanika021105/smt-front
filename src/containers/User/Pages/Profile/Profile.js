import React from 'react';

import Axios from '../../../../axiosIns';
import AuthContext from '../../../../store/AuthContext';

import Input from '../../../../components/UI/Input/Input';
import Toast from '../../../../components/UI/Toast/Toast';
import PageTitle from '../../../../components/Extra/PageTitle';

function profile() {
    const Ctx = React.useContext(AuthContext);
    const [clientInfo, setClientInfo] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        apiKey: '',
    });

    async function getUserInfo() {
        const url = `/profile/${Ctx.clientId}`;
        const { data } = await Axios.get(url);
        setClientInfo(data.clientInfo);
    }

    React.useEffect(() => {
        getUserInfo();
    }, []);

    async function regenerateKey(e) {
        e.preventDefault();

        try {
            const url = `/profile/${Ctx.clientId}/update/api-key`;
            const { data } = await Axios.get(url);
            setClientInfo((preState) => ({ ...preState, apiKey: data.apiKey }));
            Toast.success('API key updated!');
        } catch (err) {
            Toast.failed(err.response.data.message || 'Failed to update API key!');
        }
    }

    return (
        <>
            <PageTitle title="Profile" />

            <div className="container">
                <Input value={clientInfo.firstName} onChange={() => ''} label="First Name" />
                <Input value={clientInfo.lastName} onChange={() => ''} label="Last Name" />
                <Input value={clientInfo.email} onChange={() => ''} label="Email" />
                <Input value={clientInfo.contact} onChange={() => ''} label="Contact" />

                <form onSubmit={regenerateKey}>
                    <Input value={clientInfo.apiKey} label="API Key" disabled />
                    <button type="submit">Generate new</button>
                </form>

            </div>
        </>
    );
}

export default profile;
