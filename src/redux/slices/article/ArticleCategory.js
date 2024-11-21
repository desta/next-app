import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchArticleCategory = createAsyncThunk("fetchArticleCategory", async () => {
    const response = await fetch(`/api/article_category`);
    return response.json();
})
const articleCategorySlice = createSlice({
    name: 'articleCategory',
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
        builder.addCase(fetchArticleCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchArticleCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchArticleCategory.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = articleCategorySlice.actions
export default articleCategorySlice.reducer;