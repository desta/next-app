import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchImageSelector = createAsyncThunk("fetchImageSelector", async () => {
    const response = await fetch(`/api/gallery`);
    return response.json();
})
const imageSelectorSlice = createSlice({
    name: 'imageSelector',
    initialState: {
        isLoading: false,
        selectedImageToAdd: [],
        currentSelection:[],
        error: false
    },
    reducers: {
        addSelectedImage: function (state, action) {
            state.selectedImageToAdd.push(action.payload)
        },
        hapusSelectedImage: function (state, action) {
            state.selectedImageToAdd = state.selectedImageToAdd.filter((item) => item.id !== action.payload)
        },
        setSelectedImageRedux: function (state, action) {
            state.selectedImageToAdd = action.payload
        },
        addCurrentSelection: function (state, action) {
            state.currentSelection.push(action.payload)
        },
        hapusCurrentSelection: function (state, action) {
            state.currentSelection = state.currentSelection.filter((item) => item.id !== action.payload)
        },
        setCurrentSelectionRedux: function (state, action) {
            state.currentSelection = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchImageSelector.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchImageSelector.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchImageSelector.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
})
export const { addSelectedImage, hapusSelectedImage, setSelectedImageRedux, addCurrentSelection, hapusCurrentSelection, setCurrentSelectionRedux } = imageSelectorSlice.actions
export default imageSelectorSlice.reducer;