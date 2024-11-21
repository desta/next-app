import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchProductTypes = createAsyncThunk("fetchProductTypes", async () => {
    const response = await fetch(`/api/product_type`);
    return response.json();
})
const productTypeSlice = createSlice({
    name: 'producttypes',
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
        builder.addCase(fetchProductTypes.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProductTypes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchProductTypes.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = productTypeSlice.actions
export default productTypeSlice.reducer;