import React from 'react';
import {
//   StaffsTable,
  SidebarWithHeader,
//   CreateNewStaffModal,
} from '../components';
import StaffsTable from '../components/StaffTable';

import CreateNewStaffModal from '../components/CreateNewStaffModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useStaffContext } from '../context/staff_context';
import { Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useState,useEffect } from 'react';

function StaffsPage() {
  const {
    staffs,
    staffs_loading: loading,
    staffs_error: error,
    fetchStaffs,
  } = useStaffContext();

  const handleRefresh = async () => {
 
      setStaffList(staffs);

    await fetchStaffs();
  };
  const [staffList, setStaffList] = useState([]);


  useEffect(() => {
  
    setSearchTerm("");
 
       
      
  }, [])

  function setSearchTerm(e){
    // staffs = staffs.filter(staff => staff.countryID < 60);
    const results = staffs.filter(staff => {
      if (e === "") return  staffList.push(staffs.map(i=>i));
      return staff.name.toLowerCase().includes(e.toLowerCase())
      })
      setStaffList(results);
    // console.log(staffList);
  }

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewStaffModal />
          {/* <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Tải lại
          </Button> */}
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
          <CreateNewStaffModal />
          {/* <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Tải lại
          </Button> */}
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
        <CreateNewStaffModal />
        {/* <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button> */}
      </HStack>
     
      <StaffsTable staffs={staffs.filter(i=>staffList.map(i=>i.id).includes(i.id))} />
    </SidebarWithHeader>
  );
}

export default StaffsPage;
