// import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import counterSliceR from "./counter";
import authSliceR from "./auth";

// const counterReducer = (state = initialState, action) => {
//     if (action.type === "increment") {
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter,
//         };
//     }
//     if (action.type === "decrement") {
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter,
//         };
//     }
//     if (action.type === "increase") {
//         return {
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter,
//         };
//     }
//     if (action.type === "decrease") {
//         return {
//             counter: state.counter - action.amount,
//             showCounter: state.showCounter,
//         };
//     }
//     if (action.type === "toggle") {
//         return {
//             counter: state.counter,
//             showCounter: !state.showCounter,
//         };
//     }

//     return state;
// };

// const store = createStore(counterReducer);
const store = configureStore({
    reducer: { counter: counterSliceR, auth: authSliceR },
    // reducer: counterSlice.reducer,
});

export default store;
