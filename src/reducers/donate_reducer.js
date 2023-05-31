import {
    CREATE_NEW_DONATE,
    GET_DONATES_BEGIN,
    GET_DONATES_ERROR,
    GET_DONATES_SUCCESS,
    UPDATE_EXISTING_DONATE,
    GET_SINGLE_DONATE_BEGIN,
    GET_SINGLE_DONATE_ERROR,
    GET_SINGLE_DONATE_SUCCESS,
  } from '../actions';
  
  const donate_reducer = (state, action) => {
    if (action.type === GET_DONATES_BEGIN) {
      return { ...state, donates_error: false, donates_loading: true };
    }
    if (action.type === GET_DONATES_ERROR) {
      return { ...state, donates_error: true, donates_loading: false };
    }
    if (action.type === GET_DONATES_SUCCESS) {
      return {
        ...state,
        donates_loading: false,
        donates: action.payload,
      };
    }
    if (action.type === CREATE_NEW_DONATE) {
      const { name, value } = action.payload;
      return { ...state, new_donate: { ...state.new_donate, [name]: value } };
    }
    if (action.type === GET_SINGLE_DONATE_BEGIN) {
      return {
        ...state,
        single_donate_error: false,
        single_donate_loading: true,
      };
    }
    if (action.type === GET_SINGLE_DONATE_ERROR) {
      return {
        ...state,
        single_donate_error: true,
        single_donate_loading: false,
      };
    }
    if (action.type === GET_SINGLE_DONATE_SUCCESS) {
      return {
        ...state,
        single_donate_loading: false,
        single_donate: action.payload,
      };
    }
    if (action.type === UPDATE_EXISTING_DONATE) {
      const { name, value } = action.payload;
      return {
        ...state,
        single_donate: { ...state.single_donate, [name]: value },
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default donate_reducer;
  