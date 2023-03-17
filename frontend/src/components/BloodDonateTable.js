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

  HStack,
  Spinner,

  useToast,
} from '@chakra-ui/react';
import UpdateBloodDonateModal from './UpdateBloodDonateModal';
import UpdateStatusBloodDonateModal from './UpdateStatusBloodDonateModal'
import { formatPrice } from '../utils/helpers';
function BloodDonatesTable({ bloodDonates }) {
  const toast = useToast();
  const { fetchBloodDonates, deleteBloodDonate } = useBloodDonateContext();
  const [loading, setLoading] = useState(false);

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
              <Th>Mục tiêu</Th>
              <Th>Thu được</Th>
              <Th>Trạng thái</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {bloodDonates.map((bloodDonate, index) => {
              const {  name, time, address, target,receive,status,id } =
                bloodDonate;
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                  <Td>{moment(time).format("MM:HHA D/M/YYYY")}</Td>
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
                        <Link to={`/bloodDonate/${id}`}>
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
