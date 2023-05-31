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
  
  const cashFlow_reducer = (state, action) => {
    if (action.type === GET_CASHFLOWS_BEGIN) {
      return { ...state, cashFlows_error: false, cashFlows_loading: true };
    }
    if (action.type === GET_CASHFLOWS_ERROR) {
      return { ...state, cashFlows_error: true, cashFlows_loading: false };
    }
    if (action.type === GET_CASHFLOWS_SUCCESS) {
      return {
        ...state,
        cashFlows_loading: false,
        cashFlows: action.payload,
      };
    }
    if (action.type === CREATE_NEW_CASHFLOW) {
      const { name, value } = action.payload;
      return { ...state, new_cashFlow: { ...state.new_cashFlow, [name]: value } };
    }
    if (action.type === GET_SINGLE_CASHFLOW_BEGIN) {
      return {
        ...state,
        single_cashFlow_error: false,
        single_cashFlow_loading: true,
      };
    }
    if (action.type === GET_SINGLE_CASHFLOW_ERROR) {
      return {
        ...state,
        single_cashFlow_error: true,
        single_cashFlow_loading: false,
      };
    }
    if (action.type === GET_SINGLE_CASHFLOW_SUCCESS) {
      return {
        ...state,
        single_cashFlow_loading: false,
        single_cashFlow: action.payload,
      };
    }
    if (action.type === UPDATE_EXISTING_CASHFLOW) {
      const { name, value } = action.payload;
      return {
        ...state,
        single_cashFlow: { ...state.single_cashFlow, [name]: value },
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default cashFlow_reducer;
  