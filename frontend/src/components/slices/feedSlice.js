import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE = 'http://127.0.0.1:5000/';

const initialState = {
	status: 'idle',
	allPosts: [],
    singlePost: [],
};

export const getAllPosts = createAsyncThunk(
	'posts/getAllPosts',
	async () => {
		const url = BASE + 'get_all_posts';
		const response = await axios.get(url);
		return response.data;
	}
)

export const getPost = createAsyncThunk(
	'posts/getPost',
	async (data) => {
        console.log(data)
		const url = BASE + 'get_post';
		const response = await axios.post(url,data);
		return response.data;
	}
)

export const createPost = createAsyncThunk(
	'posts/createPost',
	async (data) => {
        console.log(data)
		const url = BASE + 'create_post';
		await axios.post(url,data)
		.then((data) => {
			return true
		})
		.catch((error) => {
			return false
		});
	}
)

export const postDataSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPosts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getAllPosts.fulfilled, (state, action) => {
				state.status = 'idle';
				state.allPosts = action.payload;
			})
            .addCase(getPost.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getPost.fulfilled, (state, action) => {
				state.status = 'idle';
				state.singlePost = action.payload;
			})
			.addCase(createPost.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.status = 'idle';
			});
	},
});