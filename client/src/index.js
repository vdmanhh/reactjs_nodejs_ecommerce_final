import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk'
import {Provider} from "react-redux"
import reportWebVitals from './reportWebVitals';
import rootReducer from "./reducer/Index"
import {createStore,compose,applyMiddleware} from 'redux';
import 'antd/dist/antd.css'
import composeWithDevTools from 'redux-devtools-extension'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeWithDevTools,composeEnhancer(applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
