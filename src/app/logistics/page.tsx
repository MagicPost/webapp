import { redirect } from 'next/navigation';

export default function LogisticsPage() {
  // TODO: check if user is logged in
  redirect('/logistics/login');
}
