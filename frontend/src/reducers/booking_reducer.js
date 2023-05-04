import {
    CREATE_NEW_BOOKING,
    GET_BOOKINGS_BEGIN,
    GET_BOOKINGS_ERROR,
    GET_BOOKINGS_SUCCESS,
    UPDATE_EXISTING_BOOKING,
    GET_SINGLE_BOOKING_BEGIN,
    GET_SINGLE_BOOKING_ERROR,
    GET_SINGLE_BOOKING_SUCCESS,
  } from '../actions';
  
  const booking_reducer = (state, action) => {
    if (action.type === GET_BOOKINGS_BEGIN) {
      return { ...state, bookings_error: false, bookings_loading: true };
    }
    if (action.type === GET_BOOKINGS_ERROR) {
      return { ...state, bookings_error: true, bookings_loading: false };
    }
    if (action.type === GET_BOOKINGS_SUCCESS) {
      return {
        ...state,
        bookings_loading: false,
        bookings: action.payload,
      };
    }
    if (action.type === CREATE_NEW_BOOKING) {
      const { name, value } = action.payload;
      return { ...state, new_booking: { ...state.new_booking, [name]: value } };
    }
    if (action.type === GET_SINGLE_BOOKING_BEGIN) {
      return {
        ...state,
        single_booking_error: false,
        single_booking_loading: true,
      };
    }
    if (action.type === GET_SINGLE_BOOKING_ERROR) {
      return {
        ...state,
        single_booking_error: true,
        single_booking_loading: false,
      };
    }
    if (action.type === GET_SINGLE_BOOKING_SUCCESS) {
      return {
        ...state,
        single_booking_loading: false,
        single_booking: action.payload,
      };
    }
    if (action.type === UPDATE_EXISTING_BOOKING) {
      const { name, value } = action.payload;
      return {
        ...state,
        single_booking: { ...state.single_booking, [name]: value },
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default booking_reducer;
  