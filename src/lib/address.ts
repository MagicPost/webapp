export const getFullAddress = ({
  address,
  district,
  province,
  ward,
}: {
  address: string;
  district: string;
  province: string;
  ward?: string;
}) => {
  return `${address},${ward ? ` ${ward}, ` : ''} ${district}, ${province}`;
};
