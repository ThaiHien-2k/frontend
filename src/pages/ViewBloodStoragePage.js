import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
 
//   BloodStorageDetail,

} from '../components';
import BloodStorageDetail from '../components/BloodStorageDetail';
import { useBloodStorageContext } from '../context/bloodStorage_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function BloodStorageDetaislPage() {
  const { id } = useParams();
  const {
    single_bloodStorage_loading: loading,
    single_bloodStorage_error: error,
    single_bloodStorage: bloodStorage,
    fetchSingleBloodStorage,
  } = useBloodStorageContext();

  useEffect(() => {
    fetchSingleBloodStorage(id);
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
     
        <BloodStorageDetail bloodStorage={bloodStorage} />
      </Stack>
     
    </SidebarWithHeader>
  );
}

export default BloodStorageDetaislPage;
