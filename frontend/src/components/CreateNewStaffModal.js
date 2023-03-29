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
  Select
  // Center,
  // HStack,
  // Image,
  // VStack,
  // Checkbox,
} from '@chakra-ui/react';
// import { useDropzone } from 'react-dropzone';
import { useStaffContext } from '../context/staff_context';



function CreateNewStaffModal() {
  const {
    new_staff: {
      name,
      countryID,
      address,
      phone,
      suppostTime,
      type,
      from
    },
    updateNewStaffDetails,
    createNewStaff,
  } = useStaffContext();


  const [loading, setLoading] = useState(false);



  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();



  const handleSubmit = async () => {
    if (
      !name ||
      !phone||
      !countryID ||
      !address ||
      !type ||
      !suppostTime ||
      !from
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
    const staff = {
      name,
      phone,
      countryID,
      address,
      suppostTime,
      type,
      from
    };
    const responseCreate = await createNewStaff(staff);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      return toast({
        position: 'top',
        description: 'staff created',
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
          <ModalHeader>Thêm nhân viên mới</ModalHeader>
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
                onChange={updateNewStaffDetails}
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
                onChange={updateNewStaffDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>SĐT</FormLabel>
              <Input
             
                placeholder='SĐT'
                name='phone'
                focusBorderColor='brown.500'
                value={phone}
                onChange={updateNewStaffDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Địa chỉ</FormLabel>
              <Textarea
                placeholder='Địa chỉ'
                name='address'
                focusBorderColor='brown.500'
                value={address}
                onChange={updateNewStaffDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Đơn vị</FormLabel>
              <Textarea
                placeholder='Đơn vị'
                name='from'
                focusBorderColor='brown.500'
                value={from}
                onChange={updateNewStaffDetails}
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
                onChange={updateNewStaffDetails}
              />
            </FormControl>
            
            
            <FormControl mt={4}>
            <FormLabel>Loại nhân viên</FormLabel>
              <Select
                name='type'
                focusBorderColor='brown.500'
                value={type}
                onChange={updateNewStaffDetails}
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
              loadingText='Creating Staff'
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

export default CreateNewStaffModal;
