/* eslint-disable react/prop-types */

import React from 'react';
// import { injectCheckout } from 'paytm-blink-checkout-react';

function InjectCheckout(props) {
    const { checkoutJsInstance } = props;

    return (
        <div>
            <b>IS CHECKOUT JS INJECTED : </b>
            {Boolean(checkoutJsInstance).toString()}
        </div>
    );
}

// export default injectCheckout(InjectedCheckout);
export default InjectCheckout;
