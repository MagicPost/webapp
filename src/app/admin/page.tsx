import { redirect } from 'next/navigation';

export default function AdminPage() {
  // TODO: check if admin is logged in
  const isLoggedIn = true;
  redirect(`/admin/${isLoggedIn ? 'dashboard' : 'login'}`);
}
