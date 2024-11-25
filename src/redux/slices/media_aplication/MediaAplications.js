import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchMediaAplications = createAsyncThunk("fetchMediaAplications", async () => {
    const response = await fetch(`/api/media_aplication`);
    return response.json();
})
const mediaAplicationSlice = createSlice({
    name: 'MediaAplications',
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
        builder.addCase(fetchMediaAplications.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMediaAplications.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchMediaAplications.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = mediaAplicationSlice.actions
export default mediaAplicationSlice.reducer;