export function getGrowRate(currentValue: number, previousValue: number) {
  if (currentValue === 0 && previousValue === 0) return 0;
  if (previousValue === 0) return Infinity;
  return (100 * (currentValue - previousValue)) / previousValue;
}
