import { NextAuthProvider } from './providers';

export default function LoginRequiredLayout({ children }: { children: React.ReactNode }) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
