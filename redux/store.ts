import { configureStore } from '@reduxjs/toolkit';
import descriptionReducer from './swapper/descriptionSlice';

export const store = configureStore({
    reducer: {
        description: descriptionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
