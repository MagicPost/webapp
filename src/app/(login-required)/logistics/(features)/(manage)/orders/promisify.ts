import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

export const promisify = <TReturn extends FieldValues>(
  fn: UseFormHandleSubmit<TReturn>
): Promise<TReturn> => {
  return new Promise((resolve, reject) => {
    fn(
      (data) => void resolve(data),
      (err) => {
        if (err) reject();
      }
    )();
  });
};
