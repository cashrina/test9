import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";
import {ApiCategories, ApiCategory, CategoryId, CategoryMutation} from "../../types.ts";

export interface UpdateCategoryArg {
    id: string;
    apiCategory: ApiCategory;
}

export const createCategory = createAsyncThunk<void, CategoryMutation, {state: RootState}>(
    'categories/createCategory', async (apiCategori) => {
        await axiosApi.post('/categories.json', apiCategori);
    },
);

export const updateCategory = createAsyncThunk<void, UpdateCategoryArg, {state: RootState}> (
    'categories/updateCategory',
    async ({id, apiCategory}) => {
        await axiosApi.put(`/categories/${id}.json`, apiCategory);
    },
);

export const fetchOneCategory = createAsyncThunk<ApiCategory, string, {state: RootState}>(
    'categories/fetchOneCategory',
    async (id) => {
        const { data: category } = await axiosApi.get<ApiCategory | null>(
            `/categories/${id}.json`,
        );
        if (category === null) {
            throw new Error('Not found');
        }
        return category;
    },
);

export const fetchCategory = createAsyncThunk<CategoryId[], void, { state: RootState }>(
    'categories/fetchCategory',
    async () => {
        const {data: categories} = await axiosApi.get<ApiCategories | null>('/categories.json');
        if (categories === null) {
            return [];
        }

        return Object.keys(categories).map((key: string) => {
            const category = categories[key];
            return {
                id: key,
                ...category,
            };
        });

    });

export const deleteCategory = createAsyncThunk<void, string, { state: RootState }>(
    'categories/deleteCategory',
    async (categoryId) => {
        await axiosApi.delete(`/categories/${categoryId}.json`);
    },
);