import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const {name, cost, image, quantity} = action.payload
        const existingItem = state.items.find(item=>item.name === name);
        if(existingItem){
            existingItem.quantity++;            
        } else {
            state.items = [...state.items, {name, cost, image, quantity: 1}];            
        };
        //console.log(JSON.parse(JSON.stringify(state.items)));
    },
    removeItem: (state, action) => {
        const {name, cost, image, quantity} = action.payload;
        const existingItem = state.items.find(item=>item.name === name);
        if(existingItem){
            state.items = state.items.filter((item) => item.name !== name);
        }
    },
    updateQuantity: (state, action) => {
        const {name, cost, image, quantity} = action.payload;
        const existingItem = state.items.find(item=>item.name === name);
        if(existingItem){
            existingItem.quantity = quantity;
        };    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
