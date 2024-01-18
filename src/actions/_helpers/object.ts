export const mapToLast12Months = ({
  input,
  firstDate,
  lastDate,
}: {
  input: {
    createdAt: string;
    number: number;
  }[];
  firstDate: Date;
  lastDate: Date;
}) => {
  let output = input.reduce((result: { [key: string]: number }, elem) => {
    const date = new Date(elem.createdAt);
    const key = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    if (!result[key]) {
      result[key] = 0;
    }
    result[key] += elem.number;
    return result;
  }, {});

  // fill other months with 0
  const months = [];
  while (firstDate <= lastDate) {
    const month = `${(firstDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${firstDate.getFullYear()}`;
    months.push(month);
    firstDate.setMonth(firstDate.getMonth() + 1);
  }

  months.forEach((month) => {
    if (!output[month]) {
      output[month] = 0;
    }
  });

  // sort by month and year
  output = Object.keys(output)
    .sort((a, b) => {
      const [aMonth, aYear] = a.split('-');
      const [bMonth, bYear] = b.split('-');
      if (aYear === bYear) {
        return Number(aMonth) - Number(bMonth);
      }
      return Number(aYear) - Number(bYear);
    })
    .reduce(
      (result, key) => {
        result[key] = output[key as keyof typeof output];
        return result;
      },
      {} as { [key: string]: number }
    );

  // get only last 12 months
  output = Object.keys(output)
    .slice(-12)
    .reduce(
      (result, key) => {
        result[key] = output[key];
        return result;
      },
      {} as { [key: string]: number }
    );
  return output;
};
