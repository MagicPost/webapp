export const formatRate = (rate: number) => {
  if (rate === Infinity) return '∞';
  return rate.toFixed(2);
};
