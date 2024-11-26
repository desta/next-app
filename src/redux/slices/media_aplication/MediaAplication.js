import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchMediaAplication = createAsyncThunk("fetchMediaAplication", async () => {
    const response = await fetch(`/api/media_aplication`);
    return response.json();
})
const mediaAplicationSlice = createSlice({
    name: 'MediaAplication',
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
        builder.addCase(fetchMediaAplication.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMediaAplication.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchMediaAplication.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = mediaAplicationSlice.actions
export default mediaAplicationSlice.reducer;