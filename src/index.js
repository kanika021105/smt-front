// jshint esversion:9

import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';

import App from './App';
import './sass/index.scss';

require('dotenv').config();

const app = (
    <AuthContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthContextProvider>
);

ReactDOM.render(app, document.getElementById('app'));
