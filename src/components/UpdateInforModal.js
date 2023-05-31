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
import { useInforContext } from '../context/infor_context';

function UpdateInforModal({ id }) {
  const {
    single_infor: {
        name,
        countryID,
        address,
        email,
        phone,
        // from,
        typeBlood,
        donateTime,
        // status,
        // lastDonate
      
    },
    // single_infor_loading,
    fetchInfors,
    fetchSingleInfor,
    updateExistingInforDetails,
    updateInfor,
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
        // !from||
        !typeBlood||
        !donateTime
        // !status||
        // !lastDonate 
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
    const infor = {
        name,
        countryID,
        address,
        email,
        phone,
        // from,
        typeBlood,
        donateTime,
        // status,
        // lastDonate
    };
    const responseCreate = await updateInfor(id, infor);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'infor updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchInfors();
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
          fetchSingleInfor(id);
          onOpen();
        }}
      >
        Chỉnh Sửa
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa thông tin người hiến</ModalHeader>
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
                onChange={updateExistingInforDetails}
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
                onChange={updateExistingInforDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder='Email'
                name='email'
                focusBorderColor='brown.500'
                value={email}
                onChange={updateExistingInforDetails}
              />
              </FormControl>
            

            <FormControl mt={4}>
              <FormLabel>Địa chỉ</FormLabel>
              <Textarea
                placeholder='Địa chỉ'
                name='address'
                focusBorderColor='brown.500'
                value={address}
                onChange={updateExistingInforDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>SĐT</FormLabel>
              <Input
             
                placeholder='SĐT'
                name='phone'
                focusBorderColor='brown.500'
                value={phone}
                onChange={updateExistingInforDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Số lần hiến</FormLabel>
              <Input
                type='number'
                placeholder='Số lần hiến'
                name='donateTime'
                focusBorderColor='brown.500'
                value={donateTime}
                onChange={updateExistingInforDetails}
              />
            </FormControl>
            
            
            <FormControl mt={4}>
            <FormLabel>Nhóm máu</FormLabel>
              <Select
                name='typeBlood'
                focusBorderColor='brown.500'
                value={typeBlood}
                onChange={updateExistingInforDetails}
              >
                <option value='O'>O</option>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='AB'>AB</option>
              </Select>
            </FormControl>

            
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating Infor'
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

export default UpdateInforModal;
