import {
    CREATE_NEW_INFOR,
    GET_INFORS_BEGIN,
    GET_INFORS_ERROR,
    GET_INFORS_SUCCESS,
    UPDATE_EXISTING_INFOR,
    GET_SINGLE_INFOR_BEGIN,
    GET_SINGLE_INFOR_ERROR,
    GET_SINGLE_INFOR_SUCCESS,
  } from '../actions';
  
  const infor_reducer = (state, action) => {
    if (action.type === GET_INFORS_BEGIN) {
      return { ...state, infors_error: false, infors_loading: true };
    }
    if (action.type === GET_INFORS_ERROR) {
      return { ...state, infors_error: true, infors_loading: false };
    }
    if (action.type === GET_INFORS_SUCCESS) {
      return {
        ...state,
        infors_loading: false,
        infors: action.payload,
      };
    }
    if (action.type === CREATE_NEW_INFOR) {
      const { name, value } = action.payload;
      return { ...state, new_infor: { ...state.new_infor, [name]: value } };
    }
    if (action.type === GET_SINGLE_INFOR_BEGIN) {
      return {
        ...state,
        single_infor_error: false,
        single_infor_loading: true,
      };
    }
    if (action.type === GET_SINGLE_INFOR_ERROR) {
      return {
        ...state,
        single_infor_error: true,
        single_infor_loading: false,
      };
    }
    if (action.type === GET_SINGLE_INFOR_SUCCESS) {
      return {
        ...state,
        single_infor_loading: false,
        single_infor: action.payload,
      };
    }
    if (action.type === UPDATE_EXISTING_INFOR) {
      const { name, value } = action.payload;
      return {
        ...state,
        single_infor: { ...state.single_infor, [name]: value },
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default infor_reducer;
  