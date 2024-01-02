export const getViLocaleDateString = (date?: string | Date | number) => {
  if (!date) return 'dd/mm/yyyy';
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
