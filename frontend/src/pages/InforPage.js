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
import { useState ,useEffect} from 'react';
import { Input } from 'semantic-ui-react';
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

  const [inforList, setInforList] = useState([]);

  function setSearchTerm(e){
    // staffs = staffs.filter(staff => staff.countryID < 60);
    const results = infors.filter(infor => {
      if (e === "") return inforList
      return infor.name.toLowerCase().includes(e.toLowerCase())
      })
      setInforList(results);
    console.log(infors);
  }

  useEffect(() => {
    setInforList(infors);
 

}, [])
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
      <Input icon='search'
       placeholder='Nhập tên cần tìm' 
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      />
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
      <InforsTable infors={inforList} />
    </SidebarWithHeader>
  );
}

export default InforsPage;
