import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './store/context';
import { ContextProvider as ThemeCtxProvider } from './store/theme';

import App from './App';
import './sass/index.scss';

require('dotenv').config();

const app = (
    <ContextProvider>
        <ThemeCtxProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeCtxProvider>
    </ContextProvider>
);

ReactDOM.render(app, document.getElementById('app'));
