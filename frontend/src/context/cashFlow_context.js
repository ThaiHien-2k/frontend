import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/cashFlow_reduce';
import {
  cashFlows_url,
  update_cashFlow_url,
  create_new_cashFlow,
  cashFlow_remaining
} from '../utils/constants';
import {
  CREATE_NEW_CASHFLOW,
  GET_CASHFLOWS_BEGIN,
  GET_CASHFLOWS_ERROR,
  GET_CASHFLOWS_SUCCESS,
  UPDATE_EXISTING_CASHFLOW,
  GET_SINGLE_CASHFLOW_BEGIN,
  GET_SINGLE_CASHFLOW_ERROR,
  GET_SINGLE_CASHFLOW_SUCCESS,
} from '../actions';

const initialState = {
  cashFlows_loading: false,
  cashFlows_error: false,
  cashFlows: [],
  new_cashFlow: {
    name: '',
    amount: "",
    from: '',
    date:'',
    // address: '',
    type:'Thu'
   
  },
  single_cashFlow_loading: false,
  single_cashFlow_error: false,
  single_cashFlow: {},
};

const CashFlowContext = React.createContext();

export const CashFlowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCashFlows = async () => {
    dispatch({ type: GET_CASHFLOWS_BEGIN });
    try {
      const response = await axios.get(cashFlows_url);
      const { data } = response.data;
      dispatch({ type: GET_CASHFLOWS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_CASHFLOWS_ERROR });
    }
  };

  const fetchCashFlowsRemaining = async () => {
    dispatch({ type: GET_CASHFLOWS_BEGIN });
    try {
      const response = await axios.get(cashFlow_remaining);
      const { data } = response.data;
      dispatch({ type: GET_CASHFLOWS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_CASHFLOWS_ERROR });
    }
  };

  const fetchSingleCashFlow = async (id) => {
    dispatch({ type: GET_SINGLE_CASHFLOW_BEGIN });
    try {
      const response = await axios.get(`${cashFlows_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_CASHFLOW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_CASHFLOW_ERROR });
    }
  };

  const deleteCashFlow = async (id) => {
    try {
      const response = await axios.delete(`${update_cashFlow_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewCashFlowDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
  
    dispatch({ type: CREATE_NEW_CASHFLOW, payload: { name, value } });
  };

  const updateExistingCashFlowDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 
    dispatch({ type: UPDATE_EXISTING_CASHFLOW, payload: { name, value } });
  };

  const createNewCashFlow = async (cashFlow) => {
    try {
      const response = await axios.post(create_new_cashFlow, cashFlow);
      const { success, data } = response.data;
      fetchCashFlows();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateCashFlow = async (id, cashFlow) => {
    try {
      const response = await axios.put(`${update_cashFlow_url}${id}`, cashFlow);
      const { success, message } = response.data;
      // fetchcashFlows();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };



  useEffect(() => {
    fetchCashFlows();
  }, []);

  return (
    <CashFlowContext.Provider
      value={{
        ...state,
        deleteCashFlow,
        updateNewCashFlowDetails,
        updateExistingCashFlowDetails,
        createNewCashFlow,
        fetchCashFlows,
        fetchSingleCashFlow,
        updateCashFlow,
        fetchCashFlowsRemaining
      }}
    >
      {children}
    </CashFlowContext.Provider>
  );
};

export const useCashFlowContext = () => {
  return useContext(CashFlowContext);
};
