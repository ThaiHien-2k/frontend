import React from 'react';
import {
//   BookingTable,
  SidebarWithHeader,
//   CreateNewBookingModal,
} from '../components';
// import BookingTable from '../components/BookingTable';
import BookingDetail from '../components/BookingDetail';
// import CreateNewBookingModal from '../components/CreateNewBookingModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
// import { useBookingContext } from '../context/Booking_context';
import { useBookingContext } from '../context/booking_context';
import {useInforContext}from '../context/infor_context';
import { useParams } from 'react-router-dom';
import { Input } from 'semantic-ui-react';
import { useEffect,useState } from 'react';
function BookingDetailPage() {
  const { id } = useParams();
  const {
    bookings,
    bookings_loading: loading,
    bookings_error: error,
    fetchBookings,
  } = useBookingContext();

  const{
    fetchSingleBooking
  } = useBookingContext();

  const {
  
    single_infor: infor,
    fetchSingleInfor,
  } = useInforContext();

  useEffect(() => {
    fetchSingleInfor(id);
    // eslint-disable-next-line
  }, []);
console.log(bookings);
  return (
    <SidebarWithHeader>
      <HStack mb={5}>
    
   
       
      </HStack>
     
      <BookingDetail bookings={bookings} infor={infor}  id={id}/>
    </SidebarWithHeader>
  );
}

export default BookingDetailPage;
