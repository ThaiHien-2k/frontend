import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/staff_reducer';
import {
  staffs_url,
  update_staff_url,
  create_new_staff,

} from '../utils/constants';
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

const initialState = {
  staffs_loading: false,
  staffs_error: false,
  staffs: [],
  new_staff: {
    name: '',
    countryID: '',
    phone:'',
    suppostTime: false,
    address: '',
    from:'',
    type:'Nhân Viên Hỗ Trợ'
   
  },
  single_staff_loading: false,
  single_staff_error: false,
  single_staff: {},
};

const StaffContext = React.createContext();

export const StaffProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStaffs = async () => {
    dispatch({ type: GET_STAFFS_BEGIN });
    try {
      const response = await axios.get(staffs_url);
      const { data } = response.data;
      dispatch({ type: GET_STAFFS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_STAFFS_ERROR });
    }
  };

  const fetchSingleStaff = async (id) => {
    dispatch({ type: GET_SINGLE_STAFF_BEGIN });
    try {
      const response = await axios.get(`${staffs_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_STAFF_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_STAFF_ERROR });
    }
  };

  const deleteStaff = async (id) => {
    try {
      const response = await axios.delete(`${update_staff_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewStaffDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
   
    dispatch({ type: CREATE_NEW_STAFF, payload: { name, value } });
  };

  const updateExistingStaffDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 
    dispatch({ type: UPDATE_EXISTING_STAFF, payload: { name, value } });
  };

  const createNewStaff = async (staff) => {
    try {
      const response = await axios.post(create_new_staff, staff);
      const { success, data } = response.data;
      fetchStaffs();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateStaff = async (id, staff) => {
    try {
      const response = await axios.put(`${update_staff_url}${id}`, staff);
      const { success, message } = response.data;
      // fetchstaffs();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

 

  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <StaffContext.Provider
      value={{
        ...state,
        deleteStaff,
        updateNewStaffDetails,
        updateExistingStaffDetails,
        createNewStaff,
        fetchStaffs,
        fetchSingleStaff,
        updateStaff,
        
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export const useStaffContext = () => {
  return useContext(StaffContext);
};
