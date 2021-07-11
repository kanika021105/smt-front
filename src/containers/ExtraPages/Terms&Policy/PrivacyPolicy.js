import React, { useEffect, useState } from 'react';

import Axios from '../../../axiosIns';

function PrivacyPolicy() {
    const [privacy, setPrivacy] = useState('');

    useEffect(() => {
        const url = '/privacy';
        Axios.get(url).then((res) => {
            const value = JSON.parse(res.data[0].value);
            if (value) {
                setPrivacy(value.children[0].text);
            }
        });
    });

    return (
        <>
            {privacy}
            Privacy Page
        </>
    );
}

export default PrivacyPolicy;
