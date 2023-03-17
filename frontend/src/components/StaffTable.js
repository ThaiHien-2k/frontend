import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useStaffContext } from '../context/staff_context';
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
import UpdateStaffModal from './UpdateStaffModal';

function StaffsTable({ staffs }) {
  const toast = useToast();
  const { fetchStaffs, deleteStaff } = useStaffContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteStaff(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchStaffs();
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
              <Th>SĐT</Th>
              <Th>Địa chỉ</Th>
              <Th>Loại nhân viên</Th>
              <Th>Số lần đã hỗ trợ</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {staffs.map((staff, index) => {
              const {  name, countryID,phone, address, suppostTime,type,id } =
                staff;
                console.log(staff);
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                  <Td>{countryID}</Td>
                  <Td>{name}</Td>
                  <Td>{phone}</Td>
                  <Td>{address}</Td>
                  <Td>{type}</Td>
                  <Td>{suppostTime}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        <Link to={`/staffs/${id}`}>
                          <MenuItem>Xem</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateStaffModal id={id} />
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

export default StaffsTable;
