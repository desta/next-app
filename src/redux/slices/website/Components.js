import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchComponents = createAsyncThunk("fetchComponents", async () => {
    const response = await fetch(`/api/component`);
    return response.json();
})
const componentsSlice = createSlice({
    name: 'components',
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
        builder.addCase(fetchComponents.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchComponents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchComponents.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = componentsSlice.actions
export default componentsSlice.reducer;