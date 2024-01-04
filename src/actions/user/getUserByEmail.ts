import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import { GetUserDTO } from '@/dtos/user/user.dto';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';
import { BranchTypes } from '@/constants';

interface FlattenUser extends Omit<GetUserDTO, 'branch'> {
  branch?: {
    type: BranchTypes;
    collectionPoint?: {
      _id: string;
      name: string;
    };
    transactionPoint?: {
      _id: string;
      name: string;
    };
  };
}

export const getUserByEmail = catchAsync(
  async ({ email, withBranch = false }: { email: string | null; withBranch?: boolean }) => {
    if (!email) return null;

    await dbConnect();
    let query = AccountModel.findOne({ email });

    if (withBranch)
      query = query
        .populate({
          path: 'branch.collectionPoint',
          select: '_id name',
        })
        .populate({
          path: 'branch.transactionPoint',
          select: '_id name',
        });

    let user = await query.lean().exec();

    const flattenUser = transformObjectIdFromLeanedDoc(user) as FlattenUser;

    const branchInfo =
      flattenUser?.branch?.type === BranchTypes.COLLECTION_POINT
        ? flattenUser?.branch?.collectionPoint
        : flattenUser?.branch?.transactionPoint;

    const { branch: excludedBranch, ...rest } = flattenUser;

    return {
      ...rest,
      ...(flattenUser?.branch &&
        branchInfo && {
          branch: {
            type: flattenUser.branch.type,
            ...branchInfo!,
          },
        }),
    } satisfies GetUserDTO;
  }
);
