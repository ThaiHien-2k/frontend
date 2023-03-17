import React from 'react';
import {
//   cashFlowsTable,
  SidebarWithHeader,
//   CreateNewcashFlowModal,
} from '../components';
import CashFlowsTable from '../components/CashFlowTable';

import CreateNewCashFlowModal from '../components/CreateNewCashFlowModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useCashFlowContext } from '../context/cashFlow_context';

function CashFlowsPage() {
  const {
    cashFlows,
    cashFlows_loading: loading,
    cashFlows_error: error,
    fetchCashFlows,
  } = useCashFlowContext();

  const handleRefresh = async () => {
    await fetchCashFlows();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewCashFlowModal />
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
          <CreateNewCashFlowModal />
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
        <CreateNewCashFlowModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button>
      </HStack>
      <CashFlowsTable cashFlows={cashFlows} />
    </SidebarWithHeader>
  );
}

export default CashFlowsPage;
