import React, { useState, useRef } from 'react';
import {
  Button,
  Input,
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
  Select,
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

import { BiCheckboxChecked } from 'react-icons/bi';
// import { MultiSelect } from "react-multi-select-component";
// import { MultiSelect, Loader } from '@mantine/core';
function CreateNewBloodDonateModal() {
  const {
    new_bloodDonate: {
      name,
      time,
      address,
      target,
      receive,
      // staffList,
      status
     
    },
    updateNewBloodDonateDetails,
    createNewBloodDonate,
  } = useBloodDonateContext();

  const {
    staffs,
   
  } = useStaffContext();

  

  const [loading, setLoading] = useState(false);

  const [staffList, setStaffList] = useState([]);
 
  const handleClick=(e)=>{
    setStaffList(oldMessages => [e, ...oldMessages])
   
  
  }


  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const handleSubmit = async () => {
   
    if (
      !name ||
      !time ||
      !address ||
      !target ||
      !receive ||
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
      time,
      address,
      target,
      receive,
      staffList,
      status
    };
    console.log(bloodDonate);
    const responseCreate = await createNewBloodDonate(bloodDonate);
    setLoading(false);
    if (responseCreate.success) {
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
              <FormLabel>Thời gian</FormLabel>
              <Input
                type='datetime-local'
                placeholder='Thời gian'
                name='time'
                focusBorderColor='brown.500'
                value={time}
                onChange={updateNewBloodDonateDetails}
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
              <FormLabel>Thu được</FormLabel>
              <Input
                type='number'
                placeholder='Thu được'
                name='receive'
                focusBorderColor='brown.500'
                value={receive}
                onChange={updateNewBloodDonateDetails}
              />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Chọn nhân viên</FormLabel>
            {staffs.map(index => (
            <Checkbox  
            
            multiple={true}
                 name='staffList'
                focusBorderColor='brown.500'
                value={index.id}
                onChange={e=>handleClick(index.id)}
            
                >
              
              <option value={index.id}>{index.type} - {index.name}</option>

             
                </Checkbox> ))
              } 
            </FormControl>

            
{/* <FormControl>
        
        <Hidden
        
        
          name='staffList'
          focusBorderColor='brown.500'
          value={nameList}
          onChange={updateNewBloodDonateDetails}
        />
      </FormControl> */}

          
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
