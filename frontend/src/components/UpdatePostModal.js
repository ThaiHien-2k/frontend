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
import { Hidden } from '@mui/material';

function UpdatePostModal({ id }) {
  const {
    single_post: {
      name,
      title,
      content,
      status,
      like

      
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
    const post = {
      name,
      title,
      content,
      status,
      like
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
        Duyệt bài viết
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Duyệt bài viết</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
         
              <Hidden
                ref={initialRef}
                // placeholder='Họ và tên'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateExistingPostDetails}
              />
            </FormControl>

            <FormControl mt={4}>
           
              <Hidden
                // type='number'
                // placeholder='CMND/CCCD'
                name='title'
                focusBorderColor='brown.500'
                value={title}
                onChange={updateExistingPostDetails}
              />
            </FormControl>

            <FormControl>
              {/* <FormLabel>SĐT</FormLabel> */}
              <Hidden
                ref={initialRef}
                // placeholder='SĐT'
                name='content'
                focusBorderColor='brown.500'
                value={content}
                onChange={updateExistingPostDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              {/* <FormLabel>Địa chỉ</FormLabel> */}
              <Hidden
                // placeholder='Địa chỉ'
                name='like'
                focusBorderColor='brown.500'
                value={like}
                onChange={updateExistingPostDetails}
              />
            </FormControl>
         

         
            
            
            <FormControl mt={4}>
            {/* <FormLabel>Loại nhân viên</FormLabel> */}
              <Select
                name='status'
                focusBorderColor='brown.500'
                value={status}
                onChange={updateExistingPostDetails}
              >
                <option value='Đã duyệt'>Duyệt</option>
                <option value='Chưa duyệt'>Không duyệt</option>
               
              </Select>
            </FormControl>

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
