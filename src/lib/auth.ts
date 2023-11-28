import NextAuth from 'next-auth';
import { authConfig } from '@/configs/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { TAccount, fakeAccounts } from '../fake-accounts';
import { BranchTypes, Roles } from '@/constants';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            isAdmin: z.enum(['true', 'false']).transform((value) => value === 'true'),
            email: z.string().email(),
            password: z.string().min(8).max(32),
            branchType: z.nativeEnum(BranchTypes).optional(),
            remember: z.enum(['true', 'false']).transform((value) => value === 'true'),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { isAdmin, email, password, branchType } = parsedCredentials.data;
        const user: TAccount | undefined = fakeAccounts.find(
          (account) =>
            (isAdmin ? account.role === Roles.ADMIN : true) &&
            account.email === email &&
            account.password === password &&
            account.branch === branchType
        );

        if (!user) return null;
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          branch: user.branch,
          branchName: user.branchName,
        };
      },
    }),
  ],
});
