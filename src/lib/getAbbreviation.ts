export default function getAbbreviation(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .filter((_, index) => index == 0 || index == str.split(' ').length - 1)
    .join('');
}
