import { Areas, Roles } from '@/constants';
import { NextResponse } from 'next/server';

import type { NextAuthConfig } from 'next-auth';

const availableRoutes: { [key: string]: any } = {
  [Areas.ADMIN]: ['login', 'branches', 'dashboard', 'employees', 'settings'],
  [Areas.LOGISTICS]: {
    login: [Roles.MANAGER, Roles.STAFF],
    settings: [Roles.MANAGER, Roles.STAFF],
    dashboard: [Roles.MANAGER, Roles.STAFF],
    employees: [Roles.MANAGER],
    shipments: [Roles.STAFF],
    orders: [Roles.STAFF],
    lookup: [Roles.MANAGER, Roles.STAFF],
  },
};

export const authConfig = {
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
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
      const parts = auth?.user?.name?.split('/');
      const user = {
        role: parts?.[0],
        name: parts?.[1],
        email: auth?.user?.email,
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
