import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE = 'http://127.0.0.1:5000/';

const initialState = {
	status: 'idle',
	allPosts: [],
    singlePost: [],
	myPosts: [],
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
		const url = BASE + 'get_post';
		const response = await axios.post(url,data);
		return response.data;
	}
)

export const getMyPosts = createAsyncThunk(
	'posts/getMyPosts',
	async (data) => {
		const url = BASE + 'get_user_posts';
		const response = await axios.post(url,data);
		return response.data;
	}
)

export const createPost = createAsyncThunk(
	'posts/createPost',
	async (data) => {
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

export const createComment = createAsyncThunk(
	'posts/createComment',
	async (data) => {
		const url = BASE + 'create_comment';
		const comm_data = [{"comment_content": data.get("content"), "user_id": data.get("user_id"), "post_id": data.get("post_id"), "username": JSON.parse(sessionStorage.getItem("user_data")).username}]
		console.log(comm_data)
		await axios.post(url,data)
		return comm_data
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
			.addCase(createPost.fulfilled, (state) => {
				state.status = 'idle';
			})
			.addCase(createComment.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createComment.fulfilled, (state, action) => {
				state.status = 'idle';
				const newComments = [...state.singlePost[0].comments, action.payload[0]];
				state.singlePost[0].comments = newComments;
				state.singlePost[0].comment_count += 1;
			})
			.addCase(getMyPosts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getMyPosts.fulfilled, (state, action) => {
				state.status = 'idle';
				state.myPosts = action.payload;
			})
	},
});