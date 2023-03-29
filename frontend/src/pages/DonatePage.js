import React from 'react';
import {
//   donateTable,
  SidebarWithHeader,
//   CreateNewbloodDonateModal,
} from '../components';
// import DonateTable from '../components/BloodDonateTable';
import DonateTable from '../components/DonateTable';
import CreateNewBloodDonateModal from '../components/CreateNewBloodDonateModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
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


  return (
    <SidebarWithHeader>
      <HStack mb={5}>
       
      </HStack>
     
      <DonateTable bloodDonates={bloodDonates} />
    </SidebarWithHeader>
  );
}

export default DonatePage;
