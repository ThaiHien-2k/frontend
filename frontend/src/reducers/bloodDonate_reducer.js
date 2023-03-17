import {
    CREATE_NEW_BLOODDONATE,
    GET_BLOODDONATES_BEGIN,
    GET_BLOODDONATES_ERROR,
    GET_BLOODDONATES_SUCCESS,
    UPDATE_EXISTING_BLOODDONATE,
    GET_SINGLE_BLOODDONATE_BEGIN,
    GET_SINGLE_BLOODDONATE_ERROR,
    GET_SINGLE_BLOODDONATE_SUCCESS,
  } from '../actions';
  
  const bloodDonate_reducer = (state, action) => {
    if (action.type === GET_BLOODDONATES_BEGIN) {
      return { ...state, bloodDonates_error: false, bloodDonates_loading: true };
    }
    if (action.type === GET_BLOODDONATES_ERROR) {
      return { ...state, bloodDonates_error: true, bloodDonates_loading: false };
    }
    if (action.type === GET_BLOODDONATES_SUCCESS) {
      return {
        ...state,
        bloodDonates_loading: false,
        bloodDonates: action.payload,
      };
    }
    if (action.type === CREATE_NEW_BLOODDONATE) {
      const { name, value } = action.payload;
      return { ...state, new_bloodDonate: { ...state.new_bloodDonate, [name]: value } };
    }
    if (action.type === GET_SINGLE_BLOODDONATE_BEGIN) {
      return {
        ...state,
        single_bloodDonate_error: false,
        single_bloodDonate_loading: true,
      };
    }
    if (action.type === GET_SINGLE_BLOODDONATE_ERROR) {
      return {
        ...state,
        single_bloodDonate_error: true,
        single_bloodDonate_loading: false,
      };
    }
    if (action.type === GET_SINGLE_BLOODDONATE_SUCCESS) {
      return {
        ...state,
        single_bloodDonate_loading: false,
        single_bloodDonate: action.payload,
      };
    }
    if (action.type === UPDATE_EXISTING_BLOODDONATE) {
      const { name, value } = action.payload;
      return {
        ...state,
        single_bloodDonate: { ...state.single_bloodDonate, [name]: value },
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default bloodDonate_reducer;
  