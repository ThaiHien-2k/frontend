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
  Box,
  SimpleGrid,
  Tag,
} from '@chakra-ui/react';
import { formatPrice } from '../utils/helpers';
import { useAdminContext } from '../context/admin_context';
import { useDonateContext } from '../context/donate_context';
import { donates_url } from '../utils/constants';
import { useBloodDonateContext } from '../context/bloodDonate_context';
import { Stars } from '.';
import moment from 'moment';
import axios from 'axios';

function InforDetail({ infor }) {
  const { admins } = useAdminContext();

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
    donateTime,
  } = infor;

  const {
    donates,
   
  } = useDonateContext();

  const {
    bloodDonates,
    bloodDonates_loading: loading,
    bloodDonates_error: error,
    fetchBloodDonates,
  } = useBloodDonateContext();
  const [donate, setDonate] = useState([]);

  const [data, setData] = useState([]);

    useEffect(()=>{
      const getdata =  () => {
   
        donate.push(donates.filter(index=> index.iduser.includes(id)).map(index=>index.idBD));
        // donate.foreach(index=>index.idBD)
    
        setData(bloodDonates.filter(index=>  donate[0].includes(index.id)));
  }


  getdata();
      },[]);
  


  

  return (
    <VStack alignItems='left' justifyContent='left'>
      <Text as='b'>THÔNG TIN NGƯỜI HIẾN</Text>
       <VStack alignItems='left' justifyContent='left'>
      <HStack><Text as='b'>CMND/CCCD: </Text><Text>{countryID}</Text></HStack>
     <HStack> <Text as='b'>Họ và tên: </Text><Text>{name}</Text></HStack>
     <HStack> <Text as='b'>Địa chỉ: </Text><Text>{address}</Text></HStack>
     <HStack><Text as='b'>Số điện thoại: </Text><Text>{phone}</Text></HStack>
     <HStack><Text as='b'>Email: </Text><Text>{email}</Text></HStack>
     <HStack> <Text as='b'>Nhóm máu: </Text><Text>{typeBlood}</Text></HStack>
     <HStack>  <Text as='b'>Số lần hỗ trợ: </Text><Text>{donateTime}</Text></HStack>
     <HStack>  <Text as='b'>Trạng thái: </Text><Text>{status}</Text></HStack>
     </VStack>
     <VStack></VStack>
     <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
     <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>Lần hiến</Th>
              <Th>Tên buổi hiến</Th>
              <Th>Thời gian</Th>
              <Th>Địa điểm</Th>

            </Tr>
          </Thead>
          <Tbody>
            
              {data.map((bloodDonate, index) => {
                const {  name, time, address,id } =
                bloodDonate;
            //    if(idBD==id){
              return (
                 
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                  <Td>{moment(time).format("MM:HHA D/M/YYYY")}</Td>
                  <Td>{address}</Td>
        
                </Tr>
              );
            // }
               })}
               
          </Tbody>
        </Table>
        </SimpleGrid>
    </VStack>
  );
}

export default InforDetail;
