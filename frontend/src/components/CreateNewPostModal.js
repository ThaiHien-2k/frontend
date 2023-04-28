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
import { usePostContext } from '../context/post_context';



function CreateNewPostModal() {
  const {
    new_post: {
    //   name="Admin",
      title,
    //   like,
      content,
      status
 
   
    },
    updateNewPostDetails,
    createNewPost,
  } = usePostContext();


  const [loading, setLoading] = useState(false);



  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();



  const handleSubmit = async () => {
    if (
     
      !content||
      !title 
     
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
    const post = {
      name:'Admin',
      content,
      title,
      like: 0,
      createdAt:Date.now(),
      status:'Đã duyệt',
     
    };
    const responseCreate = await createNewPost(post);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      window.location.reload(false);
      return toast({
        position: 'top',
        description: 'post created',
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
          <ModalHeader>Thêm bài viết</ModalHeader>
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
                onChange={updateNewPostDetails}
              />
            </FormControl> */}

            <FormControl>
              <FormLabel>Tiêu đề</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Tiêu đề'
                name='title'
                focusBorderColor='brown.500'
                value={title}
                onChange={updateNewPostDetails}
              />
            </FormControl>

       
            <FormControl mt={4}>
              <FormLabel>Nội dung</FormLabel>
              <Textarea
                placeholder='Nội dung'
                name='content'
                focusBorderColor='brown.500'
                value={content}
                onChange={updateNewPostDetails}
              />
            </FormControl>

            

          
            
         

            
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Creating Post'
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

export default CreateNewPostModal;
