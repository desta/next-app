import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchSubMenu = createAsyncThunk("fetchSubMenu", async () => {
    const response = await fetch("/api/menu/submenu");
    return response.json();
})
const subMenuSlice = createSlice({
    name: 'submenu',
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
        builder.addCase(fetchSubMenu.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSubMenu.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchSubMenu.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = subMenuSlice.actions
export default subMenuSlice.reducer;