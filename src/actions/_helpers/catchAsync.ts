import { ActionResponse } from './types';

export const catchAsync =
  (fn: (...props: any) => Promise<any>) =>
  async (...props: any) => {
    try {
      return fn(...props);
    } catch (error: any) {
      console.error(error);
      return {
        ok: false,
        status: 500,
        message: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      } satisfies ActionResponse;
    }
  };
