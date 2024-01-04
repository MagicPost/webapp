'use server';

import { StatusCodes } from 'http-status-codes';
import { signIn, signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { ActionResponse } from './_helpers/types';

export async function authenticate(options: Record<string, any>) {
  try {
    await signIn('credentials', options);
    return {
      ok: true,
      message: 'Chào mừng bạn đến với hệ thống quản lý của MagicPost.',
      status: StatusCodes.OK,
    } satisfies ActionResponse;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            ok: false,
            message: 'Email hoặc mật khẩu không đúng.',
            status: StatusCodes.UNAUTHORIZED,
          } satisfies ActionResponse;
        default:
          return {
            ok: false,
            message: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
          } satisfies ActionResponse;
      }
    }
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      } satisfies ActionResponse;
    }
  }
}

export async function logout() {
  await signOut();
}
