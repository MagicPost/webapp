export const getThisMonth = () => {
  const today = new Date();

  return {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
  };
};

export const getLastMonth = () => {
  const today = new Date();

  return {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };
};

export const getThisDayLastYear = () => {
  const today = new Date();
  const lastYear = new Date(today.getFullYear(), today.getMonth() - 12, today.getDate());
  return lastYear;
};
