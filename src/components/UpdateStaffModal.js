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
  // Center,
  // HStack,
  // Image,
  // VStack,
  // Checkbox,
  Text,
  Select
} from '@chakra-ui/react';
// import { useDropzone } from 'react-dropzone';
import { useStaffContext } from '../context/staff_context';

function UpdateStaffModal({ id }) {
  const {
    single_staff: {
      name = '',
      countryID = '',
      address = '',
      phone = '',
      suppostTime = '',
      from = '',
      type = 'Nhân Viên Hỗ Trợ',
      
    },
    // single_staff_loading,
    fetchStaffs,
    fetchSingleStaff,
    updateExistingStaffDetails,
    updateStaff,
  } = useStaffContext();


  const [loading, setLoading] = useState(false);

  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();



  const handleSubmit = async () => {
    if (
      !name ||
      !countryID ||
      !address ||
      !type ||
      !phone||
      !from||
      !suppostTime 
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
    const staff = {
      name,
      countryID,
      address,
      phone,
      from,
      suppostTime,
      type
    };
    const responseCreate = await updateStaff(id, staff);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'staff updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchStaffs();
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
          fetchSingleStaff(id);
          onOpen();
        }}
      >
        Chỉnh Sửa
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa nhân viên</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Họ và tên</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Họ và tên'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateExistingStaffDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>CMND/CCCD</FormLabel>
              <Input
                type='number'
                placeholder='CMND/CCCD'
                name='countryID'
                focusBorderColor='brown.500'
                value={countryID}
                onChange={updateExistingStaffDetails}
              />
            </FormControl>

            <FormControl>
              <FormLabel>SĐT</FormLabel>
              <Input
                ref={initialRef}
                placeholder='SĐT'
                name='phone'
                focusBorderColor='brown.500'
                value={phone}
                onChange={updateExistingStaffDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Địa chỉ</FormLabel>
              <Textarea
                placeholder='Địa chỉ'
                name='address'
                focusBorderColor='brown.500'
                value={address}
                onChange={updateExistingStaffDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Đơn vị</FormLabel>
              <Textarea
                placeholder='Đơn vị'
                name='from'
                focusBorderColor='brown.500'
                value={from}
                onChange={updateExistingStaffDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Số lần hỗ trợ</FormLabel>
              <Input
                type='number'
                placeholder='Số lần hỗ trợ'
                name='suppostTime'
                focusBorderColor='brown.500'
                value={suppostTime}
                onChange={updateExistingStaffDetails}
              />
            </FormControl>
            
            
            <FormControl mt={4}>
            <FormLabel>Loại nhân viên</FormLabel>
              <Select
                name='type'
                focusBorderColor='brown.500'
                value={type}
                onChange={updateExistingStaffDetails}
              >
                <option value='Quản Trị Viên'>Quản Trị Viên</option>
                <option value='Bác Sĩ'>Bác Sĩ</option>
                <option value='Nhân Viên Hỗ Trợ'>Nhân Viên Hỗ Trợ</option>
              </Select>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating Staff'
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

export default UpdateStaffModal;
