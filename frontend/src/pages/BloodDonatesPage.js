import React from 'react';
import {
//   bloodDonatesTable,
  SidebarWithHeader,
//   CreateNewbloodDonateModal,
} from '../components';
// import BloodDonatesTable from '../components/BloodDonateTable';
import BloodDonatesTable from '../components/BloodDonateTable';
import CreateNewBloodDonateModal from '../components/CreateNewBloodDonateModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useBloodDonateContext } from '../context/bloodDonate_context';

function BloodDonatesPage() {
  const {
    bloodDonates,
    bloodDonates_loading: loading,
    bloodDonates_error: error,
    fetchBloodDonates,
  } = useBloodDonateContext();

  const handleRefresh = async () => {
    await fetchBloodDonates();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewBloodDonateModal />
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
          <CreateNewBloodDonateModal />
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
        <CreateNewBloodDonateModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button>
      </HStack>
      <BloodDonatesTable bloodDonates={bloodDonates} />
    </SidebarWithHeader>
  );
}

export default BloodDonatesPage;
