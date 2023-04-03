import React, { useState, useRef ,useEffect} from 'react';
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
  Checkbox,
  Text,
  Select
} from '@chakra-ui/react';
// import { useDropzone } from 'react-dropzone';
import { useDonateContext } from '../context/donate_context';
import { useBloodStorageContext } from '../context/bloodStorage_context';
import { Hidden } from '@mui/material';
import { create_new_bloodStorage} from '../utils/constants';
import { bloodStorages_url } from '../utils/constants';
import { useInforContext } from '../context/infor_context';
import { update_infor_url } from '../utils/constants';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';


function CreateNewDonateModal({ id }) {
  const {
    new_donate: {
      // name,
      amount,
      iduser,
      // typeBlood
     
    },
    updateNewDonateDetails,
    createNewDonate,
    fetchSingleDonate
  } = useDonateContext();

  // console.log(id);
  const [loading, setLoading] = useState(false);

  
  const {
    infors,
    fetchSingleInfor,
    updateInfor,
    fetchInfors,
    updateNewInforDetails
  } = useInforContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const idBD= id;

  const [name, setName] = useState('');
  const [typeBlood, setTypeBlood] = useState('');
  const [donateTime, setDonateTime] = useState('');
  

  useEffect(() => {
  
 
  }, []);

// console.log(time);

  const handleSubmit = async () => {
   
    
    // console.log(name);
    if (
      !name ||
      !idBD ||
      !iduser ||
      !amount ||
      !typeBlood 
      // !donateID
    ) {
      return toast({
        position: 'top',
        description: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
    // name = na;
   
    setLoading(true);
    const donate = {
        iduser,
        idBD, 
        name,
        amount,
        typeBlood,
   
    };

    // const donateTime =time+1;
    const time = donateTime+1;
    const infor = {
      donateTime: time,
      lastDonate: Date.now(),
      // oldDate: Date.now(),
      status: 'Chưa thể hiến'
  };
  
  const updatetime = await updateInfor(iduser, infor);

    const responseCreate = await createNewDonate(donate);
    
       
    setLoading(false);
    if (responseCreate.success) { 
      await fetchSingleDonate(id);
      await fetchInfors();
        onClose();
        return toast({
          position: 'top',
          description: 'Donate created',
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
          <ModalHeader>Thêm người hiến máu</ModalHeader>
          <ModalCloseButton />
         

           <ModalBody pb={6}>

           <FormControl mt={4}>
            <FormLabel>Tên người hiến</FormLabel>
              <Select
                name='iduser'
                focusBorderColor='brown.500'
                value={iduser}
         
                onClick={() =>    
                  infors.find((index) => {
                  if(index.id === iduser){setName(index.name); setTypeBlood(index.typeBlood); setDonateTime(index.donateTime)}})}
                onChange={updateNewDonateDetails}
               
              >

                <option>Chọn người hiến</option>
                {infors.filter(infors => infors.status.includes('Có thể hiến')).map(index => ( 
                <option value={index.id} >{index.name}</option>
                ))}
              </Select>
            </FormControl>
       
           <FormControl mt={4}>
            <FormLabel>Số lượng</FormLabel>
              <Select
                name='amount'
                focusBorderColor='brown.500'
                value={amount}
                onChange={updateNewDonateDetails}
              >
                <option value='250'>250</option>
                <option value='350'>350</option>
                <option value='450'>450</option>
              </Select>
            </FormControl>

            {/* <FormControl>
              <FormLabel>Nhóm máu</FormLabel>
              <Input
                disabled
                placeholder='Tên'
                name='typeBlood'
                focusBorderColor='brown.500'
                value={typeBlood}
                onChange={updateNewDonateDetails}
              />
            </FormControl> */}
      

          
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Creating Donate'
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

export default CreateNewDonateModal;
