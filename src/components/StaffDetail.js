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
// import { useAdminContext } from '../context/admin_context';
// import { useStaffContext } from '../context/staff_context';
// import { bloodDonates_url } from '../utils/constants';
import { useBloodDonateContext } from '../context/bloodDonate_context';
// import { Stars } from '.';
import moment from 'moment';
// import axios from 'axios';

function StaffDetail({ staff }) {
  // const { admins } = useAdminContext();

  // const { single_staff_loading: loading } = useStaffContext();
  // const [createdBy, setCreatedBy] = useState('');
  // const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
    countryID='',
    address='',
    phone,
    from,
    type,
    suppostTime,
  } = staff;

  const {
    bloodDonates,
    // bloodDonates_loading: loading,
    // bloodDonates_error: error,
    // fetchBloodDonates,
  } = useBloodDonateContext();

  const [suppost, setSuppost] = useState([]);



    useEffect(()=>{
      const getdata =  () => {
   
        setSuppost(bloodDonates.filter(index=> index.staffList.includes(id)));

    console.log(suppost);
  }

      

  getdata();
      },[]);



  

  return (
    <VStack alignItems='left' justifyContent='left'>
      <Text fontSize='4xl' as='b'>THÔNG TIN NHÂN VIÊN</Text>
       <VStack alignItems='left' justifyContent='left'>
      <HStack><Text as='b'>CMND/CCCD: </Text><Text>{countryID}</Text></HStack>
     <HStack> <Text as='b'>Họ và tên: </Text><Text>{name}</Text></HStack>
     <HStack> <Text as='b'>Địa chỉ: </Text><Text>{address}</Text></HStack>
     <HStack><Text as='b'>Số điện thoại: </Text><Text>{phone}</Text></HStack>
     <HStack><Text as='b'>Đơn vị: </Text><Text>{from}</Text></HStack>
     <HStack> <Text as='b'>Loại nhân viên: </Text><Text>{type}</Text></HStack>
     <HStack>  <Text as='b'>Số lần hỗ trợ: </Text><Text>{suppostTime}</Text></HStack>
     </VStack>
     <VStack></VStack>
     <Text fontSize='2xl' as='b'>Bảng thống kê các lần hỗ trợ</Text>
     <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
     <Table variant='simple'>
     
          <Thead>
            <Tr>
            <Th>Lần hỗ trợ</Th>
              <Th>Tên buổi hiến</Th>
              <Th>Thời gian</Th>
              <Th>Địa điểm</Th>

            </Tr>
          </Thead>
          <Tbody>
            {suppost.sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).map((sup, index) => {
              const {  name, time,timeF, address,staffList } =
              sup;
                // console.log(staffList.map(index=>index))
                // console.log(id)
               
              return (
                 
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                <Td>{time.substr(10,5)+'-'+timeF.substr(10,5)}
                  <br/>{moment(timeF.substring(0,10)).format('DD/MM/YYYY')}
                  </Td>
              
                  <Td>{address}</Td>
        
                </Tr>
              );
             
            })}
          </Tbody>
        </Table>
        </SimpleGrid>
    </VStack>
  );
}

export default StaffDetail;
