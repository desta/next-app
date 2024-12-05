import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchChat = createAsyncThunk("fetchChat", async () => {
    const response = await fetch("/api/chat");
    return response.json();
})
const chatSlice = createSlice({
    name: 'chat',
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
        builder.addCase(fetchChat.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchChat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchChat.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = chatSlice.actions
export default chatSlice.reducer;