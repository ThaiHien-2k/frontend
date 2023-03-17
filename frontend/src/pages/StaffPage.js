import React from 'react';
import {
//   StaffsTable,
  SidebarWithHeader,
//   CreateNewStaffModal,
} from '../components';
import StaffsTable from '../components/StaffTable';

import CreateNewStaffModal from '../components/CreateNewStaffModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useStaffContext } from '../context/staff_context';

function StaffsPage() {
  const {
    staffs,
    staffs_loading: loading,
    staffs_error: error,
    fetchStaffs,
  } = useStaffContext();

  const handleRefresh = async () => {
    await fetchStaffs();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewStaffModal />
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Tải lại
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewStaffModal />
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Tải lại
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <HStack mb={5}>
        <CreateNewStaffModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button>
      </HStack>
      <StaffsTable staffs={staffs} />
    </SidebarWithHeader>
  );
}

export default StaffsPage;
