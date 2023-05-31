import React, { useState } from 'react';
// import { BiChevronDown } from 'react-icons/bi';
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
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  SimpleGrid,

  HStack,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
// import UpdateBloodDonateModal from './UpdateBloodDonateModal';
// import UpdateStatusBloodDonateModal from './UpdateStatusBloodDonateModal'
import { useDonateContext } from '../context/donate_context';
// import { formatPrice } from '../utils/helpers';
function DonateTable({ bloodDonates }) {
  const toast = useToast();
  const { fetchBloodDonates, deleteBloodDonate } = useBloodDonateContext();
  const [loading, setLoading] = useState(false);

  // const {
  //   donates,
   
  // } = useDonateContext();
  



  const handleDelete = async (id) => {
    setLoading(true);
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
              <Th>Trạng thái</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bloodDonates.map((bloodDonate, index) => {
              const {  name, time,timeF, address,status,id } =
                bloodDonate;
                if(status==='Chưa thực hiện'){
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                <Td>{time.substr(10,5)+'-'+timeF.substr(10,5)}
                  <br/>{moment(timeF.substring(0,10)).format('DD/MM/YYYY')}
                  </Td>
                  <Td>{address}</Td>
                  <Td>{status}</Td>

                  <Td>
                  <Menu>
                          <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                            Hành động
                          </MenuButton>
                          <MenuList>
                            <Link to={`/bookings/${id}`}>
                              <MenuItem>Xem danh sách hẹn</MenuItem>
                            </Link>
                            <Link to={`/donates/${id}`}>
                              <MenuItem>Chọn</MenuItem>
                            </Link>
                          
                           
                          </MenuList>
                        </Menu>
                  {/* <Button ><Link to={`/bookings/${id}`}>Xem danh sách hẹn</Link></Button><br/><br/>
                  <Button ><Link to={`/donates/${id}`}>Chọn</Link></Button> */}
                    {/* <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        <Link to={`/bloodDonate/${id}`}>
                          <MenuItem>Xem</MenuItem>
                        </Link>
                       
                        
                      </MenuList> */}
                    {/* </Menu> */}
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

export default DonateTable;
