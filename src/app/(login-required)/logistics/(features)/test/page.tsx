import { getTransactionStatsOfYear } from '@/actions/statistics/transaction-points/getTransactionStatsOfYear';

export default async function TestPage() {
  await getTransactionStatsOfYear('65a0b4923b0940a21255c518');
  return <>aaa</>;
}
