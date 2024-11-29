import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchCustomerChat = createAsyncThunk("fetchCustomerChat", async () => {
    const response = await fetch("/api/customer_chat");
    return response.json();
})
const customerChatSlice = createSlice({
    name: 'customersChat',
    initialState: {
        isLoading: false,
        data: [],
        error: false
    },
    reducers: {
        addMessage: function(state, action) {
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
        builder.addCase(fetchCustomerChat.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCustomerChat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchCustomerChat.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { addMessage, hapus, edit } = customerChatSlice.actions
export default customerChatSlice.reducer;