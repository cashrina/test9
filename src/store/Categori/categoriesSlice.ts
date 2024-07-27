import {createSlice} from "@reduxjs/toolkit";
import {createCategory, deleteCategory, fetchCategory, fetchOneCategory, updateCategory} from "./categoriesThunks.ts";
import {ApiCategory, CategoryId} from "../../types.ts";
import {toast} from "react-toastify";

export interface CategoriesState {
    items: CategoryId[];
    createLoading: boolean;
    updateLoading: boolean;
    isUpdating: boolean;
    isOneFetching: boolean;
    isFetching: boolean;
    isDeleting: false | string;
    oneCategory: null | ApiCategory;
}

const initialState: CategoriesState = {
    items: [],
    createLoading: false,
    updateLoading: false,
    isUpdating: false,
    isOneFetching: false,
    isFetching: false,
    isDeleting: false,
    oneCategory: null,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createCategory.rejected, (state) => {
                state.createLoading = false;
            });

        builder
            .addCase(updateCategory.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.isUpdating = false;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.isUpdating = false;
            });

        builder
            .addCase(fetchOneCategory.pending, (state) => {
                state.oneCategory = null;
                state.isOneFetching = true;
            })
            .addCase(fetchOneCategory.fulfilled, (state, { payload: apiCategory }) => {
                state.oneCategory = apiCategory;
                state.isOneFetching = false;
            })
            .addCase(fetchOneCategory.rejected, (state) => {
                state.isOneFetching = false;
            });

        builder.addCase(fetchCategory.pending, (state) => {
            state.isFetching = true;
        }).addCase(fetchCategory.fulfilled , (state, {payload: items}) => {
            state.isFetching = false;
            state.items = items;
        }).addCase(fetchCategory.rejected, (state) => {
            state.isFetching = false;
        });

        builder.addCase(deleteCategory.pending, (state, { meta : {arg : categoryId}  }) => {
            state.isDeleting = categoryId;
        }).addCase(deleteCategory.fulfilled, (state) => {
            state.isDeleting = false;
            toast.success('Category was deleted!');
        }).addCase(deleteCategory.rejected, (state) => {
            state.isDeleting = false;
        });

    },
    selectors : {
        selectCategory: (state) => state.items,
        selectPostCategories: (state) => state.createLoading,
        selectFetchCategories: (state) => state.isFetching,
        selectOneFetchCategory: (state) => state.isOneFetching,
        selectUpdateCategories: (state) => state.isUpdating,
        selectDeleteCategories: (state) => state.isDeleting,
    },
});

export const categoriesReducer = categoriesSlice.reducer;

export const {
    selectCategory,
    selectPostCategories,
    selectFetchCategories,
    selectOneFetchCategory,
    selectDeleteCategories
} = categoriesSlice.selectors;