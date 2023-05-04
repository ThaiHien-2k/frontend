import React, { useState, useEffect } from 'react';
import {
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Text,
  // Box,
  SimpleGrid,
  // Tag,
} from '@chakra-ui/react';
// import { formatPrice } from '../utils/helpers';
import { useAdminContext } from '../context/admin_context';
import { useDonateContext } from '../context/donate_context';
// import { donates_url } from '../utils/constants';
import { useBloodDonateContext } from '../context/bloodDonate_context';
// import { Stars } from '.';
import moment from 'moment';
// import axios from 'axios';

function BookingDetail({ bookings,infor,iduser }) {
  // const { admins } = useAdminContext();

  // const { single_infor_loading: loading } = useinforContext();
  // const [createdBy, setCreatedBy] = useState('');
  // const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
    countryID='',
    address='',
    phone,
    email,
    typeBlood,
    status,
    lastDonate,
    // lastDonate,
    donateTime,
  } = infor;


console.log(id);
 console.log(bookings.filter(i=>id.includes(i.iduser)).map(i=>i))

    //   const idU = id;


  return (
    <VStack alignItems='left' justifyContent='left'>
    
      <HStack spacing='300px'>  
       <VStack alignItems='left' justifyContent='left'>
       <Text fontSize='4xl' as='b'>THÔNG TIN NGƯỜI HIẾN</Text>
      <HStack><Text as='b'>CMND/CCCD: </Text><Text>{countryID}</Text></HStack>
     <HStack> <Text as='b'>Họ và tên: </Text><Text>{name}</Text></HStack>
     <HStack> <Text as='b'>Địa chỉ: </Text><Text>{address}</Text></HStack>
     <HStack><Text as='b'>Số điện thoại: </Text><Text>{phone}</Text></HStack>
     <HStack><Text as='b'>Email: </Text><Text>{email}</Text></HStack>
     <HStack> <Text as='b'>Nhóm máu: </Text><Text>{typeBlood}</Text></HStack>
     <HStack>  <Text as='b'>Số lần hiến: </Text><Text>{donateTime}</Text></HStack>
     <HStack>  <Text as='b'>Ngày hiến cuối cùng: </Text><Text>{moment(lastDonate).format("D/M/YYYY")}</Text></HStack>
     <HStack>  <Text as='b'>Trạng thái: </Text><Text>{status}</Text></HStack>
     </VStack>
     <VStack alignItems='center' justifyContent='center'>

     <Text fontSize='2xl' as='b'>Bảng thông tin đăng ký</Text>
     <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
     <Table variant='simple'>
          {/* <Thead>
            <Tr>
            <Th>Chiều cao</Th>
              <Th>Cân nặng</Th>
              <Th>Trong 24h có uống rượu không</Th>
              <Th>Địa điểm</Th>
              <Th>Số máu đã hiến</Th>
            </Tr>
          </Thead> */}
          <Tbody>
            
              {bookings.filter(i=>id.includes(i.iduser)).sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).map((bloodDonate, index) => {
                const {  heigh,weight,sex, isAcohol,createdAt, isNicotine,id,isHeartDisease,isSitUp, isSick,isAllergies} =
                bloodDonate;
              
              return (
                 <>
                <Tr key={index}>
             
                   <Td>Chiều cao</Td> 
                <Td>{heigh} cm</Td>
       
                </Tr>
                <Tr key={index}>
             
                <Td>Cân năng</Td> 
             <Td>{weight} kg</Td>
    
             </Tr>

             <Tr key={index}>
             
             <Td>Giới tính</Td> 
          <Td>{sex}</Td>
 
          </Tr>
             <Tr key={index}>
             
             <Td>Trong 24 giờ qua có sử dụng rượu bia không</Td> 
          <Td>{isAcohol}</Td>
 
          </Tr>
          <Tr key={index}>
             
             <Td>Trong 24 giờ qua có sử dụng thuốc lá không</Td> 
          <Td>{isNicotine}</Td>
 
          </Tr>
          <Tr key={index}>
             
             <Td>Có thức khuya những này trước không</Td> 
          <Td>{isSitUp}</Td>
 
          </Tr>
          <Tr key={index}>
             
             <Td>Có tiền sử mắc các bệnh tim mạch không</Td> 
          <Td>{isHeartDisease}</Td>
 
          </Tr>
          <Tr key={index}>
             
             <Td>Trong tuần qua có mắc bệnh phải dùng thuốc không</Td> 
          <Td>{isSick}</Td>
 
          </Tr>
          <Tr key={index}>
             
             <Td>Có dị ứng với thuốc nào không</Td> 
          <Td>{isAllergies}</Td>
 
          </Tr>
             </>
              );
           
               })}
              
          </Tbody>
        </Table>
        </SimpleGrid>
        </VStack>
        </HStack>
   
     
    </VStack>
  );
}

export default BookingDetail;
