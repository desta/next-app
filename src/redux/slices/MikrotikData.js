import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchMikrotikData = createAsyncThunk("fetchMikrotikData", async () => {
    const response = await fetch("/api/mikrotik/data");
    return response.json();
})
const mikrotikDataSlice = createSlice({
    name: 'mikrotikdata',
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
        builder.addCase(fetchMikrotikData.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMikrotikData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchMikrotikData.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = mikrotikDataSlice.actions
export default mikrotikDataSlice.reducer;