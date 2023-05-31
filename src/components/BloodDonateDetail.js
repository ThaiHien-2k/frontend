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
  Spinner,
  // Box,
//   toast,
useToast,
  SimpleGrid,
  Button
  // Tag,
} from '@chakra-ui/react';
// import { formatPrice } from '../utils/helpers';
// import { useAdminContext } from '../context/admin_context';
import { useBloodDonateContext } from '../context/bloodDonate_context';
import { staffs_url } from '../utils/constants';
import { useStaffContext } from '../context/staff_context';
import { useDonateContext } from '../context/donate_context';
import { bloodDonates_url } from '../utils/constants';
// import { Stars } from '.';
import moment from 'moment';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useInforContext } from '../context/infor_context';

function BloodDonateDetail({ bloodDonate }) {
  // const { admins } = useAdminContext();
const toast =useToast();
const [loading, setIsLoaded] = useState(false);
  // const { single_bloodDonate_loading: loading } = usebloodDonateContext();
  // const [createdBy, setCreatedBy] = useState('');
  // const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
    time='',
    address='',
    target,
    receive,
    timeF='',
    staffList,
    status,
    A,O,B,AB
  } = bloodDonate;
  const idBD =id;
  const {
    staffs,
    // bloodDonates_loading: loading,
    // bloodDonates_error: error,
    fetchStaffs,
    updateStaff
  } = useStaffContext();

  const {
    donates,
   
  } = useDonateContext();
  const {
    bloodDonates,
    // bloodDonates_loading: loading,
    // bloodDonates_error: error,
    fetchBloodDonates,
    updateBloodDonate
  } = useBloodDonateContext();

  const {
    infors,

    fetchInfors,
  } = useInforContext();
  // console.log(bloodDonates);
 
  const [suppost, setSuppost] = useState([]);
  const [supID, setSupID] = useState([]);

  const [donate, setDonate] = useState([]);

  const [data, setData] = useState([]);

    useEffect(()=>{
      const getdata =  () => {
        donate.push(bloodDonates.filter(index=> index.id.includes(id)).map(index=>index.staffList));
        // donate.foreach(index=>index.idBD)
    
        setData(staffs.filter(index=>  donate[0][0].includes(index.id)).map(index=>index));
  }     

      const getSup=()=>{
        supID.push(donates.filter(index=> index.idBD.includes(id)).map(index=>index.iduser));
        // donate.foreach(index=>index.idBD)
       
        setSuppost((infors.filter(index=>  supID[0].includes(index.id))));
      
      }
      
      // console.log(infors)

  getdata();
  getSup();
      },[]);
      console.log(suppost)
    
      const getAmount=(idU)=>{
        return donates.filter(index=> index.iduser.includes(idU)).filter(index=> index.idBD.includes(id)).map(index=>index.amount);
        // supID.push(donates.filter(index=> index.idBD.includes(id)).map(index=>index.iduser));
        // // donate.foreach(index=>index.idBD)
       
        // setSuppost((infors.filter(index=>  supID[0].includes(index.id))));
      
      }
      
      // console.log(infors)

    
  // getSup();
  return (
    
   
     <HStack alignItems='left' justifyContent='left'> 
    
        <VStack  alignItems='left' justifyContent='left' >
      <Text fontSize='4xl' as='b'>THÔNG TIN BUỔI HIẾN MÁU</Text>
       {/* <VStack alignItems='left' justifyContent='left'> */}
      <HStack><Text as='b'>Tên buổi hiến: </Text><Text>{name}</Text></HStack>
     <HStack> <Text as='b'>Thời gian: </Text><Text>{time.substr(10,5)+'-'+timeF.substr(10,5)+'  '+moment(timeF.substring(0,10)).format('DD/MM/YYYY')}</Text></HStack>
     <HStack> <Text as='b'>Địa điểm: </Text><Text>{address}</Text></HStack>
     <HStack><Text as='b'>Mục tiêu: </Text><Text>{target}</Text></HStack>
     <HStack><Text as='b'>Thu được: </Text><Text>{receive}</Text></HStack>
     <HStack>  <Text as='b'>Trạng thái: </Text><Text>{status}</Text></HStack>
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
        <HStack spacing='100px'>
        <VStack  alignItems='left' justifyContent='left' >
        <Text as='b'>Bảng nhân viên hỗ trợ: </Text>
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
              <Th>Họ và tên</Th>
              <Th>SĐT</Th>
              <Th>Loại nhân viên</Th>
             
            </Tr>
          </Thead>
          <Tbody>
            {data.map((sup, index) => {
              const {  name, phone, type,id } =
              sup;
                // console.log(staffList.map(index=>index))
                // console.log(id)
               
              return (
                 
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                  <Td>{phone}</Td>
                  <Td>{type}</Td>
                  {/* <Td> <Button
                        variant='outline'
                        colorScheme='red'
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </Button></Td> */}
                
                </Tr>
              );
             
            })}
          </Tbody>
        </Table>)}
        </SimpleGrid>
        </VStack>

        <VStack  alignItems='left' justifyContent='left' >
        <Text as='b'>Bảng những người hiến máu: </Text>
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
              <Th>Nhóm máu</Th>
              <Th>Số lượng hiến</Th>
            </Tr>
          </Thead>
          <Tbody>
            {suppost.map((sup, index) => {
              const {  name, typeBlood, countryID,id } =
              sup;
                // console.log(staffList.map(index=>index))
                // console.log(id)
               
              return (
                 
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{countryID}</Td>
                  <Td>{name}</Td>
                  <Td>{typeBlood}</Td>
                  <Td>{getAmount(id)}</Td>
                  {/* <Td> <Button
                        variant='outline'
                        colorScheme='red'
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </Button></Td> */}
                
                </Tr>
              );
             
            })}
          </Tbody>
        </Table>)}
        </SimpleGrid>
        
        </VStack>
        </HStack>
     </VStack>
     
        </HStack>
 
  );
}

export default BloodDonateDetail;
