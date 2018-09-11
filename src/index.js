import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { Provider } from 'react-redux'
import configureStore from './redux/store';
const store=configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
    , document.getElementById('root'));

if(module.hot){
    module.hot.accept();
}

