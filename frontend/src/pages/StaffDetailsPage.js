import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
 
//   StaffDetail,

} from '../components';
import StaffDetail from '../components/StaffDetail';
import { useStaffContext } from '../context/staff_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function StaffDetaislPage() {
  const { id } = useParams();
  const {
    single_staff_loading: loading,
    single_staff_error: error,
    single_staff: staff,
    fetchSingleStaff,
  } = useStaffContext();

  useEffect(() => {
    fetchSingleStaff(id);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }


  return (
    <SidebarWithHeader>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing='8'
        alignItems='flex-start'
        bg='white'
        p='8'
        mb={4}
        borderRadius='lg'
        shadow='sm'
        overflowX='auto'
      >
     
        <StaffDetail staff={staff} />
      </Stack>
     
    </SidebarWithHeader>
  );
}

export default StaffDetaislPage;
