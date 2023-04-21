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
import { Input } from 'semantic-ui-react';
import { useEffect,useState } from 'react';

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

  const [cashFlowList, setCashFlowList] = useState([]);
  const [list, setList] = useState([]);

  function setSearchTerm(e){
   
    // staffs = staffs.filter(staff => staff.countryID < 60);
    const results = cashFlows.filter(i => {
      if (e === "") return  setCashFlowList(cashFlows.map(i=>i));
      else
      return i.name.toLowerCase().includes(e.toLowerCase())
      })
      setCashFlowList(results);
      console.log(cashFlows);
      console.log(cashFlowList);
  }

  useEffect(() => {
    console.log(cashFlows); cashFlowList.push(cashFlows.map(i=>i));
    console.log(cashFlowList);
   
  

}, [])

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
      <Input icon='search'
       placeholder='Nhập tên cần tìm' 
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      />
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
      <CashFlowsTable cashFlows={cashFlows.filter(i=>i.id.includes(cashFlowList.map(i=>i.id)))} />
    </SidebarWithHeader>
  );
}

export default CashFlowsPage;
