const redux = require('redux');
const createStore = redux.createStore;
// imer is a library that allows us to update the state in an immutable way
// imer handles the immutability of the state for us through the use of the produce function
const imer = require('imer');
// produce is used to update the state in an immutable way
// produce takes the current state and a function that updates the state
// produce returns the new state
const produce = imer.produce;

const initialState = {
    name: 'Baqar',
    address: {
        street: '123 Main St',
        city: 'Karachi',
        state: 'NA',
        country: 'Pakistan'     
    }
}

const STREET_UPDATED = 'STREET_UPDATED';

function updateStreet(newStreet) {
    return {
        type: STREET_UPDATED,
        payload: newStreet
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, draftState => {
                draftState.address.street = action.payload;
            })
        default:
            return state;
    }
};

const store = createStore(reducer);

console.log('Initial State', store.getState());



const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState());
});

store.dispatch(updateStreet('456 Elm St'));

unsubscribe();