import { FETCH_ALL, FETCH_POST, FETCH_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });    
    dispatch({type: END_LOADING});
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const { data } = await api.fetchPost(id);
    // console.log("actions/getPost",data);

    dispatch({ type: FETCH_POST, payload: data });    
    dispatch({type: END_LOADING});
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  // console.log("in actions/posts", searchQuery);
  try {
    dispatch({type: START_LOADING});
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    // console.log("Recommended: /actions/posts", data);

    dispatch({ type: FETCH_SEARCH, payload: data });
    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {    
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    // console.log(data);

    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
