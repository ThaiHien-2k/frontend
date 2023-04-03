import React from 'react';
import {
//   donateTable,
  SidebarWithHeader,
//   CreateNewbloodDonateModal,
} from '../components';
// import DonateTable from '../components/BloodDonateTable';
import DonateTable from '../components/DonateTable';
import CreateNewBloodDonateModal from '../components/CreateNewBloodDonateModal';
import { HStack, VStack, Spinner, Heading, Button,Input } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useBloodDonateContext } from '../context/bloodDonate_context';

function DonatePage() {
  const {
    bloodDonates,
    bloodDonates_loading: loading,
    bloodDonates_error: error,
    fetchBloodDonates,
  } = useBloodDonateContext();

  const handleRefresh = async () => {
    await fetchBloodDonates();
  };
  
  function setSearchTerm(){
    console.log('haha')
  }


  return (
    <SidebarWithHeader>
      <HStack mb={5}>
       
      </HStack>
     {/* <Input              
                placeholder='Tên buổi hiến'
                name='name'
            
         
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              /> */}
      <DonateTable bloodDonates={bloodDonates} />
    </SidebarWithHeader>
  );
}

export default DonatePage;
