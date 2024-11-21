import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchProductCategories = createAsyncThunk("fetchProductCategories", async () => {
    const response = await fetch(`/api/product_category`);
    return response.json();
})
const productCategorySlice = createSlice({
    name: 'productcategories',
    initialState: {
        isLoading: false,
        data: [],
        error: false
    },
    reducers: {
        tambah: function(state, action) {
            state.data.push(action.payload)
            state.data.sort((a, b) => a.id - b.id)
        },
        hapus: function(state, action) {
            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        edit: function(state, action) {
            const index = state.data.findIndex((item) => item.id === action.payload.id)
            state.data[index] = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductCategories.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchProductCategories.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = productCategorySlice.actions
export default productCategorySlice.reducer;