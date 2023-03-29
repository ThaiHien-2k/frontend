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
  // Textarea,
  // Center,
  // HStack,
  // Image,
  // VStack,
  // Checkbox,
  Text,
  Select
} from '@chakra-ui/react';
import { useBloodDonateContext } from '../context/bloodDonate_context';
import { useBloodStorageContext } from '../context/bloodStorage_context';
import { Hidden } from '@mui/material';
import { create_new_bloodStorage} from '../utils/constants';
import { bloodStorages_url } from '../utils/constants';
import axios from 'axios';

function UpdateStatusBloodDonateModal({ id }) {
  const {
    single_bloodDonate: {
      name = '',
      time = '',
      address = '',
      target = '',
      receive=0,
      status = 'Chưa thực hiện',

      
    },
    // single_bloodDonate_loading,
    fetchBloodDonates,
    fetchSingleBloodDonate,
    updateExistingBloodDonateDetails,
    updateBloodDonate,
  } = useBloodDonateContext();


  const [loading, setLoading] = useState(false);

  const {deleteBloodStorage} = useBloodStorageContext();


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
    const bloodDonate = {
      name,
      time,
      address,
      target,
      receive,
      status
    };
    const responseCreate = await updateBloodDonate(id, bloodDonate);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'BloodDonate updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchBloodDonates();
      if(status==='Đã thực hiện'){
        const createBloodStorage = async () => {
         const check = await axios.get(bloodStorages_url,id);
        
         if(!check){}
         else{
          const response = await axios.post(create_new_bloodStorage,{
            _id:id,
            name: "Máu nhận",
            amount: receive,
            from: name,
            donateID: id,
            type: 'Nhận',
            detail:'Nhận từ buổi hiến máu',
            date: time
          })}
         
      };
      createBloodStorage();}
  
      if(status==='Chưa thực hiện'){
      
        return await deleteBloodStorage(id);
     }
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
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSingleBloodDonate(id);
          onOpen();
        }}
      >
        Chỉnh sửa
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Chỉnh sửa trạng thái</ModalHeader>
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
                onChange={updateExistingBloodDonateDetails}
              />
            </FormControl>

            <FormControl>
            <FormLabel>Thời gian</FormLabel>
              <Input
                ref={initialRef}
                type='datetime-local'
                name='time'
                focusBorderColor='brown.500'
                value={time}
                onChange={updateExistingBloodDonateDetails}
              />
            </FormControl>

            <FormControl>
            <FormLabel>Địa điểm</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Địa điểm'
                name='address'
                focusBorderColor='brown.500'
                value={address}
                onChange={updateExistingBloodDonateDetails}
              />
            </FormControl>

            <FormControl>
            <FormLabel>Mục tiêu</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Mục tiêu'
                name='target'
                focusBorderColor='brown.500'
                value={target}
                onChange={updateExistingBloodDonateDetails}
              />
            </FormControl>

            <FormControl>
            <FormLabel>Thu được</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Thu được'
                name='receive'
                focusBorderColor='brown.500'
                value={receive}
                onChange={updateExistingBloodDonateDetails}
              />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Đổi trạng thái</FormLabel>
              <Select
                name='status'
                focusBorderColor='brown.500'
                value={status}
                onChange={updateExistingBloodDonateDetails}
              >
                <option value='Chưa thực hiện'>Chưa thực hiện</option>
                <option value='Đã thực hiện'>Đã thực hiện</option>
     
              </Select>
            </FormControl>
         

          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating BloodDonate'
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

export default UpdateStatusBloodDonateModal;