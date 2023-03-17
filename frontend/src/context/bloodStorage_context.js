import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/bloodStorage_reducer';
import {
  bloodStorages_url,
  update_bloodStorage_url,
  create_new_bloodStorage,

} from '../utils/constants';
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

const initialState = {
  bloodStorages_loading: false,
  bloodStorages_error: false,
  bloodStorages: [],
  new_bloodStorage: {
    name: '',
    amount: false,
    date:'',
    from: '',
    type:'Nhận',
    detail:'',
    donateID:''

   
  },
  single_bloodStorage_loading: false,
  single_bloodStorage_error: false,
  single_bloodStorage: {},
};

const BloodStorageContext = React.createContext();

export const BloodStorageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchBloodStorages = async () => {
    dispatch({ type: GET_BLOODSTORAGES_BEGIN });
    try {
      const response = await axios.get(bloodStorages_url);
      const { data } = response.data;
      dispatch({ type: GET_BLOODSTORAGES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_BLOODSTORAGES_ERROR });
    }
  };

  const fetchSingleBloodStorage = async (id) => {
    dispatch({ type: GET_SINGLE_BLOODSTORAGE_BEGIN });
    try {
      const response = await axios.get(`${bloodStorages_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_BLOODSTORAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_BLOODSTORAGE_ERROR });
    }
  };

  const deleteBloodStorage = async (id) => {
    try {
      const response = await axios.delete(`${update_bloodStorage_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewBloodStorageDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
   
    dispatch({ type: CREATE_NEW_BLOODSTORAGE, payload: { name, value } });
  };

  const updateExistingBloodStorageDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 
    dispatch({ type: UPDATE_EXISTING_BLOODSTORAGE, payload: { name, value } });
  };

  const createNewBloodStorage = async (bloodStorage) => {
    try {
      const response = await axios.post(create_new_bloodStorage, bloodStorage);
      const { success, data } = response.data;
      fetchBloodStorages();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateBloodStorage = async (id, bloodStorage) => {
    try {
      const response = await axios.put(`${update_bloodStorage_url}${id}`, bloodStorage);
      const { success, message } = response.data;
      // fetchbloodstorages();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

 

  useEffect(() => {
    fetchBloodStorages();
  }, []);

  return (
    <BloodStorageContext.Provider
      value={{
        ...state,
        deleteBloodStorage,
        updateNewBloodStorageDetails,
        updateExistingBloodStorageDetails,
        createNewBloodStorage,
        fetchBloodStorages,
        fetchSingleBloodStorage,
        updateBloodStorage,
        
      }}
    >
      {children}
    </BloodStorageContext.Provider>
  );
};

export const useBloodStorageContext = () => {
  return useContext(BloodStorageContext);
};
