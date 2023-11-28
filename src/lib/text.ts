import { Roles } from '@/constants';

export const getAbbreviation = (str?: string): string => {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .filter((_, index) => index == 0 || index == str.split(' ').length - 1)
    .join('');
};

export const getShortName = (str?: string): string => {
  if (!str) return '';
  if (str.length <= 18) return str;
  return str
    .split(' ')
    .filter((_, index) => index == 0 || index == str.split(' ').length - 1)
    .join(' ');
};

export const roleToText = (role: Roles): string => {
  switch (role) {
    case Roles.ADMIN:
      return 'Quản trị viên';
    case Roles.MANAGER:
      return 'Trưởng điểm';
    case Roles.EMPLOYEE:
      return 'Giao dịch viên';
    default:
      return '';
  }
};
