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
  Button,
  // Box,
  SimpleGrid,
  // Tag,
} from '@chakra-ui/react';

import { useBloodDonateContext } from '../context/bloodDonate_context';
// import { Stars } from '.';
import moment from 'moment';
import axios from 'axios';
// import cmt_url from '../utils/constants';
import {
    cmt_url,
    deletecmt_url
  
  } from '../utils/constants';

function PostDetail({ post }) {

  const {
    _id: id = '',
    name = '',
    title='',
    content='',
    like,
    createdAt,
    status,
 
  } = post;


  const [suppost, setSuppost] = useState([]);


  const getdata =  async() => {
    const response = await axios.get(cmt_url)
  
    setSuppost(response.data.data);

    console.log(response.data.data);
}

  
    useEffect(()=>{
     

  getdata();
      },[]);


      const handleDelete = async (id) => {
       
        const response = await axios.delete(deletecmt_url+id);
        getdata();
      
      
      };
  

  return (
    <VStack alignItems='left' justifyContent='left'>
      <Text fontSize='4xl' as='b'>THÔNG TIN BÀI VIẾT</Text>
       <VStack alignItems='left' justifyContent='left'>
      <HStack><Text as='b'>Tên người đăng: </Text><Text>{name}</Text></HStack>
     <HStack> <Text as='b'>Tiêu đề: </Text><Text>{title}</Text></HStack>
     <HStack> <Text as='b'>Số like: </Text><Text>{like}</Text></HStack>
     <HStack><Text as='b'>Ngày đăng: </Text><Text>{new Intl.DateTimeFormat('vn-VN', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(createdAt)}</Text></HStack>
     <HStack><Text as='b'>Trạng thái: </Text><Text>{status}</Text></HStack>
     <HStack> <Text as='b'>Nội dung: </Text><Text>{content}</Text></HStack>
   
     </VStack>
     <VStack></VStack>
     <Text fontSize='2xl' as='b'>Bảng thống kê các bình luận</Text>
     <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
     <Table variant='simple'>
     
          <Thead>
            <Tr>
            <Th>STT</Th>
              <Th>Tên nguời bình luận</Th>
              <Th>Thời gian</Th>
              <Th>Bình luận</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {suppost.sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).filter(i=>id.includes(i.idPost)).map((sup, index) => {
              const {  name, comment,createdAt,id } =
              sup;
                // console.log(staffList.map(index=>index))
                // console.log(id)
               
              return (
                 
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                
                <Td>{moment(Date(createdAt)).format('MM:HHA DD/MM/YYYY')}</Td>
                <Td>{comment}</Td>
                <Td>
                <Button
                        variant='outline'
                        colorScheme='red'
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </Button>
                      </Td>
                </Tr>
              );
             
            })}
          </Tbody>
        </Table>
        </SimpleGrid>
    </VStack>
  );
}

export default PostDetail;
