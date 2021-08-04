import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {reducer} from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    )