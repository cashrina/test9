import {ApiTransaction, TransactionId} from "../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {
    createTransaction,
    deleteTransaction,
    fetchOneTransaction,
    fetchTransaction,
    updateTransaction
} from "./transactionThunks.ts";
import {toast} from "react-toastify";

export interface TransactionState {
    items: TransactionId[];
    isCreating: boolean;
    isFetching: boolean;
    isUpdating: boolean;
    isDeleting: false | string;
    isOneFetching: boolean;
    oneTransaction: null | ApiTransaction;
}

export const initialState: TransactionState = {
    items: [],
    isCreating: false,
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
    isOneFetching: false,
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

        builder
            .addCase(updateTransaction.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(updateTransaction.fulfilled, (state) => {
                state.isUpdating = false;
            })
            .addCase(updateTransaction.rejected, (state) => {
                state.isUpdating = false;
            });

        builder.addCase(deleteTransaction.pending, (state, { meta : {arg : transactionId}  }) => {
            state.isDeleting = transactionId;
        }).addCase(deleteTransaction.fulfilled, (state) => {
            state.isDeleting = false;
            toast.success('Transaction was deleted!');
        }).addCase(deleteTransaction.rejected, (state) => {
            state.isDeleting = false;
        });

        builder
            .addCase(fetchOneTransaction.pending, (state) => {
                state.oneTransaction = null;
                state.isOneFetching = true;
            })
            .addCase(fetchOneTransaction.fulfilled, (state, { payload: apiTransaction }) => {
                state.oneTransaction = apiTransaction;
                state.isOneFetching = false;
            })
            .addCase(fetchOneTransaction.rejected, (state) => {
                state.isOneFetching = false;
            });
    },

    selectors: {
        selectTransaction: (state) => state.items,
        selectPostTransaction: (state) => state.isCreating,
        selectFetchTransaction: (state) => state.isFetching,
        selectUpdateTransaction: (state) => state.isUpdating,
        selectDeleteTransaction: (state) => state.isDeleting,
        selectFetchOneTransaction: (state) => state.isOneFetching,
    },
});

export const transactionReducer = transactionSlice.reducer;

export const {
    selectTransaction,
    selectPostTransaction,
    selectFetchTransaction,
    selectUpdateTransaction,
    selectDeleteTransaction,
    selectFetchOneTransaction
} = transactionSlice.selectors;