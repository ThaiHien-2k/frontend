import React, { useState, useRef } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
//   FormHelperText,
Select,
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
//   Center,
//   HStack,
//   Image,
//   VStack,
//   Checkbox,
} from '@chakra-ui/react';
// import { useDropzone } from 'react-dropzone';
import { useCashFlowContext } from '../context/cashFlow_context';

function CreateNewCashFlowModal() {
  const {
    new_cashFlow: {
      name,
      amount,
      from,
      date,
    //   suppostTime,
      type
    },
    updateNewCashFlowDetails,
    createNewCashFlow,
  } = useCashFlowContext();


  const [loading, setLoading] = useState(false);



  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();



  const handleSubmit = async () => {
    if (
      !name ||
      !from ||
      !amount ||
      !type ||
      !date
    //   !suppostTime 
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
    const cashFlow = {
        name,
        amount,
        from,
        date,
      //   suppostTime,
        type
    };
    const responseCreate = await createNewCashFlow(cashFlow);
    setLoading(false);
    if (responseCreate.success) {
      window.location.reload(false);
      onClose();
      return toast({
        position: 'top',
        description: 'cashFlow created',
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
          <ModalHeader>Thêm thu/chi</ModalHeader>
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
                onChange={updateNewCashFlowDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Số tiền</FormLabel>
              <Input
                type='number'
                placeholder='Số tiền'
                name='amount'
                focusBorderColor='brown.500'
                value={amount}
                onChange={updateNewCashFlowDetails}
              />
            </FormControl>

            

            <FormControl mt={4}>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                placeholder='Mô tả'
                name='from'
                focusBorderColor='brown.500'
                value={from}
                onChange={updateNewCashFlowDetails}
              />
            </FormControl>
                
            <FormControl mt={4}>
              <FormLabel>Ngày thực hiện</FormLabel>
              <Input
                type='date'
                placeholder='Thời gian'
                name='date'
                focusBorderColor='brown.500'
                value={date}
                onChange={updateNewCashFlowDetails}
              />
            </FormControl>


            <FormControl mt={4}>
              <FormLabel>Loại</FormLabel>
              <Select
                name='type'
                focusBorderColor='brown.500'
                value={type}
                onChange={updateNewCashFlowDetails}
              >
                <option value='Thu'>Thu</option>
                <option value='Chi'>Chi</option>
               
              </Select>
            </FormControl>
        
            
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Creating CashFlow'
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

export default CreateNewCashFlowModal;
