export const getViLocaleDateString = (date?: string | Date | number) => {
  if (!date) return 'dd/mm/yyyy';
  return new Date(date).toLocaleDateString('vi-VN');
};
