import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransactions, Transaction, TransactionId} from "../../types.ts";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";

export const createTransaction = createAsyncThunk<void, Transaction, {state: RootState}>(
    'transactions/createTransaction', async (apiTransaction) => {
        await axiosApi.post('/transactions.json', apiTransaction);
    },
);

export const fetchTransaction = createAsyncThunk<TransactionId[], void, { state: RootState }>(
    'transactions/fetchTransaction',
    async () => {
        const {data: transactions} = await axiosApi.get<ApiTransactions | null>('/transactions.json');
        if (transactions === null) {
            return [];
        }

        return Object.keys(transactions).map((key: string) => {
            const transaction = transactions[key];
            return {
                id: key,
                ...transaction,
            };
        });

    });