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
import { usePostContext } from '../context/post_context';

function UpdatePostModal({ id }) {
  const {
    single_post: {
      name = '',
      countryID = '',
      address = '',
      phone = '',
      suppostTime = '',
      from = '',
      type = 'Nhân Viên Hỗ Trợ',
      
    },
    // single_post_loading,
    fetchPosts,
    fetchSinglePost,
    updateExistingPostDetails,
    updatePost,
  } = usePostContext();


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
    const post = {
      name,
      countryID,
      address,
      phone,
      from,
      suppostTime,
      type
    };
    const responseCreate = await updatePost(id, post);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'post updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchPosts();
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
          fetchSinglePost(id);
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
            {/* <FormControl>
              <FormLabel>Họ và tên</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Họ và tên'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateExistingPostDetails}
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
                onChange={updateExistingPostDetails}
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
                onChange={updateExistingPostDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Địa chỉ</FormLabel>
              <Textarea
                placeholder='Địa chỉ'
                name='address'
                focusBorderColor='brown.500'
                value={address}
                onChange={updateExistingPostDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Đơn vị</FormLabel>
              <Textarea
                placeholder='Đơn vị'
                name='from'
                focusBorderColor='brown.500'
                value={from}
                onChange={updateExistingPostDetails}
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
                onChange={updateExistingPostDetails}
              />
            </FormControl>
            
            
            <FormControl mt={4}>
            <FormLabel>Loại nhân viên</FormLabel>
              <Select
                name='type'
                focusBorderColor='brown.500'
                value={type}
                onChange={updateExistingPostDetails}
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
              loadingText='Updating Post'
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

export default UpdatePostModal;
