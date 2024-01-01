export const getFullAddress = ({
  address,
  district,
  province,
}: {
  address: string;
  district: string;
  province: string;
}) => {
  return `${address}, ${district}, ${province}`;
};
