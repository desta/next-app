import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchApp = createAsyncThunk("fetchApp", async () => {
    const response = await fetch("/api/app");
    return response.json();
})
const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        data: {},
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
        builder.addCase(fetchApp.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchApp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchApp.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = appSlice.actions
export default appSlice.reducer;