import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/post_reducer';
import {
  posts_url,
  update_post_url,
  create_new_post,

} from '../utils/constants';
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

const initialState = {
  posts_loading: false,
  posts_error: false,
  posts: [],
  new_post: {
    name: '',
    title: '',
    content:'',
    like: false,
    status: '',
    createdAt:'',

   
  },
  single_post_loading: false,
  single_post_error: false,
  single_post: {},
};

const PostContext = React.createContext();

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPosts = async () => {
    dispatch({ type: GET_POSTS_BEGIN });
    try {
      const response = await axios.get(posts_url);
      const { data } = response.data;
      dispatch({ type: GET_POSTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_POSTS_ERROR });
    }
  };

  const fetchSinglePost = async (id) => {
    dispatch({ type: GET_SINGLE_POST_BEGIN });
    try {
      const response = await axios.get(`${posts_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_POST_ERROR });
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${update_post_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewPostDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
   
    dispatch({ type: CREATE_NEW_POST, payload: { name, value } });
  };

  const updateExistingPostDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 
    dispatch({ type: UPDATE_EXISTING_POST, payload: { name, value } });
  };

  const createNewPost = async (post) => {
    try {
      const response = await axios.post(create_new_post, post);
      const { success, data } = response.data;
      fetchPosts();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updatePost = async (id, post) => {
    try {
      const response = await axios.put(`${update_post_url}${id}`, post);
      const { success, message } = response.data;
      // fetchposts();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

 

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        ...state,
        deletePost,
        updateNewPostDetails,
        updateExistingPostDetails,
        createNewPost,
        fetchPosts,
        fetchSinglePost,
        updatePost,
        
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
