import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchCustomers = createAsyncThunk("fetchCustomers", async () => {
    const response = await fetch("/api/customer");
    return response.json();
})
const customersSlice = createSlice({
    name: 'customers',
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
        builder.addCase(fetchCustomers.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchCustomers.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = customersSlice.actions
export default customersSlice.reducer;