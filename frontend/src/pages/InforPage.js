import React from 'react';
import {
//   InforsTable,
  SidebarWithHeader,
//   CreateNewInforModal,
} from '../components';
import InforsTable from '../components/InforTable';

import CreateNewInforModal from '../components/CreateNewInforModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useInforContext } from '../context/infor_context';

function InforsPage() {
  const {
    infors,
    infors_loading: loading,
    infors_error: error,
    fetchInfors,
  } = useInforContext();

  const handleRefresh = async () => {
    await fetchInfors();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewInforModal />
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
          <CreateNewInforModal />
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
        <CreateNewInforModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button>
      </HStack>
      <InforsTable infors={infors} />
    </SidebarWithHeader>
  );
}

export default InforsPage;
