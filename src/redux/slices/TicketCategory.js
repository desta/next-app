import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchTicketCategory = createAsyncThunk("fetchTicketCategory", async () => {
    const response = await fetch("/api/ticket/category");
    return response.json();
})
const ticketCategorySlice = createSlice({
    name: 'ticketcategory',
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
        builder.addCase(fetchTicketCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTicketCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchTicketCategory.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = ticketCategorySlice.actions
export default ticketCategorySlice.reducer;