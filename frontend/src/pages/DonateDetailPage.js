import React from 'react';
import {
//   donateTable,
  SidebarWithHeader,
//   CreateNewDonateModal,
} from '../components';
// import DonateTable from '../components/DonateTable';
import DonateDetail from '../components/DonateDetail';
import CreateNewDonateModal from '../components/CreateNewDonateModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
// import { useDonateContext } from '../context/donate_context';
import { useDonateContext } from '../context/donate_context';
import { useParams } from 'react-router-dom';

function DonateDetailPage() {
  const { id } = useParams();
  const {
    donates,
    donates_loading: loading,
    donates_error: error,
    fetchDonates,
  } = useDonateContext();

  const{
    fetchSingleDonate
  } = useDonateContext();

  const handleRefresh = async () => {
    await fetchSingleDonate(id);
  };
  console.log(id)

// console.log(donates);
  return (
    <SidebarWithHeader>
      <HStack mb={5}>
        <CreateNewDonateModal  id={id}/>
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button>
       
      </HStack>
     
      <DonateDetail donates={donates}  id={id}/>
    </SidebarWithHeader>
  );
}

export default DonateDetailPage;
