import React from 'react';
import {
//   bloodStoragesTable,
  SidebarWithHeader,
//   CreateNewbloodStorageModal,
} from '../components';

import BloodStoragesTable from '../components/BloodStorageTable';

import CreateNewBloodStorageModal from '../components/CreateNewBloodStorageModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useBloodStorageContext } from '../context/bloodStorage_context';
import { Input } from 'semantic-ui-react';
import { useEffect,useState } from 'react';
function BloodStoragesPage() {
  const {
    bloodStorages,
    bloodStorages_loading: loading,
    bloodStorages_error: error,
    fetchBloodStorages,
  } = useBloodStorageContext();

  const handleRefresh = async () => {
    await fetchBloodStorages();
  };
  const [bloodStorageList, setBloodStorageList] = useState([]);

  function setSearchTerm(e){
    // staffs = staffs.filter(staff => staff.countryID < 60);
    const results = bloodStorages.filter(bloodStorage => {
      if (e === "") return bloodStorageList
      return bloodStorage.name.toLowerCase().includes(e.toLowerCase())
      })
      setBloodStorageList(results);
    console.log(bloodStorages);
  }

  useEffect(() => {
    setBloodStorageList(bloodStorages);
 

}, [])
  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewBloodStorageModal />
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
          <CreateNewBloodStorageModal />
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
        <CreateNewBloodStorageModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button>
      </HStack>
      <BloodStoragesTable bloodStorages={bloodStorageList} />
    </SidebarWithHeader>
  );
}

export default BloodStoragesPage;
