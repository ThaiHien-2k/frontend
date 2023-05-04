import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/booking_reducer';
import {
  bookings_url,
  update_booking_url,
  create_new_booking,

} from '../utils/constants';
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

const initialState = {
  bookings_loading: false,
  bookings_error: false,
  bookings: [],
  new_booking: {
    iduser: '',
    idBD: '',
    sex:'',
    heigh: false,
    weight: false,
    isAcohol: false,
    isNicotine: false,
    isHeartDisease: false,
    isSitUp: false,
    isSick: false,
    createdAt:'',
    isAllergies:'',

   
  },
  single_booking_loading: false,
  single_booking_error: false,
  single_booking: {},
};

const BookingContext = React.createContext();


export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchBookings = async () => {
    dispatch({ type: GET_BOOKINGS_BEGIN });
    try {
      const response = await axios.get(bookings_url);
      const { data } = response.data;
      dispatch({ type: GET_BOOKINGS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_BOOKINGS_ERROR });
    }
  };

  const fetchSingleBooking = async (id) => {
    dispatch({ type: GET_SINGLE_BOOKING_BEGIN });
    try {
      const response = await axios.get(`${bookings_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_BOOKING_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_BOOKING_ERROR });
    }
  };

  const deleteBooking = async (id) => {
    try {
      const response = await axios.delete(`${update_booking_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewBookingDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
   
    dispatch({ type: CREATE_NEW_BOOKING, payload: { name, value } });
  };

  const updateExistingBookingDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 
    dispatch({ type: UPDATE_EXISTING_BOOKING, payload: { name, value } });
  };

  const createNewBooking = async (booking) => {
    try {
      const response = await axios.post(create_new_booking, booking);
      const { success, data } = response.data;
      fetchBookings();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateBooking = async (id, booking) => {
    try {
      const response = await axios.put(`${update_booking_url}${id}`, booking);
      const { success, message } = response.data;
      // fetchbookings();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

 

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        deleteBooking,
        updateNewBookingDetails,
        updateExistingBookingDetails,
        createNewBooking,
        fetchBookings,
        fetchSingleBooking,
        updateBooking,
        
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  return useContext(BookingContext);
};
