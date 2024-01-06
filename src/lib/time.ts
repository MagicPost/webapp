export const getViLocaleDateString = (date?: string | Date | number) => {
  if (!date) return 'dd/mm/yyyy';
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const getTimeString = (date?: string | Date | number) => {
  if (!date) return '00:00:00';
  return new Date(date).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
