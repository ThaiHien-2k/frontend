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
import { Input } from 'semantic-ui-react';
import { useEffect,useState } from 'react';
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
  
  const [bloodDonateList, setBloodDonateList] = useState([]);

  function setSearchTerm(e){
    // staffs = staffs.filter(staff => staff.countryID < 60);
    const results = bloodDonates.filter(bloodDonate => {
      if (e === "") return bloodDonateList
      return bloodDonate.name.toLowerCase().includes(e.toLowerCase())
      })
      setBloodDonateList(results);
    console.log(bloodDonates);
  }

  useEffect(() => {
    setBloodDonateList(bloodDonates);
 

}, [])

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
      <Input icon='search'
       placeholder='Nhập tên cần tìm' 
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      />
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
      <BloodDonatesTable bloodDonates={bloodDonateList} />
    </SidebarWithHeader>
  );
}

export default BloodDonatesPage;
