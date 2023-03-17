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
import { useBloodStorageContext } from '../context/bloodStorage_context';



function CreateNewBloodStorageModal() {
  const {
    new_bloodStorage: {
      name,
      amount,
      from,
      type,
      date,
      detail
    },
    updateNewBloodStorageDetails,
    createNewBloodStorage,
  } = useBloodStorageContext();


  const [loading, setLoading] = useState(false);



  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();



  const handleSubmit = async () => {
    if (
      !name ||
      !amount ||
      !from ||
      !type ||
      !date||
      !detail 
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
    const bloodStorage = {
        name,
        amount,
        from,
        type,
        date,
        detail
    };
    const responseCreate = await createNewBloodStorage(bloodStorage);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      return toast({
        position: 'top',
        description: 'bloodstorage created',
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
          <ModalHeader>Thêm</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tên</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Tên'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateNewBloodStorageDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Số lượng</FormLabel>
              <Input
                type='number'
                placeholder='Số lượng'
                name='amount'
                focusBorderColor='brown.500'
                value={amount}
                onChange={updateNewBloodStorageDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Từ/Đến</FormLabel>
              <Input
               
                placeholder=''
                name='from'
                focusBorderColor='brown.500'
                value={from}
                onChange={updateNewBloodStorageDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                placeholder='Mô tả'
                name='detail'
                focusBorderColor='brown.500'
                value={detail}
                onChange={updateNewBloodStorageDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Ngày thực hiện</FormLabel>
              <Input
                type='date'
                placeholder='Ngày thực hiện'
                name='date'
                focusBorderColor='brown.500'
                value={date}
                onChange={updateNewBloodStorageDetails}
              />
            </FormControl>
            
            
            <FormControl mt={4}>
            <FormLabel>Loại</FormLabel>
              <Select
                name='type'
                focusBorderColor='brown.500'
                value={type}
                onChange={updateNewBloodStorageDetails}
              >
                <option value='Nhận'>Nhận</option>
                <option value='Cho'>Cho</option>
              
              </Select>
            </FormControl>

            
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Creating BloodStorage'
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

export default CreateNewBloodStorageModal;
