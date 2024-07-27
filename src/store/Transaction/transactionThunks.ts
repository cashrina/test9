import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    ApiTransaction,
    ApiTransactions,
    Transaction,
    TransactionId
} from "../../types.ts";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";

export interface UpdateTransactionArg {
    id: string;
    apiTransaction: ApiTransaction;
}

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

export const updateTransaction = createAsyncThunk<void, UpdateTransactionArg, {state: RootState}> (
    'transactions/updateTransaction',
    async ({id, apiTransaction}) => {
        await axiosApi.put(`/transactions/${id}.json`, apiTransaction);
    },
);

export const fetchOneTransaction = createAsyncThunk<ApiTransaction, string, {state: RootState}>(
    'transactions/fetchOneTransaction',
    async (id) => {
        const { data: transaction } = await axiosApi.get<ApiTransaction | null>(
            `/transactions/${id}.json`,
        );
        if (transaction === null) {
            throw new Error('Not found');
        }
        return transaction;
    },
);

export const deleteTransaction = createAsyncThunk<void, string, { state: RootState }>(
    'transactions/deleteTransaction',
    async (transactionId) => {
        await axiosApi.delete(`/transactions/${transactionId}.json`);
    },
);