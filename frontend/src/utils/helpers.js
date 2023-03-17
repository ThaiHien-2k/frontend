export const formatPrice = (number) => {
  return new Intl.NumberFormat('vi-VN').format(number);
};





export const getAdminPrivilegeColor = (privilege) => {
  if (privilege === 'admin') {
    return 'green';
  }
  if (privilege === 'staff') {
    return 'blue';
  }
  if (privilege === 'user') {
    return 'brown';
  }
};
