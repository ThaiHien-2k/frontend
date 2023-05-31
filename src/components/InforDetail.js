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

function InforDetail({ infor }) {
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

  const {
    donates,
   
  } = useDonateContext();

  const {
    bloodDonates,
    // bloodDonates_loading: loading,
    // bloodDonates_error: error,
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
      const idU = id;
  
      const getAmount =  (id) => {
        // if( donates.filter(index=>index.idBD).includes(id)){
      
        return donates.filter(index=> index.idBD.includes(id)).filter(index=> index.iduser.includes(idU)).map(index=>index.amount);
      // }
        // console.log(donates.map(index=>index.idBD).includes(id));
     }    
     const getDate =  (id) => {
      // if( donates.filter(index=>index.idBD).includes(id)){
    
      return donates.filter(index=> index.idBD.includes(id)).filter(index=> index.iduser.includes(idU)).map(index=>index.createdAt).toString();
    // }
      // console.log(donates.map(index=>index.idBD).includes(id));
   }     
     
   getDate();
     getAmount();

  // console.log(moment('2023-04-21T06:23:22.478Z').format("D/M/YYYY"))

  return (
    <VStack alignItems='left' justifyContent='left'>
      <Text fontSize='4xl' as='b'>THÔNG TIN NGƯỜI HIẾN</Text>
       <VStack alignItems='left' justifyContent='left'>
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
     <VStack></VStack>
     <Text fontSize='2xl' as='b'>Bảng thống kê các lần hiến máu</Text>
     <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
     <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>Lần hiến</Th>
              <Th>Tên buổi hiến</Th>
              <Th>Ngày hiến</Th>
              <Th>Địa điểm</Th>
              <Th>Số máu đã hiến</Th>
            </Tr>
          </Thead>
          <Tbody>
            
              {data.sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).map((bloodDonate, index) => {
                const {  name, time,createdAt, address,id } =
                bloodDonate;
              
              return (
                 
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                  <Td>{  new Intl.DateTimeFormat('vn-VN', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'})
        .format(getDate(id))}</Td>
                  <Td>{address}</Td>
                  <Td>{getAmount(id)}ml</Td>
                </Tr>
              );
           
               })}
              
          </Tbody>
        </Table>
        </SimpleGrid>
    </VStack>
  );
}

export default InforDetail;
