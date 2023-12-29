import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { AccountModel } from '@/db/models';
import dbConnect from '@/db/dbConnect';
import { Roles } from '@/constants';

export async function GET() {
  const email = 'admin@magicpost.com';
  const password = '88888888';

  const hashedPassword = bcrypt.hashSync(password, 12);

  await dbConnect();
  const user = await AccountModel.create({
    email,
    password: hashedPassword,
    firstName: 'LV',
    lastName: 'DAT',
    role: Roles.ADMIN,
  });

  return NextResponse.json({
    success: true,
    user,
  });
}
