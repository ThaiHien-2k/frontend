import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './config/ThemeConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/user_context';

import { CashFlowProvider } from './context/cashFlow_context';
import { BloodStorageProvider } from './context/bloodStorage_context';
import { PostProvider } from './context/post_context';
import { StaffProvider } from './context/staff_context';
import { BookingProvider } from './context/booking_context';
import { InforProvider } from './context/infor_context';
import { DonateProvider } from './context/donate_context';
import { BloodDonateProvider } from './context/bloodDonate_context';
import { AdminProvider } from './context/admin_context';

ReactDOM.render(
  <UserProvider>
    <AdminProvider>
    <InforProvider>
        <CashFlowProvider>
        <BloodDonateProvider>
        <PostProvider>
        <StaffProvider>
       <BookingProvider>
         
        <BloodStorageProvider>
        <DonateProvider>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
          </DonateProvider>
          </BloodStorageProvider>
          </BookingProvider>
          </StaffProvider>
         

          </PostProvider>
         
          </BloodDonateProvider>
          </CashFlowProvider>
          </InforProvider>
    </AdminProvider>
  </UserProvider>,
  document.getElementById('root')
);
