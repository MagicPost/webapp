import { authConfig } from '@/configs/auth.config';
import { z } from 'zod';
import { BranchTypes, Roles } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import bcrypt from 'bcryptjs';
import { transformIntoGetUserDTO, GetUserDTO } from '@/dtos/user/user.dto';

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@auth/core/types';

async function getUser({
  email,
  password,
  isAdminArea,
  branchType,
}: {
  email: string;
  password: string;
  isAdminArea: boolean;
  branchType?: BranchTypes;
}): Promise<GetUserDTO | null> {
  try {
    await dbConnect();

    const filter = {
      email,
      active: true,
      ...(isAdminArea
        ? { role: Roles.ADMIN }
        : {
            role: { $ne: Roles.ADMIN },
            ...(branchType && {
              'branch.type': branchType,
            }),
          }),
    };

    const user = await AccountModel.findOne(filter).select('+password');

    if (!user) return null;

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return null;

    const { password: _, ...rest } = user.toJSON();
    return transformIntoGetUserDTO(rest);
  } catch (error) {
    console.error('Failed to fetch user:', error as Error);
    throw error;
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            isAdminArea: z.enum(['true', 'false']).transform((value) => value === 'true'),
            email: z.string().email(),
            password: z.string().min(8).max(32),
            branchType: z.nativeEnum(BranchTypes).optional(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { isAdminArea, email, password, branchType } = parsedCredentials.data;

        const user = await getUser({
          isAdminArea,
          email,
          password,
          branchType,
        });

        if (!user) return null;
        return {
          id: user._id,
          name: `${user.role}/${user.firstName} ${user.lastName}/${user.active}`,
          email: user.email,
          image: user.avatar,
        } satisfies User;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.picture = user.image;
        token.id = user.id;
      }
      return token;
    },
  },
});
