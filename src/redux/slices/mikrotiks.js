import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchMikrotiks = createAsyncThunk("fetchMikrotiks", async () => {
    const response = await fetch("/api/mikrotik");
    return response.json();
})
const mikrotikSlice = createSlice({
    name: 'mikrotiks',
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
        builder.addCase(fetchMikrotiks.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMikrotiks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchMikrotiks.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = mikrotikSlice.actions
export default mikrotikSlice.reducer;