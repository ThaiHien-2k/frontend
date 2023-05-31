import {
    CREATE_NEW_STAFF,
    GET_STAFFS_BEGIN,
    GET_STAFFS_ERROR,
    GET_STAFFS_SUCCESS,
    UPDATE_EXISTING_STAFF,
    GET_SINGLE_STAFF_BEGIN,
    GET_SINGLE_STAFF_ERROR,
    GET_SINGLE_STAFF_SUCCESS,
  } from '../actions';
  
  const staff_reducer = (state, action) => {
    if (action.type === GET_STAFFS_BEGIN) {
      return { ...state, staffs_error: false, staffs_loading: true };
    }
    if (action.type === GET_STAFFS_ERROR) {
      return { ...state, staffs_error: true, staffs_loading: false };
    }
    if (action.type === GET_STAFFS_SUCCESS) {
      return {
        ...state,
        staffs_loading: false,
        staffs: action.payload,
      };
    }
    if (action.type === CREATE_NEW_STAFF) {
      const { name, value } = action.payload;
      return { ...state, new_staff: { ...state.new_staff, [name]: value } };
    }
    if (action.type === GET_SINGLE_STAFF_BEGIN) {
      return {
        ...state,
        single_staff_error: false,
        single_staff_loading: true,
      };
    }
    if (action.type === GET_SINGLE_STAFF_ERROR) {
      return {
        ...state,
        single_staff_error: true,
        single_staff_loading: false,
      };
    }
    if (action.type === GET_SINGLE_STAFF_SUCCESS) {
      return {
        ...state,
        single_staff_loading: false,
        single_staff: action.payload,
      };
    }
    if (action.type === UPDATE_EXISTING_STAFF) {
      const { name, value } = action.payload;
      return {
        ...state,
        single_staff: { ...state.single_staff, [name]: value },
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default staff_reducer;
  