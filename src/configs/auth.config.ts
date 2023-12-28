import { Areas, Roles } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models/';
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

const availableRoutes: { [key: string]: any } = {
  [Areas.ADMIN]: ['login', 'branches', 'dashboard', 'employees', 'settings'],
  [Areas.LOGISTICS]: {
    login: [Roles.MANAGER, Roles.EMPLOYEE],
    settings: [Roles.MANAGER, Roles.EMPLOYEE],
    dashboard: [Roles.MANAGER, Roles.EMPLOYEE],
    employees: [Roles.MANAGER],
    orders: [Roles.EMPLOYEE],
    lookup: [Roles.MANAGER, Roles.EMPLOYEE],
  },
};

export const authConfig = {
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const area = nextUrl.pathname.split('/')[1] as Areas;
      const page = nextUrl.pathname.split('/')[2];

      const loginUrl = new URL(`${area}/login`, nextUrl.origin);
      const dashboardUrl = new URL(`${area}/dashboard`, nextUrl.origin);

      // Always allow access to login page
      if (page === 'login') return true;

      // If user is not logged in, redirect to login page
      if (!isLoggedIn) return NextResponse.redirect(loginUrl);

      // If user is logged in, but not in the correct area, redirect to login page
      // await dbConnect();
      // const user = await AccountModel.findOne({});
      const user = {
        role: Roles.ADMIN,
      };
      if (!user) return NextResponse.redirect(loginUrl);

      // If user is logged in, but not in the correct area, redirect to login page
      if (area === Areas.ADMIN && user.role !== Roles.ADMIN) return NextResponse.redirect(loginUrl);
      if (area === Areas.LOGISTICS && user.role === Roles.ADMIN)
        return NextResponse.redirect(loginUrl);

      // If user is logged in, in the correct area, and access the home page
      if (!page) return NextResponse.redirect(dashboardUrl);

      // If user is logged in, in the correct area, but not in the correct page:
      // return true, and finally caught by not-found page
      if (!Object.keys(availableRoutes[area]).includes(page)) {
        return true;
      } else {
        if (area === Areas.LOGISTICS) {
          const roles = availableRoutes[area][page];
          if (!roles.includes(user.role)) return NextResponse.redirect(dashboardUrl);
        }
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
