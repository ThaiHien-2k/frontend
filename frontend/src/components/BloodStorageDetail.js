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
// import { useBloodStorageContext } from '../context/BloodStorage_context';
// import { bloodDonates_url } from '../utils/constants';
import { useBloodDonateContext } from '../context/bloodDonate_context';
// import { Stars } from '.';
import moment from 'moment';
// import axios from 'axios';

function BloodStorageDetail({ bloodStorage }) {
  // const { admins } = useAdminContext();

  // const { single_bloodStorage_loading: loading } = usebloodStorageContext();
  // const [createdBy, setCreatedBy] = useState('');
  // const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
    amount='',
    from='',
    type,
    date='',
    detail,
    A,
    O,
    B,AB
  } = bloodStorage;

  const {
    bloodDonates,
    // bloodDonates_loading: loading,
    // bloodDonates_error: error,
    // fetchBloodDonates,
  } = useBloodDonateContext();





  

  return (
    <VStack alignItems='left' justifyContent='left'>
      <Text fontSize='4xl' as='b'>THÔNG TIN</Text>
       <VStack alignItems='left' justifyContent='left'>
      <HStack><Text as='b'>Tên: </Text><Text>{name}</Text></HStack>
      <HStack><Text as='b'>Số lượng: </Text><Text>{amount}ml</Text></HStack>
     <HStack> <Text as='b'>Từ/Đến: </Text><Text>{from}</Text></HStack>
     <HStack> <Text as='b'>Loại: </Text><Text>{type}</Text></HStack>
     
     <HStack><Text as='b'>Ngày thực hiện: </Text><Text>{moment(date.substring(0,10)).format('DD/MM/YYYY')}</Text></HStack>
     <HStack><Text as='b'>Mô tả: </Text><Text>{detail}</Text></HStack>
     <HStack spacing='300px' >     <VStack  alignItems='left' justifyContent='left' ><Text as='b'>Chi tiết: </Text>
     <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
     <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>O</Th>
              <Th>A</Th>
              <Th>AB</Th>
              <Th>B</Th>
             
            </Tr>
          </Thead>
          <Tbody>
         
                <Tr>
                   <Td>{O}ml</Td>
                <Td>{A}ml</Td>
                  <Td>{AB}ml</Td>
                  <Td>{B}ml</Td>
                
                </Tr>
         
          </Tbody>
        </Table>
        </SimpleGrid>
        </VStack> 
       
        </HStack>
        </VStack>
    </VStack>
  );
}

export default BloodStorageDetail;
