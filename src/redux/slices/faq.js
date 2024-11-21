import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchFaq = createAsyncThunk("fetchFaq", async () => {
    const response = await fetch("/api/faq");
    return response.json();
})
const faqSlice = createSlice({
    name: 'faq',
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
        builder.addCase(fetchFaq.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFaq.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchFaq.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = faqSlice.actions
export default faqSlice.reducer;