const redux = require('redux');
const createStore = redux.createStore;
const thunkMiddleware = require('redux-thunk').default
const applyMiddleware = redux.applyMiddleware;
const axios = require('axios');

// import { createStore, applyMiddleware } from 'redux';
// // import thunkMiddleware from 'redux-thunk';
// // import { default as thunkMiddleware } from 'redux-thunk';
// import * as thunkMiddleware from 'redux-thunk';
// import axios from 'axios';

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequested = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
} 

const fetchUsersFailure = (error) => {
     return {
        type: FETCH_USERS_FAILED,
        payload: error
     }
}

const reducer = (state = initialState, action ) => {
    // console.log('Action:', action.type, action.payload);
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
        return {
            ...state,
            loading: true
        }
        case FETCH_USERS_SUCCEEDED:
        return {
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILED:
        return {
            loading: false,
            users: [],
            error: action.payload
        }
      default:
        return state;
    }

}

const fetchUsers = () => {
    return async (dispatch, getState) => {
        // console.log('Dispatching fetchUsersRequested action');
        dispatch(fetchUsersRequested());
try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data.map(user => user.id);
    dispatch(fetchUsersSuccess(users));
}
catch (error) {
    dispatch(fetchUsersFailure(error.message));
}

    // // axios.get('https://jsonplaceholder.typicode.com/users')
    // // .then((response) => {
    // //     // console.log('Axios response:', response);
    // //     const users = response.data.map(user => user.id);
    // //     dispatch(fetchUsersSuccess(users));
    // // }).catch((error) => {
    //     // console.log('Axios error:', error);
    //     dispatch(fetchUsersFailure(error.message));
    // })
    }
}

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// const unsubscribe = store.subscribe(() => {
//     console.log(store.getState());
// });

store.subscribe(() => { console.log('Updated State', store.getState())});

store.dispatch(fetchUsers());
// store.dispatch(fetchUsers());
// Identify the issue in the code snippet provided above and select the correct option from the following:
