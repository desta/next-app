import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchPages = createAsyncThunk("fetchPages", async (withWhere) => {
    if(withWhere){
        const response = await fetch(`/api/pages/get?where=${withWhere}`);
        return response.json();
    }else{
        const response = await fetch(`/api/pages`);
        return response.json();
    }

})
const pagesSlice = createSlice({
    name: 'pages',
    initialState: {
        isLoading: false,
        data: [],
        editValue: {},
        error: false
    },
    reducers: {
        tambah: function(state, action) {
            state.data.push(action.payload)
            state.data.sort((a, b) => a.id - b.id)
        },
        setEditPageValue: function (state, action) {
            state.editValue= action.payload
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
        builder.addCase(fetchPages.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchPages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchPages.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit, setEditPageValue } = pagesSlice.actions
export default pagesSlice.reducer;