import React,{useState,useEffect} from 'react';
import {
//   donateTable,
  SidebarWithHeader,
//   CreateNewbloodDonateModal,
} from '../components';
// import DonateTable from '../components/BloodDonateTable';
import DonateTable from '../components/DonateTable';
// import CreateNewBloodDonateModal from '../components/CreateNewBloodDonateModal';
import { HStack } from '@chakra-ui/react';
// import { MdOutlineRefresh } from 'react-icons/md';
import { useBloodDonateContext } from '../context/bloodDonate_context';


function DonatePage() {
  const {
    bloodDonates,
    // bloodDonates_loading: loading,
    // bloodDonates_error: error,
    fetchBloodDonates,
  } = useBloodDonateContext();

  // const handleRefresh = async () => {
  //   // await fetchBloodDonates();
  // };
  

  const [data, setData] = useState([]);



    useEffect(()=>{
      const getdata =  () => {
   
        setData(bloodDonates.filter(index=> index.status.includes('Chưa thực hiện')));

    console.log(data);
  }

      

  getdata();
      },[]);

  return (
    <SidebarWithHeader>
      <HStack mb={5}>
       
      </HStack>
    
      <DonateTable bloodDonates={data} />
    </SidebarWithHeader>
  );
}

export default DonatePage;
