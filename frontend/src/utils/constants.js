import React from 'react';

import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
export const LinkItems = [
  { name: 'Dashboard', url: '/', icon: <DashboardIcon /> },
  { name: 'Quản lý tài khoản', url: '/accounts', icon: <PersonIcon /> },
  { name: 'Quản lý bài viết', url: '/posts', icon: <AdUnitsIcon /> },
  { name: 'Quản lý thu chi', url: '/cashFlows', icon: <AttachMoneyIcon /> },
  { name: 'Quản lý nhân viên', url: '/staffs', icon: <PeopleIcon /> },
  { name: 'Quản lý kho', url: '/bloodStorages', icon: <BloodtypeIcon /> },
  { name: 'Quản lý buổi hiến máu', url: '/bloodDonates', icon: <VolunteerActivismIcon /> },
  { name: 'Thông tin người hiến', url: '/infors', icon: <AssignmentIndIcon /> },
  { name: 'Hiến máu', url: '/donates', icon: <AssignmentIcon /> },
];

export const LinkItemsStaff = [
  { name: 'Dashboard', url: '/', icon: <DashboardIcon /> },
  // { name: 'Quản lý tài khoản', url: '/accounts', icon: <PersonIcon /> },
  // { name: 'Quản lý nhân viên', url: '/staffs', icon: <PeopleIcon /> },
  // { name: 'Quản lý thu chi', url: '/cashFlows', icon: <AttachMoneyIcon /> },
  // { name: 'Quản lý lượng máu', url: '/bloodStorages', icon: <BloodtypeIcon /> },
  // { name: 'Quản lý buổi hiến máu', url: '/bloodDonates', icon: <VolunteerActivismIcon /> },
  { name: 'Thông tin người hiến', url: '/infors', icon: <AssignmentIcon /> },
  // { name: 'Hiến máu', url: '/donates', icon: <AssignmentIcon /> },

  
];




export const domain = process.env.REACT_APP_BACKEND_HOST;
export const auth_url = `${domain}api/admin/auth`;
export const login_url = `${domain}api/admin/login`;
export const register_url = `${domain}api/admin/register`;
export const logout_url = `${domain}api/admin/logout`;
export const admins_url = `${domain}api/admin/users/`;

export const cmt_url = `${domain}api/comments/`;
export const deletecmt_url = `${domain}api/admin/comment/`;
export const posts_url = `${domain}api/posts/`;
export const create_new_post = `${domain}api/admin/post/new`;
export const update_post_url = `${domain}api/admin/post/`;

export const staffs_url = `${domain}api/staffs/`;
export const create_new_staff = `${domain}api/admin/staff/new`;
export const update_staff_url = `${domain}api/admin/staff/`;

export const bookings_url = `${domain}api/bookings/`;
export const create_new_booking = `${domain}api/admin/booking/new`;
export const update_booking_url = `${domain}api/admin/booking/`;

export const donates_url = `${domain}api/donates/`;
export const create_new_donate = `${domain}api/admin/donate/new`;
export const update_donate_url = `${domain}api/admin/donate/`;



export const bloodDonates_url = `${domain}api/bloodDonates/`;
export const bloodDonates_remaining = `${domain}api/bloodDonates/bloodDonateRemaining`;
export const create_new_bloodDonate = `${domain}api/admin/bloodDonate/new`;
export const update_bloodDonate_url = `${domain}api/admin/bloodDonate/`;

export const cashFlows_url = `${domain}api/cashFlows/`;
export const cashFlow_remaining = `${domain}api/cashFlows/totalRemaining`;
export const create_new_cashFlow = `${domain}api/admin/cashFlow/new`;
export const update_cashFlow_url = `${domain}api/admin/cashFlow/`;

export const bloodStorages_url = `${domain}api/bloodStorages/`;
export const bloodStorage_remaining = `${domain}api/bloodStorages/bloodRemaining`;
export const create_new_bloodStorage = `${domain}api/admin/bloodStorage/new`;
export const update_bloodStorage_url = `${domain}api/admin/bloodStorage/`;



export const infors_url = `${domain}api/infors/`;
export const create_new_infor = `${domain}api/admin/infor/new`;
export const update_infor_url = `${domain}api/admin/infor/`;