import React, { useState,useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import { useBookingContext } from '../context/booking_context';
import {useInforContext}  from '../context/infor_context';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
 
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,

  HStack,
  Spinner,

  useToast,
} from '@chakra-ui/react';
// import UpdateBookingModal from './UpdateBookingModal';

function BookingsTable({ bookings, id }) {
  const toast = useToast();
  const { fetchBookings, deleteBooking } = useBookingContext();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [data, setData] = useState([]);
    const idBDD= location.pathname.slice(10, 34);
  
 const {
    infors,
    // updateInfor
  } = useInforContext();


//   const getdata =  () => {
    
//     setData(bookings.filter(i=>idBD.includes(i.id)).map(i=>i.iduser))

   
// }     
//   useEffect(()=>{
 
// getdata();
// console.log(data)
    // })
    // console.log(bookings)
    // console.log(bookings.filter(i=>idBDD.includes(i.idBD)).map(i=>i.iduser))
    // console.log(infors.filter(i=>(bookings.filter(i=>idBDD.includes(i.idBD)).map(i=>i.iduser)).includes(i.id)).map(i=>i))

  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </HStack>
      ) : (
        <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>STT</Th>
              <Th>CMND/CCCD</Th>
              <Th>Họ và tên</Th>
              <Th>SĐT</Th>
              <Th>Địa chỉ</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {infors.filter(i=>(bookings.filter(i=>idBDD.includes(i.idBD)).map(i=>i.iduser)).includes(i.id)).map((booking, index) => {
              const {  name, countryID,phone, address, suppostTime,type,from,id } =
                booking;
                
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                  <Td>{countryID}</Td>
                  <Td>{name}</Td>
                  <Td>{phone}</Td>
                  <Td>{address}</Td>
             
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        <Link to={`/bookingsDetail/${idBDD}/${id}`}>
                          <MenuItem>Xem</MenuItem>
                        </Link>
                        {/* <MenuItem>
                          <UpdateBookingModal id={id} />
                        </MenuItem> */}
                      
                        {/* <MenuItem onClick={() => handleDelete(id)}>
                          Xóa
                        </MenuItem> */}
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default BookingsTable;
