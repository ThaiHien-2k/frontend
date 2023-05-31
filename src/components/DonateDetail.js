import React, { useState } from 'react';
// import { BiChevronDown } from 'react-icons/bi';
import { useDonateContext } from '../context/donate_context';
// import { Link } from 'react-router-dom';
// import moment from 'moment';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
 
  Button,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  SimpleGrid,

  HStack,
  Spinner,

  useToast,
} from '@chakra-ui/react';
// import UpdateDonateModal from './UpdateDonateModal';
// import UpdateStatusDonateModal from './UpdateStatusDonateModal'
// import { formatPrice } from '../utils/helpers';
import { useInforContext } from '../context/infor_context';
function DonateDetail({ donates, id }) {
  const toast = useToast();
  const { fetchDonates, deleteDonate } = useDonateContext();
  const [loading, setLoading] = useState(false);
  const [donateTime, setDonateTime] = useState('');
  const donateID = id; 
  // console.log(id);
  const {
    // infors,
    // fetchSingleInfor,
    updateInfor,
    // updateNewInforDetails
  } = useInforContext();

  const handleDelete = async (id,iduser) => {
    setLoading(true);
    const response = await deleteDonate(id);
    setLoading(false);
    if (response.success) {
    
      const time = donateTime-1;
      const infor = {
        status:'Có thể hiến',
        donateTime: time,
        
    };
  
    const updatetime = await updateInfor(iduser, infor);
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchDonates();
    } else {
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
              <Th>Tên người hiến</Th>
              <Th>Lượng máu hiến</Th>
              <Th>Nhóm máu</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {donates.filter(index=> index.idBD.includes(donateID)).map((donate, index) => {
              const {  name,id,typeBlood ,amount,iduser,idBD} =
                donate;
        if(donateID===idBD){
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                <Td>{amount}ml</Td>
    
                  <Td>{typeBlood}</Td>
                  <Td>
                  <Button
                        variant='outline'
                        colorScheme='red'
                        onClick={() => handleDelete(id,iduser)}
                      >
                        Delete
                      </Button>
                  </Td>
                </Tr>
              );}
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default DonateDetail;
