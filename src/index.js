import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './store/context';

import App from './App';
import './sass/index.scss';

require('dotenv').config();

const app = (
    <ContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContextProvider>
);

ReactDOM.render(app, document.getElementById('app'));
