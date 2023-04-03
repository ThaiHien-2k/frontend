import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useCashFlowContext } from '../context/cashFlow_context';
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
import UpdateCashFlowModal from './UpdateCashFlowModal';
import { formatPrice } from '../utils/helpers';
import moment from 'moment';
function CashFlowsTable({ cashFlows }) {
  const toast = useToast();
  const { fetchCashFlows, deleteCashFlow } = useCashFlowContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteCashFlow(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      window.location.reload(false);
      return await fetchCashFlows();
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
              <Th>Tên thu/chi</Th>
              <Th>Số tiền</Th>
              <Th>Mô tả</Th>
              
              <Th>Ngày thực hiện</Th>
              <Th>Loại</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cashFlows.map((cashFlow, index) => {
              const {  name, amount, from,date, type,id } =
                cashFlow;
              return (
                <Tr key={index}>
                  <Td>{name}</Td>
                  <Td>{formatPrice(amount)}đ</Td>
                  <Td>{from}</Td>
                  
                  <Td>{moment(date).format("D/M/YYYY")}</Td>
                  <Td>{type}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        {/* <Link to={`/cashFlow/${id}`}>
                          <MenuItem>Xem</MenuItem>
                        </Link> */}
                        <MenuItem>
                          <UpdateCashFlowModal id={id} />
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

export default CashFlowsTable;
