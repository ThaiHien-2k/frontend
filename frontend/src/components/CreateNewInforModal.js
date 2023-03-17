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
import { useInforContext } from '../context/infor_context';



function CreateNewInforModal() {
  const {
    new_infor: {
        name,
        countryID,
        address,
        email,
        phone,
        from,
        typeBlood,
        donateTime,
        status,
        lastDonate
    },
    updateNewInforDetails,
    createNewInfor,
  } = useInforContext();


  const [loading, setLoading] = useState(false);



  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();



  const handleSubmit = async () => {
    if (
        !name||
        !countryID||
        !address||
        !email||
        !phone||
        !from||
        !typeBlood||
        !donateTime||
        !status||
        !lastDonate 
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
    const infor = {
      name,
      countryID,
      address,
      email,
      phone,
      from,
      typeBlood,
      donateTime,
      status,
      lastDonate
    };
    const responseCreate = await createNewInfor(infor);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      return toast({
        position: 'top',
        description: 'infor created',
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
                onChange={updateNewInforDetails}
              />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>CMND/CCCD</FormLabel>
              <Input
                type='number'
                placeholder='CMND/CCCD'
                name='countryID'
                focusBorderColor='brown.500'
                value={countryID}
                onChange={updateNewInforDetails}
              />
            </FormControl>

            

            <FormControl mt={4}>
              <FormLabel>Địa chỉ</FormLabel>
              <Textarea
                placeholder='Địa chỉ'
                name='address'
                focusBorderColor='brown.500'
                value={address}
                onChange={updateNewInforDetails}
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
                onChange={updateNewInforDetails}
              />
            </FormControl>
            
            
            <FormControl mt={4}>
            <FormLabel>Loại nhân viên</FormLabel>
              <Select
                name='type'
                focusBorderColor='brown.500'
                value={type}
                onChange={updateNewInforDetails}
              >
                <option value='Quản Trị Viên'>Quản Trị Viên</option>
                <option value='Bác Sĩ'>Bác Sĩ</option>
                <option value='Nhân Viên Hỗ Trợ'>Nhân Viên Hỗ Trợ</option>
              </Select>
            </FormControl> */}

            
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Creating Infor'
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

export default CreateNewInforModal;
