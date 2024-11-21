import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchAccount = createAsyncThunk("fetchAccount", async () => {
    const response = await fetch("/api/user/account");
    return response.json();
})
const userSlice = createSlice({
    name: 'account',
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
        builder.addCase(fetchAccount.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchAccount.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = userSlice.actions
export default userSlice.reducer;