import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchRegions = createAsyncThunk("fetchRegions", async () => {
    const response = await fetch(`/api/website/region`);
    return response.json();
})
const regionsSlice = createSlice({
    name: 'regions',
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
        builder.addCase(fetchRegions.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchRegions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchRegions.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = regionsSlice.actions
export default regionsSlice.reducer;