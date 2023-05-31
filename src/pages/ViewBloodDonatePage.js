import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
 
//   BloodDonateDetail,

} from '../components';
import BloodDonateDetail from '../components/BloodDonateDetail';
import { useBloodDonateContext } from '../context/bloodDonate_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function ViewBloodDonatePage() {
  const { id } = useParams();
  const {
    single_bloodDonate_loading: loading,
    single_bloodDonate_error: error,
    single_bloodDonate: bloodDonate,
    fetchSingleBloodDonate,
  } = useBloodDonateContext();
// console.log(id);

  useEffect(() => {
    fetchSingleBloodDonate(id);
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
     
        <BloodDonateDetail bloodDonate={bloodDonate} />
      </Stack>
     
    </SidebarWithHeader>
  );
}

export default ViewBloodDonatePage;
