import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchTicketReplyFilter = createAsyncThunk("fetchTicketReplyFilter", async (id) => {

    const response = await fetch(`/api/ticket/reply/filter/${id}`);
    return response.json();
})
const ticketReplyFilterSlice = createSlice({
    name: 'ticketreplyfilter',
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
        builder.addCase(fetchTicketReplyFilter.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTicketReplyFilter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchTicketReplyFilter.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = ticketReplyFilterSlice.actions
export default ticketReplyFilterSlice.reducer;