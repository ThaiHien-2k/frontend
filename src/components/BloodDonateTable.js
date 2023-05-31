import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useBloodDonateContext } from '../context/bloodDonate_context';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
  useDisclosure,
  HStack,
  Spinner,

  useToast,
} from '@chakra-ui/react';
import UpdateBloodDonateModal from './UpdateBloodDonateModal';
import UpdateStatusBloodDonateModal from './UpdateStatusBloodDonateModal'
import { formatPrice } from '../utils/helpers';
import axios from 'axios';
import { useStaffContext } from '../context/staff_context';
import { bloodDonates_url, staffs_url } from '../utils/constants';

function BloodDonatesTable({ bloodDonates }) {
  const toast = useToast();
  const { fetchBloodDonates,fetchSingleBloodDonate, deleteBloodDonate } = useBloodDonateContext();
  const [loading, setLoading] = useState(false);

  // const [nameList, setNameList] = useState([]);
 
  // const handleClick=(e)=>{
  //   setStaffList(oldMessages => [e, ...oldMessages])
  //  console.log(e);
  
  // }
  
  const {
    staffs,
    updateStaff
  } = useStaffContext();
  
  // const handleChange = e => {
  //   setNameList(e);
  //   setStaffList( [nameList.map(index=> index.value)])
  //   // console.log(e)
   
  // }

  const handleDelete = async (id) => {
    setLoading(true);
    const data = await axios.get(bloodDonates_url+'/'+id);
    console.log(data.data.data.staffList);
    data.data.data.staffList.map((index) =>
    {
      
      const res = axios.get(staffs_url+'/supTime/'+index) .then(function (response) {
        const staff = {
  
          suppostTime: response.data.data-1,
      
        };
        const responseCreate =  updateStaff(index, staff);
       
      });
    })
    const response = await deleteBloodDonate(id);
    setLoading(false);
    if (response.success) {
     
    
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // window.location.reload(true);
      return await fetchBloodDonates();
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
              <Th>Tên buổi hiến</Th>
              <Th>Thời gian</Th>
              <Th>Địa điểm</Th>
              <Th>Mục tiêu</Th>
              <Th>Thu được</Th>
              <Th>Trạng thái</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {bloodDonates.map((bloodDonate, index) => {
              const {  name, time,timeF, address, target,receive,status,donate,id } =
                bloodDonate;
                
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                {/* +'-'+timeF.substring(12,5) */}
                  <Td>{time.substr(10,5)+'-'+timeF.substr(10,5)}
                  <br/>{moment(timeF.substring(0,10)).format('DD/MM/YYYY')}
                  </Td>
                  <Td>{address}</Td>
                  <Td>{formatPrice(target)} Đơn vị</Td>
                  <Td>{formatPrice(receive)} Đơn vị</Td>
                  <Td>{status}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        <Link to={`/bloodDonates/${id}`} id={id}>
                          <MenuItem>Xem</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateStatusBloodDonateModal id={id} />
                        </MenuItem>
                        <MenuItem>
                          <UpdateBloodDonateModal id={id} />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(id)}>
                          Xóa
                        </MenuItem>
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

export default BloodDonatesTable;
