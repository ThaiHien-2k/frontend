import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/infor_reducer';
import {
  infors_url,
  update_infor_url,
  create_new_infor,

} from '../utils/constants';
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

const initialState = {
  infors_loading: false,
  infors_error: false,
  infors: [],
  new_infor: {
    name: '',
    countryID: '',
    email:'',
    phone:'',
    // from: '',
    address: '',
    typeBlood:'',
    status:'',
    oldDate:'',
    donateTime:'',
    // lastDonate:''
   
  },
  single_infor_loading: false,
  single_infor_error: false,
  single_infor: {},
};

const InforContext = React.createContext();

export const InforProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchInfors = async () => {
    dispatch({ type: GET_INFORS_BEGIN });
    try {
      const response = await axios.get(infors_url);
      const { data } = response.data;
      dispatch({ type: GET_INFORS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_INFORS_ERROR });
    }
  };

  const fetchSingleInfor = async (id) => {
    dispatch({ type: GET_SINGLE_INFOR_BEGIN });
    try {
      const response = await axios.get(`${infors_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_INFOR_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_INFOR_ERROR });
    }
  };

  const deleteInfor = async (id) => {
    try {
      const response = await axios.delete(`${update_infor_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewInforDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
   
    dispatch({ type: CREATE_NEW_INFOR, payload: { name, value } });
  };

  const updateExistingInforDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 
    dispatch({ type: UPDATE_EXISTING_INFOR, payload: { name, value } });
  };

  const createNewInfor = async (infor) => {
    try {
      const response = await axios.post(create_new_infor, infor);
      const { success, data } = response.data;
      fetchInfors();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateInfor = async (id, infor) => {
    try {
      const response = await axios.put(`${update_infor_url}${id}`, infor);
      const { success, message } = response.data;
      // fetchinfors();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

 

  useEffect(() => {
    fetchInfors();
  }, []);

  return (
    <InforContext.Provider
      value={{
        ...state,
        deleteInfor,
        updateNewInforDetails,
        updateExistingInforDetails,
        createNewInfor,
        fetchInfors,
        fetchSingleInfor,
        updateInfor,
        
      }}
    >
      {children}
    </InforContext.Provider>
  );
};

export const useInforContext = () => {
  return useContext(InforContext);
};
