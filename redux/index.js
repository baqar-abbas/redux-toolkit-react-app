const redux = require('redux');
const createStore = redux.createStore;
// bindActionCreators is used to bind the action creators to the dispatch function
const bindActionCreators = redux.bindActionCreators;
// combineReducers is used to combine the reducers
// combineReducers returns a single reducer function
// combineReducers is used to combine the reducers into a single reducer function
const combineReducers = redux.combineReducers;

// applyMiddleware is used to apply the middleware to the store
// applyMiddleware returns a store enhancer
// applyMiddleware is used to extend the functionality of the store
const applyMiddleware = redux.applyMiddleware;

// redux-logger is a middleware that logs the actions and the state changes
// Middleware is a piece of code that runs between the action and the reducer
// Middleware is used to extend the functionality of the store
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const RESTOCK_CAKE = 'RESTOCK_CAKE';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const RESTOCK_ICECREAM = 'RESTOCK_ICECREAM';

function orderCake() {
return {
    type: CAKE_ORDERED,
    payload: 1
}
}

function restockCake(qty = 1) {
return {
    type: RESTOCK_CAKE,
    payload: qty
}
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty=1) {
    return {
        type: RESTOCK_ICECREAM,
        payload: qty
    }
}

// (prevState, action) => newState

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// };

// Defining the initial state for the cake reducer
const initialCakeState = {
    numOfCakes: 10
}

// Defining the initial state for the ice cream reducer
const initialIceCreamState = {
    numOfIceCreams: 20
}

// Reducer function for the cake
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload
            }
        case RESTOCK_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}

// Reducer function for the ice cream
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
         case ICECREAM_ORDERED:
            return {
                    ...state,
                    numOfIceCreams: state.numOfIceCreams - action.payload
                }
         case RESTOCK_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
         case CAKE_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state;
    }
}

// combineReducers is used to combine the reducers
// combineReducers returns a single reducer function
// combineReducers is used to combine the reducers into a single reducer function
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

// createStore() is used to create a redux store
// createStore() takes a rootReducer as an argument
// createStore() returns a redux store which holds the state tree
// applyMiddleware() is used to apply the middleware to the store
// applyMiddleware() returns a store enhancer
// applyMiddleware() is used to extend the functionality of the store and apply the middleware
// logger is a middleware that logs the actions and the state changes
const store = createStore(rootReducer, applyMiddleware(logger));

// store.getState() returns the current state of the store
console.log('Initial state:', store.getState());

// store.subscribe() listens to the changes in the store and returns a function to unsubscribe
// store.subscribe() listens to the changes and runs the callback function whenever the state changes
const unsubscribe = store.subscribe(() => {});

// store.dispatch() is used to dispatch an action to the store
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch() is used to dispatch an action to the store
// store.dispatch(restockCake(3));

// bindActionCreators is used to bind the action creators to the dispatch function
// bindActionCreators returns an object with the action creators bound to the dispatch function
// can be used to dispatch the actions directly without using store.dispatch()
const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);

// actions.orderCake() is used to dispatch the orderCake action to the store
actions.orderCake();
actions.orderCake();
actions.orderCake();

// actions.orderIceCream() is used to dispatch the orderIceCream action to the store
actions.orderIceCream(2);
actions.orderIceCream(3);

// actions.restockIceCream() is used to dispatch the restockIceCream action to the store
actions.restockIceCream(5);


// actions.restockCake() is used to dispatch the restockCake action to the store
actions.restockCake(3);


// unsubscribe() is used to unsubscribe the store
// unsubscribe() is used to stop listening to the changes in the store
unsubscribe();

// store.dispatch() is used to dispatch an action to the store
// store.dispatch(orderCake());