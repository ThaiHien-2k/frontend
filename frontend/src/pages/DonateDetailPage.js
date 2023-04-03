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
import { Input } from 'semantic-ui-react';
import { useEffect,useState } from 'react';
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
  
  const [donateList, setDonateList] = useState([]);

  function setSearchTerm(e){
    // staffs = staffs.filter(staff => staff.countryID < 60);
    const results = donates.filter(donate => {
      if (e === "") return donateList
      return donate.name.toLowerCase().includes(e.toLowerCase())
      })
      setDonateList(results);
    console.log(donates);
  }

  useEffect(() => {
    setDonateList(donates);
 

}, [])
// console.log(donates);
  return (
    <SidebarWithHeader>
      <HStack mb={5}>
      <Input icon='search'
       placeholder='Nhập tên cần tìm' 
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      />
        <CreateNewDonateModal  id={id} />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button>
       
      </HStack>
     
      <DonateDetail donates={donateList}  id={id}/>
    </SidebarWithHeader>
  );
}

export default DonateDetailPage;
