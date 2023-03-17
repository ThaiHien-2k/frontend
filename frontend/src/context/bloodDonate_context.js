import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/bloodDonate_reducer';
import {
  bloodDonates_url,
  update_bloodDonate_url,
  create_new_bloodDonate,
  
} from '../utils/constants';
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

const initialState = {
  bloodDonates_loading: false,
  bloodDonates_error: false,
  bloodDonates: [],
  new_bloodDonate: {
    name: '',
    time: '',

    address: '',
    target: '',
    receive: '',
    staffList: [],
    status: 'Chưa thực hiện',
    // type:'Nhân Viên Hỗ Trợ'
   
  },
  single_bloodDonate_loading: false,
  single_bloodDonate_error: false,
  single_bloodDonate: {},
};

const BloodDonateContext = React.createContext();

export const BloodDonateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchBloodDonates = async () => {
    dispatch({ type: GET_BLOODDONATES_BEGIN });
    try {
      const response = await axios.get(bloodDonates_url);
      const { data } = response.data;
      dispatch({ type: GET_BLOODDONATES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_BLOODDONATES_ERROR });
    }
  };

  const fetchSingleBloodDonate = async (id) => {
    dispatch({ type: GET_SINGLE_BLOODDONATE_BEGIN });
    try {
      const response = await axios.get(`${bloodDonates_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_BLOODDONATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_BLOODDONATE_ERROR });
    }
  };

  const deleteBloodDonate = async (id) => {
    try {
      const response = await axios.delete(`${update_bloodDonate_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewBloodDonateDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
  
    dispatch({ type: CREATE_NEW_BLOODDONATE, payload: { name, value } });
  };

  const updateExistingBloodDonateDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 
    dispatch({ type: UPDATE_EXISTING_BLOODDONATE, payload: { name, value } });
  };

  const createNewBloodDonate = async (bloodDonate) => {
    try {
      const response = await axios.post(create_new_bloodDonate, bloodDonate);
      const { success, data } = response.data;
      fetchBloodDonates();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateBloodDonate = async (id, bloodDonate) => {
    try {
      const response = await axios.put(`${update_bloodDonate_url}${id}`, bloodDonate);
      const { success, message } = response.data;
      // fetchbloodDonates();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };


  useEffect(() => {
    fetchBloodDonates();
  }, []);

  return (
    <BloodDonateContext.Provider
      value={{
        ...state,
        deleteBloodDonate,
        updateNewBloodDonateDetails,
        updateExistingBloodDonateDetails,
        createNewBloodDonate,
        fetchBloodDonates,
        fetchSingleBloodDonate,
        updateBloodDonate,
        
      }}
    >
      {children}
    </BloodDonateContext.Provider>
  );
};

export const useBloodDonateContext = () => {
  return useContext(BloodDonateContext);
};
