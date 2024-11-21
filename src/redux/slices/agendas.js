import { formatAgenda } from '@/components/Utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchAgendas = createAsyncThunk("fetchAgendas", async () => {
    const response = await fetch("/api/agenda");
    return response.json();
})
const agendaSlice = createSlice({
    name: 'agendas',
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
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAgendas.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAgendas.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchAgendas.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { tambah, hapus, edit } = agendaSlice.actions
export default agendaSlice.reducer;