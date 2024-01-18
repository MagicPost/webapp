import { sendActivationMail } from '@/actions/mail';
import { BranchTypes, Roles } from '@/constants';

export default async function TestPage() {
  await sendActivationMail({
    email: 'dat.roy.2003@gmail.com',
    role: Roles.STAFF,
    branch: {
      type: BranchTypes.COLLECTION_POINT,
      _id: '659f65265213cf79ffc6bf33',
    },
  });
  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}
