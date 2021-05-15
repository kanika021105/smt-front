// jshint esversion:9

import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
require('dotenv').config();

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('app'));
