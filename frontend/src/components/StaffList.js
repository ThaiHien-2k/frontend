import { HStack, VStack, Text, Image, Box, Tag } from '@chakra-ui/react';
import React from 'react';


function StaffItemsList({ staffItems }) {
  return (
    <VStack alignItems='flex-start' spacing='4'>
      {staffItems.map((item, index) => {
        const { name, type} = item;
        return (
          <HStack key={index} alignItems='flex-start' spacing='5'>
           
            <VStack alignItems='flex-start'>
              <HStack spacing='3'>
                <Text as='b'>{name}</Text>
                <Text as='b'>{type}</Text>
              </HStack>
             
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
}

export default StaffItemsList;
