import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useInforContext } from '../context/infor_context';
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
import UpdateInforModal from './UpdateInforModal';

function InforsTable({ infors }) {
  const toast = useToast();
  const { fetchInfors, deleteInfor } = useInforContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteInfor(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchInfors();
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
              <Th>CMND/CCCD</Th>
              <Th>Họ và tên</Th>
              <Th>Địa chỉ</Th>
              <Th>Loại nhân viên</Th>
              <Th>Số lần đã hỗ trợ</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {infors.map((infor, index) => {
              const {  name, countryID, address, email,phone,id } =
                infor;
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                  <Td>{countryID}</Td>
                  <Td>{name}</Td>
                  <Td>{address}</Td>
                  <Td>{email}</Td>
                  <Td>{phone}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        <Link to={`/infors/${id}`}>
                          <MenuItem>Xem</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateInforModal id={id} />
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

export default InforsTable;
