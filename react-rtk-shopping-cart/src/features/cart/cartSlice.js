import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
};

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },
        increase: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload);
            cartItem.amount = cartItem.amount + 1;

        },
        decrease: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload);
            cartItem.amount = cartItem.amount - 1;
            
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCartItems.fulfilled, (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        })
        builder.addCase(getCartItems.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

// console.log(cartSlice);

export default cartSlice.reducer;
export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;