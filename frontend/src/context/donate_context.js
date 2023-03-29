import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/donate_reducer';
import {
  donates_url,
  update_donate_url,
  create_new_donate,
  
} from '../utils/constants';
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

const initialState = {
  donates_loading: false,
  donates_error: false,
  donates: [],
  new_donate: {
    name: '',
    idBD: '',

    iduser: '',
    amount: 250,
    typeBlood: '',
 
    // type:'Nhân Viên Hỗ Trợ'
   
  },
  single_donate_loading: false,
  single_donate_error: false,
  single_donate: {},
};

const DonateContext = React.createContext();

export const DonateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchDonates = async () => {
    dispatch({ type: GET_DONATES_BEGIN });
    try {
      const response = await axios.get(donates_url);
      const { data } = response.data;
      dispatch({ type: GET_DONATES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_DONATES_ERROR });
    }
  };

  const fetchSingleDonate = async (id) => {
    dispatch({ type: GET_SINGLE_DONATE_BEGIN });
    try {
      const response = await axios.get(`${donates_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_DONATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_DONATE_ERROR });
    }
  };

  const deleteDonate = async (id) => {
    try {
      const response = await axios.delete(`${update_donate_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewDonateDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
  
    dispatch({ type: CREATE_NEW_DONATE, payload: { name, value } });
  };

  const updateExistingDonateDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 
    dispatch({ type: UPDATE_EXISTING_DONATE, payload: { name, value } });
  };

  const createNewDonate = async (donate) => {
    try {
      const response = await axios.post(create_new_donate, donate);
      const { success, data } = response.data;
      fetchDonates();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateDonate = async (id, donate) => {
    try {
      const response = await axios.put(`${update_donate_url}${id}`, donate);
      const { success, message } = response.data;
      // fetchdonates();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };


  useEffect(() => {
    fetchDonates();
  }, []);

  return (
    <DonateContext.Provider
      value={{
        ...state,
        deleteDonate,
        updateNewDonateDetails,
        updateExistingDonateDetails,
        createNewDonate,
        fetchDonates,
        fetchSingleDonate,
        updateDonate,
        
      }}
    >
      {children}
    </DonateContext.Provider>
  );
};

export const useDonateContext = () => {
  return useContext(DonateContext);
};
