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
    case Roles.STAFF:
      return 'Giao dịch viên';
    default:
      return '';
  }
};

export const getNumberWithLeadingZero = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const hideInfo = (input: string, type: 'fullname' | 'phone' | 'address') => {
  if (!input) return '';
  switch (type) {
    case 'fullname': {
      const segments = input.split(' ');
      const firstPart = segments.slice(0, segments.length - 1).join(' ');
      const lastSegment = segments[segments.length - 1];
      return `${firstPart} ${'*'.repeat(lastSegment.length)}`;
    }
    case 'phone':
      return `${'*'.repeat(input.length - 4)}${input.slice(input.length - 4)}`;
    case 'address': {
      const [firstPart, rest] = input.split(/, (.*)/s);
      const maskedFirstPart = firstPart
        .split(' ')
        .map((segment) => '*'.repeat(segment.length))
        .join(' ');
      return `${maskedFirstPart}, ${rest || ''}`;
    }
    default:
      return input;
  }
};
