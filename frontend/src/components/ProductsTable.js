import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { useProductContext } from '../context/product_context';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,  
  Tr,
  Th,
  Td,
  // Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  // VStack,
  HStack,
  Spinner,
  // Text,
  useToast,
} from '@chakra-ui/react';
import UpdateProductModal from './UpdateProductModal';

function ProductsTable({ products }) {
  const toast = useToast();
  const { fetchProducts, deleteProduct } = useProductContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteProduct(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchProducts();
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
              <Th>CMND/CCCD</Th>
              <Th>Họ và tên</Th>
              <Th>Địa chỉ</Th>
              <Th>Loại nhân viên</Th>
              <Th>Số lần đã hỗ trợ</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => {
              const {  name, countryID, address, suppostTime,id } =
                product;
              return (
                <Tr key={index}>
                  <Td>{name}</Td>
                  <Td>{countryID}</Td>
                  <Td>{address}</Td>
                  <Td>{suppostTime}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        <Link to={`/products/${id}`}>
                          <MenuItem>Xem</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateProductModal id={id} />
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

export default ProductsTable;
