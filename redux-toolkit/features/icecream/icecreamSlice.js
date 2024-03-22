const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numOfIcecreams: 20
};

const icecreamSlice = createSlice({
    name: 'icecream',
    initialState,
    reducers: {
        ordered: (state, action) => {
            state.numOfIcecreams -= action.payload;
        },
        restocked: (state, action) => {
            state.numOfIcecreams += action.payload;
        }
    },
    // extraReducers: {
    //     'cake/ordered': (state) => {
    //         state.numOfIcecreams - 1
    //     }
    // }
    extraReducers: (builder) => {
        builder.addCase('cake/ordered', (state) => {
            state.numOfIcecreams -= 1;
        });
    }
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;