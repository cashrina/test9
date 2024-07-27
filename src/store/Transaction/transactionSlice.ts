import {ApiTransaction, TransactionId} from "../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createTransaction, fetchTransaction} from "./transactionThunks.ts";

export interface TransactionState {
    items: TransactionId[];
    isCreating: boolean;
    isFetching: boolean;
    oneTransaction: null | ApiTransaction;
}

export const initialState: TransactionState = {
    items: [],
    isCreating: false,
    isFetching: false,
    oneTransaction: null,
}

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTransaction.pending, (state) => {
            state.isCreating = true;
        }). addCase(createTransaction.fulfilled, (state) => {
            state.isCreating = false;
        }). addCase(createTransaction.rejected, (state) => {
            state.isCreating = false;
        });

        builder.addCase(fetchTransaction.pending, (state) => {
            state.isFetching = true;
        }). addCase(fetchTransaction.fulfilled, (state, {payload: items}) => {
            state.isFetching = false;
            state.items = items;
        }). addCase(fetchTransaction.rejected, (state) => {
            state.isFetching = false;
        });
    },

    selectors: {
        selectTransaction: (state) => state.items,
        selectPostTransaction: (state) => state.isCreating,
        selectFetchTransaction: (state) => state.isFetching,
    },
});

export const transactionReducer = transactionSlice.reducer;

export const {
    selectTransaction,
    selectPostTransaction,
    selectFetchTransaction
} = transactionSlice.selectors;