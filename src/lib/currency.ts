const vndFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

export const numberToVnd = (number: number) => vndFormatter.format(number);
