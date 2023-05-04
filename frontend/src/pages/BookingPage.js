import React from 'react';
import {
//   BookingsTable,
  SidebarWithHeader,
//   CreateNewBookingModal,
} from '../components';
import BookingsTable from '../components/BookingTable';

// import CreateNewBookingModal from '../components/CreateNewBookingModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useBookingContext } from '../context/booking_context';
import { Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useState,useEffect } from 'react';

function BookingPage() {
  const {
    bookings,
    bookings_loading: loading,
    bookings_error: error,
    fetchBookings,
  } = useBookingContext();

  const handleRefresh = async () => {
 
      setBookingList(bookings);

    await fetchBookings();
  };
  const [bookingList, setBookingList] = useState([]);


  useEffect(() => {
  
    setSearchTerm("");
 
       
      
  }, [])

  function setSearchTerm(e){
    // bookings = bookings.filter(booking => booking.countryID < 60);
    const results = bookings.filter(booking => {
      if (e === "") return  bookingList.push(bookings.map(i=>i));
      return booking.name.toLowerCase().includes(e.toLowerCase())
      })
      setBookingList(results);
    // console.log(BookingList);
  }

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          {/* <CreateNewBookingModal /> */}
          {/* <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Tải lại
          </Button> */}
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          {/* <CreateNewBookingModal /> */}
          {/* <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Tải lại
          </Button> */}
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <HStack mb={5}>
      
        {/* <Input icon='search'
       placeholder='Nhập tên cần tìm' 
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      /> */}
        {/* <CreateNewBookingModal /> */}
        {/* <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button> */}
      </HStack>
     
      <BookingsTable bookings={bookings.filter(i=>bookingList.map(i=>i.id).includes(i.id))} />
    </SidebarWithHeader>
  );
}

export default BookingPage;
