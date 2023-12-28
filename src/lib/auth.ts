import NextAuth from 'next-auth';
import { authConfig } from '@/configs/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { BranchTypes, Roles } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import bcrypt from 'bcrypt';
import { toComposeUserDTO, ComposeUserDTO } from '@/dtos/user/compose-user.dto';

async function getUser({
  email,
  password,
  isAdmin,
  branchType,
}: {
  email: string;
  password: string;
  isAdmin: boolean;
  branchType?: BranchTypes;
}): Promise<ComposeUserDTO | null> {
  try {
    await dbConnect();

    const user = await AccountModel.findOne({
      email,
      ...(isAdmin && { role: Roles.ADMIN }),
    }).select('+password');
    if (!user) return null;

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return null;

    const { password: _, ...rest } = user.toJSON();
    return toComposeUserDTO(rest);
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

        const user = await getUser({
          isAdmin,
          email,
          password,
          branchType,
        });

        // console.log('Logging:', user);

        if (!user) return null;
        return {
          id: user._id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          image: user.avatar,
          role: user.role,
          // branch: user.branch,
          // branchName: user.branchName,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.picture = user.image;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as Roles;
      return session;
    },
  },
});
