import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
 
//   InforDetail,

} from '../components';
import InforDetail from '../components/InforDetail';
import { useInforContext } from '../context/infor_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function InforDetaislPage() {
  const { id } = useParams();
  const {
    single_infor_loading: loading,
    single_infor_error: error,
    single_infor: infor,
    fetchSingleInfor,
  } = useInforContext();

  useEffect(() => {
    fetchSingleInfor(id);
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
     
        <InforDetail infor={infor} />
      </Stack>
     
    </SidebarWithHeader>
  );
}

export default InforDetaislPage;
