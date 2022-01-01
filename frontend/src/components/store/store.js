import { configureStore } from '@reduxjs/toolkit';
import { postDataSlice } from 'components/slices/feedSlice';

export const store = configureStore({
	reducer: {
		postData: postDataSlice.reducer,
	},
    devTools: true,
});