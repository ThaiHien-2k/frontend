import React, { useEffect, useState } from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import OpacityIcon from '@mui/icons-material/Opacity';
import PeopleIcon from '@mui/icons-material/People';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import {
  Flex,
  Icon,
  Square,
  Spacer,
  Text,
  Heading,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { cashFlow_remaining,bloodStorage_remaining, bloodDonates_remaining,admins_url} from '../utils/constants';
import axios from 'axios';
import { formatPrice } from '../utils/helpers';


function DashboardCards() {
  
  // const [age, setAge] = useState(42);
  // const [todos, setTodos] = useState(() => createTodos());
  const [remainList, setRemainlist] = useState({total:''});
  useEffect(()=>{
  const fetchCashFlowsRemaining = async () => {
   
      const response = await axios.get(cashFlow_remaining);
     
      setRemainlist(response.data);
  };
  fetchCashFlowsRemaining();
},[]);

const [bloodRemainList, setBloodRemainlist] = useState({total:''});

useEffect(()=>{
const fetchBloodsRemaining = async () => {
 
    const response = await axios.get(bloodStorage_remaining);
   
    setBloodRemainlist(response.data);

};
fetchBloodsRemaining();
},[]);

const [bloodDonateRemainList, setBloodDonateRemainlist] = useState({total:''});

useEffect(()=>{
const fetchBloodDonatesRemaining = async () => {
 
    const response = await axios.get(bloodDonates_remaining);
   
    setBloodDonateRemainlist(response.data);

};
fetchBloodDonatesRemaining();
},[]);


const [accountList, setAccountlist] = useState({total:''});

useEffect(()=>{
const fetchAccounts = async () => {
 
    const response = await axios.get(admins_url);
   
    setAccountlist(response.data);

};
fetchAccounts();
},[]);







  const cardList = [
    {
      title: 'Số lượng tài khoản',
      value: accountList.total,
      icon: PeopleIcon,
      color: 'brown.500',
    },
    {
      title: 'Số buổi hiến máu đang tổ chức',
      value: bloodDonateRemainList.total,
      icon: VolunteerActivismIcon,
      color: 'red.500',
    },
    {
      title: 'Số máu còn lại',
      value: bloodRemainList.total + ' đơn vị',
      icon: OpacityIcon,
      color: 'blue.500',
    },
    {
      title: 'Số tiền còn lại',
      value: formatPrice(remainList.total) + 'đ',
      icon: AttachMoneyIcon,
      color: 'green.500',
    },
  ];

  return (
    <SimpleGrid minChildWidth='250px' spacing={5} mb={5}>
      {cardList.map((card, index) => {
        const { title, value, icon, color } = card;
        return (
          <Flex
            key={index}
            shadow='lg'
            bg='white'
            p='5'
            borderRadius='lg'
            justifyContent='center'
          >
            <Box>
              <Text fontSize='lg' color='gray.500'>
                {title}
              </Text>
              <Heading size='lg' color={color}>
                {value}
              </Heading>
            </Box>
            <Spacer />
            <Square size='60px' bg='brown.400' borderRadius='lg'>
              <Icon as={icon} color='white' />
            </Square>
          </Flex>
        );
      })}
    </SimpleGrid>
  );
}

export default DashboardCards;
