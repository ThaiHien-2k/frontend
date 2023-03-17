import React, { useState, useEffect } from 'react';
import {
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Box,
  Tag,
} from '@chakra-ui/react';
import { formatPrice } from '../utils/helpers';
import { useAdminContext } from '../context/admin_context';
import { useStaffContext } from '../context/staff_context';
import { Stars } from '.';


function StaffDetail({ staff }) {
  const { admins } = useAdminContext();

  const { single_staff_loading: loading } = useStaffContext();
  const [createdBy, setCreatedBy] = useState('');
  const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
   
  } = staff;



  return (
    <VStack>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td>{name}</Td>
          </Tr>
         
          
        </Tbody>
      </Table>
    </VStack>
  );
}

export default StaffDetail;
