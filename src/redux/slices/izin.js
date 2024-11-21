import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchIzin = createAsyncThunk("fetchIzin", async () => {
    const response = await fetch(`/api/izin/${params.id}`);
    return response.json();
})
const izinSlice = createSlice({
    name: 'izin',
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
        builder.addCase(fetchIzin.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchIzin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchIzin.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = izinSlice.actions
export default izinSlice.reducer;