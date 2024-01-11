import { getCollectionPoints } from '@/actions/branch/getCollectionPoints';
import InnerPage from './InnerPage';

export default async function BranchesPage() {
  const res = await getCollectionPoints({ withTransactionPoints: false, withManager: true });
  if (!res?.ok) return null;
  const collectionPoints = res?.data || [];

  return <InnerPage collectionPoints={collectionPoints} />;
}
