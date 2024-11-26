import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    const response = await fetch(`/api/product`);
    return response.json();
})
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        data: [],
        selectedProduct: [],
        currentSelection: [],
        error: false
    },
    reducers: {
        addSelectedProduct: function (state, action) {
            state.selectedProduct.push(action.payload)
        },
        removeSelectedProduct: function (state, action) {
            state.selectedProduct = state.selectedProduct.filter((item) => item.id !== action.payload)
        },
        setSelectedProduct: function (state, action) {
            state.selectedProduct = action.payload
        },
        addCurrentSelectionProduct: function (state, action) {
            state.currentSelection.push(action.payload)
        },
        removeCurrentSelectionProduct: function (state, action) {
            state.currentSelection = state.currentSelection.filter((item) => item.id !== action.payload)
        },
        setCurrentSelectionProduct: function (state, action) {
            state.currentSelection = action.payload
        },
        tambah: function (state, action) {
            state.data.push(action.payload)
            state.data.sort((a, b) => a.id - b.id)
        },
        hapus: function (state, action) {
            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        edit: function (state, action) {
            const index = state.data.findIndex((item) => item.id === action.payload.id)
            state.data[index] = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { addSelectedProduct, removeSelectedProduct, setSelectedProduct, addCurrentSelectionProduct, removeCurrentSelectionProduct, setCurrentSelectionProduct, tambah, hapus, edit } = productsSlice.actions
export default productsSlice.reducer;