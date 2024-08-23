import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DescriptionState {
    showDescription: boolean;
}

const initialState: DescriptionState = {
    showDescription: false,
};

const descriptionSlice = createSlice({
    name: 'description',
    initialState,
    reducers: {
        toggleDescription: (state) => {
            state.showDescription = !state.showDescription;
        },
        setShowDescription: (state, action: PayloadAction<boolean>) => {
            state.showDescription = action.payload;
        },
    },
});

export const { toggleDescription, setShowDescription } = descriptionSlice.actions;
export default descriptionSlice.reducer;
