import {
    CREATE_NEW_POST,
    GET_POSTS_BEGIN,
    GET_POSTS_ERROR,
    GET_POSTS_SUCCESS,
    UPDATE_EXISTING_POST,
    GET_SINGLE_POST_BEGIN,
    GET_SINGLE_POST_ERROR,
    GET_SINGLE_POST_SUCCESS,
  } from '../actions';
  
  const post_reducer = (state, action) => {
    if (action.type === GET_POSTS_BEGIN) {
      return { ...state, posts_error: false, posts_loading: true };
    }
    if (action.type === GET_POSTS_ERROR) {
      return { ...state, posts_error: true, posts_loading: false };
    }
    if (action.type === GET_POSTS_SUCCESS) {
      return {
        ...state,
        posts_loading: false,
        posts: action.payload,
      };
    }
    if (action.type === CREATE_NEW_POST) {
      const { name, value } = action.payload;
      return { ...state, new_post: { ...state.new_post, [name]: value } };
    }
    if (action.type === GET_SINGLE_POST_BEGIN) {
      return {
        ...state,
        single_post_error: false,
        single_post_loading: true,
      };
    }
    if (action.type === GET_SINGLE_POST_ERROR) {
      return {
        ...state,
        single_post_error: true,
        single_post_loading: false,
      };
    }
    if (action.type === GET_SINGLE_POST_SUCCESS) {
      return {
        ...state,
        single_post_loading: false,
        single_post: action.payload,
      };
    }
    if (action.type === UPDATE_EXISTING_POST) {
      const { name, value } = action.payload;
      return {
        ...state,
        single_post: { ...state.single_post, [name]: value },
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default post_reducer;
  