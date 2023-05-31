import React, { useState, useRef } from 'react';
import {
  Button,
  Input,
  Text,
  FormControl,
  FormLabel,
  // FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Textarea,
  // Select,
  CheckboxGroup,
  Stack,
  // Center,
  // HStack,
  Option,
  // Image,
  // VStack,
  Checkbox,
} from '@chakra-ui/react';
// import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';
import { staffs_url } from '../utils/constants';
import { useBloodDonateContext } from '../context/bloodDonate_context';
import { Hidden } from '@mui/material';
import axios from 'axios';
import { useStaffContext } from '../context/staff_context';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { BiCheckboxChecked } from 'react-icons/bi';
// import { MultiSelect } from "react-multi-select-component";
// import { MultiSelect, Loader } from '@mantine/core';
const animatedComponents = makeAnimated();

function CreateNewBloodDonateModal() {
  const {
    new_bloodDonate: {
      name,
      // time,
      // timeF,
      address,
      target,
      // receive,
      // staffList,
      status
     
    },
    updateNewBloodDonateDetails,
    createNewBloodDonate,
  } = useBloodDonateContext();

  const {
    staffs,
    updateStaff
  } = useStaffContext();

  

  const [loading, setLoading] = useState(false);

  const [staffList, setStaffList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [hour, setHour] = useState([]);
  const [minute, setMinute] = useState([]);
 
  const [hourF, setHourF] = useState([]);
  const [minuteF, setMinuteF] = useState([]);
  // const handleClick=(e)=>{
  //   setStaffList(oldMessages => [e, ...oldMessages])
  //  console.log(e);
  
  // }

  const handleChange = y => {
    setNameList(y);
    // setStaffList( [nameList.map(index=> index.value)])
    
   
  }


 let options = staffs.map(function (index) {
  return { value: index.id, label: index.name+' - '+index.type };
})

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const handleSubmit = async () => {
   
    if (
      !name ||
      // !time ||
      !address ||
      !target ||
      // !receive ||
      !staffList ||
      !status 
    ) {
      return toast({
        position: 'top',
        description: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
    setLoading(true);
    console.log('uploading');
   
    const bloodDonate = {
        name,
      time:hourF+minute,
      timeF:hourF+minuteF,
      address,
      target,
      // receive,
      staffList:nameList.map(index=> index.value),
      status
    };
    // console.log(bloodDonate);
    const responseCreate = await createNewBloodDonate(bloodDonate);
    setLoading(false);
    if (responseCreate.success) {
      console.log(nameList);
      nameList.map((index) =>
      {
        
        const res = axios.get(staffs_url+'/supTime/'+index.value) .then(function (response) {
          const staff = {
    
            suppostTime: response.data.data+1,
        
          };
          const responseCreate =  updateStaff(index.value, staff);

        });
       
     
    
      })
      window.location.reload(false);
      onClose();
      
      return toast({
        position: 'top',
        description: 'bloodDonate created',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
     
    } else {
      return toast({
        position: 'top',
        description: responseCreate.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme='brown' onClick={onOpen}>
       Thêm
      </Button>
      

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm buổi hiến máu mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
            <FormLabel>Tên buổi hiến</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Tên buổi hiến'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateNewBloodDonateDetails}
              />
            
            
            </FormControl>


            <FormControl mt={4}>
              <FormLabel>Giờ bắt đầu</FormLabel>
              <Text></Text>
              <Input
                type='Time'
                placeholder='Thời gian'
                name='minute'
                focusBorderColor='brown.500'
                value={minute}
                onChange={y=>setMinute(y.target.value)}
              />
              {/* <Text>Ngày bắt đầu</Text> */}
              {/* <Input
                type='date'
                placeholder='Thời gian'
                name='hour'
                focusBorderColor='brown.500'
                value={hour}
                onChange={e=>setHour(e.target.value)}
              /> */}
             
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Giờ kết thúc</FormLabel>
             
              <Input
                type='Time'
                placeholder='Thời gian'
                name='minute'
                focusBorderColor='brown.500'
                value={minuteF}
                onChange={e=>setMinuteF(e.target.value)}
              />
            
             
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Ngày thực hiện</FormLabel>
          
        
              <Input
                type='date'
                placeholder='Thời gian'
                name='hour'
                focusBorderColor='brown.500'
                value={hourF}
                onChange={e=>setHourF(e.target.value)}
              />
             
            </FormControl>

            

            <FormControl mt={4}>
              <FormLabel>Địa điểm</FormLabel>
              <Textarea
                placeholder='Địa điểm'
                name='address'
                focusBorderColor='brown.500'
                value={address}
                onChange={updateNewBloodDonateDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mục tiêu</FormLabel>
              <Input
                type='number'
                placeholder='Mục tiêu'
                name='target'
                focusBorderColor='brown.500'
                value={target}
                onChange={updateNewBloodDonateDetails}
              />
            </FormControl>

      
<FormControl mt={4}>
<FormLabel>Chọn nhân viên</FormLabel>
            <Select
         
            value={options.find(obj => obj.value === staffList)}
      closeMenuOnSelect={false}
      onChange={handleChange}
      components={animatedComponents}

      isMulti
      
      options={options}
    />
             </FormControl>


          
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Creating BloodDonate'
              colorScheme='brown'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateNewBloodDonateModal;
