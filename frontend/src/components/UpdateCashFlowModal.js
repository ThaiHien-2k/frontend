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
import { useCashFlowContext } from '../context/cashFlow_context';

function UpdateCashFlowModal({ id }) {
  const {
    single_cashFlow: {
      name = '',
      amount = '',
      from = '',
      date='',
      type = 'Thu',
      
    },
    // single_cashFlow_loading,
    fetchCashFlows,
    fetchSingleCashFlow,
    updateExistingCashFlowDetails,
    updateCashFlow,
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
        !type||
        !date
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
    const cashFlow = {
        name,
        amount,
        from,
        date,
      //   suppostTime,
        type
    };
    const responseCreate = await updateCashFlow(id, cashFlow);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'cashFlow updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchCashFlows();
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
          fetchSingleCashFlow(id);
          onOpen();
        }}
      >
        Chỉnh Sửa
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa thu/chi</ModalHeader>
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
                onChange={updateExistingCashFlowDetails}
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
                onChange={updateExistingCashFlowDetails}
              />
            </FormControl>

            

            <FormControl mt={4}>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                placeholder='Mô tả'
                name='from'
                focusBorderColor='brown.500'
                value={from}
                onChange={updateExistingCashFlowDetails}
              />
            </FormControl>
            <FormControl>
            <FormLabel>Ngày thực hiện</FormLabel>
              <Input
                ref={initialRef}
                type='date'
                name='date'
                focusBorderColor='brown.500'
                value={date}
                onChange={updateExistingCashFlowDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Loại</FormLabel>
              <Select
                name='type'
                focusBorderColor='brown.500'
                value={type}
                onChange={updateExistingCashFlowDetails}
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
              loadingText='Updating CashFlow'
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

export default UpdateCashFlowModal;
