import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/AuthContext';
import { ContextProvider as ThemeCtxProvider } from './store/theme';

import App from './App';
import './sass/index.scss';

require('dotenv').config();

const app = (
    <AuthContextProvider>
        <ThemeCtxProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeCtxProvider>
    </AuthContextProvider>
);

ReactDOM.render(app, document.getElementById('app'));
