import React, { useEffect, useState } from 'react';

import Axios from '../../../axiosIns';

function PrivacyPolicy() {
    const [privacy, setPrivacy] = useState('');

    useEffect(() => {
        const url = '/privacy';
        Axios.get(url).then((res) => {
            const value = JSON.parse(res.data[0].value);
            console.log(value);
            const { text } = value.children[0];
            setPrivacy(text);
        });
    });

    return (
        <>
            {privacy}
        </>
    );
}

export default PrivacyPolicy;
