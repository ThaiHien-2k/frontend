import {
    CREATE_NEW_BLOODSTORAGE,
    GET_BLOODSTORAGES_BEGIN,
    GET_BLOODSTORAGES_ERROR,
    GET_BLOODSTORAGES_SUCCESS,
    UPDATE_EXISTING_BLOODSTORAGE,
    GET_SINGLE_BLOODSTORAGE_BEGIN,
    GET_SINGLE_BLOODSTORAGE_ERROR,
    GET_SINGLE_BLOODSTORAGE_SUCCESS,
  } from '../actions';
  
  const bloodStorage_reducer = (state, action) => {
    if (action.type === GET_BLOODSTORAGES_BEGIN) {
      return { ...state, bloodStorages_error: false, bloodStorages_loading: true };
    }
    if (action.type === GET_BLOODSTORAGES_ERROR) {
      return { ...state, bloodStorages_error: true, bloodStorages_loading: false };
    }
    if (action.type === GET_BLOODSTORAGES_SUCCESS) {
      return {
        ...state,
        bloodStorages_loading: false,
        bloodStorages: action.payload,
      };
    }
    if (action.type === CREATE_NEW_BLOODSTORAGE) {
      const { name, value } = action.payload;
      return { ...state, new_bloodStorage: { ...state.new_bloodStorage, [name]: value } };
    }
    if (action.type === GET_SINGLE_BLOODSTORAGE_BEGIN) {
      return {
        ...state,
        single_bloodStorage_error: false,
        single_bloodStorage_loading: true,
      };
    }
    if (action.type === GET_SINGLE_BLOODSTORAGE_ERROR) {
      return {
        ...state,
        single_bloodStorage_error: true,
        single_bloodStorage_loading: false,
      };
    }
    if (action.type === GET_SINGLE_BLOODSTORAGE_SUCCESS) {
      return {
        ...state,
        single_bloodStorage_loading: false,
        single_bloodStorage: action.payload,
      };
    }
    if (action.type === UPDATE_EXISTING_BLOODSTORAGE) {
      const { name, value } = action.payload;
      return {
        ...state,
        single_bloodStorage: { ...state.single_bloodStorage, [name]: value },
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default bloodStorage_reducer;
  