import dbConnect from '@/db/dbConnect';
import { AES, enc } from 'crypto-js';
import { AccountModel } from '@/db/models';
import { NextResponse } from 'next/server';
import { catchAsync } from '../../utils';
import base64 from 'base-64';

export const POST = catchAsync(async (req, res) => {
  await dbConnect();
  const { token } = (await req.json()) as { token: string };
  const base64Decoded = base64.decode(token.replace(/%3D/g, '='));
  const decrypted = AES.decrypt(base64Decoded, process.env.PRIVATE_KEY!);

  if (!decrypted) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Không thể xác thực email!',
      },
      { status: 403 }
    );
  }

  const { email } = JSON.parse(decrypted.toString(enc.Utf8));

  const account = await AccountModel.findOne({ email });

  if (!account) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Không thể xác thực email!',
      },
      { status: 403 }
    );
  }

  const changePassToken = AES.encrypt(
    JSON.stringify({ _id: account._id }),
    process.env.PRIVATE_KEY!
  ).toString();

  return NextResponse.json({
    ok: true,
    message: 'Xác thực thành công!',
    data: {
      token: changePassToken,
    },
  });
});
