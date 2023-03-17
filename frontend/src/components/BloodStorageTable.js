import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useBloodStorageContext } from '../context/bloodStorage_context';
import { Link } from 'react-router-dom';
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

  HStack,
  Spinner,

  useToast,
} from '@chakra-ui/react';
import UpdateBloodStorageModal from './UpdateBloodStorageModal';
import { formatPrice } from '../utils/helpers';
import moment from 'moment';

function BloodStoragesTable({ bloodStorages }) {
  const toast = useToast();
  const { fetchBloodStorages, deleteBloodStorage } = useBloodStorageContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteBloodStorage(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchBloodStorages();
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
              <Th>Tên</Th>
              <Th>Số lượng</Th> 
              <Th>Từ/Đến</Th>
              
              <Th>Mô tả</Th>
              <Th>Ngày</Th>
              <Th>Loại</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {bloodStorages.map((bloodStorage, index) => {
              const {  name, amount, from,date, type,detail,id } =
                bloodStorage;
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                  <Td>{name}</Td>
                  <Td>{formatPrice(amount)} Đơn vị</Td>
                  
                  <Td>{from}</Td>
                  
                  <Td>{detail}</Td>
                  <Td>{moment(date).format("D/M/YYYY")}</Td>
                  <Td>{type}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        <Link to={`/bloodStorages/${id}`}>
                          <MenuItem>Xem</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateBloodStorageModal id={id} />
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

export default BloodStoragesTable;
