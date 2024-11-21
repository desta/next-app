import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchTicketUser = createAsyncThunk("fetchTicketUser", async () => {
    const response = await fetch(`/api/ticket/user`);
    return response.json();
})
const ticketUserSlice = createSlice({
    name: 'ticketuser',
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
        builder.addCase(fetchTicketUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTicketUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchTicketUser.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = ticketUserSlice.actions
export default ticketUserSlice.reducer;