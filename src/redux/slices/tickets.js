import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchTickets = createAsyncThunk("fetchTickets", async () => {
    const response = await fetch(`/api/ticket`);
    return response.json();
})
const ticketSlice = createSlice({
    name: 'tickets',
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
        builder.addCase(fetchTickets.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchTickets.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = ticketSlice.actions
export default ticketSlice.reducer;