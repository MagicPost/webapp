import { BranchTypes, Roles } from '@/constants';
import dbConnect from '@/db/dbConnect';
import { AccountModel } from '@/db/models';
import { GetUserDTO, transformIntoGetUserDTO } from '@/dtos/user/user.dto';
import { Account } from '@/db/models/Account';
import { ActionResponse } from '../_helpers/types';
import { catchAsync } from '../_helpers/catchAsync';

export const getEmployees = catchAsync(
  async ({
    isManager,
    filter,
  }: {
    isManager: boolean;
    filter?: {
      branch?: {
        type?: BranchTypes;
        _id?: string;
      };
    };
  }) => {
    const withBranchFilter = filter?.branch?._id && filter?.branch?.type;

    const searchFilter = {
      role: isManager ? Roles.MANAGER : Roles.STAFF,
      ...(withBranchFilter && {
        branch: {
          type: filter.branch?.type,
          [filter.branch?.type === BranchTypes.COLLECTION_POINT
            ? 'collectionPoint'
            : 'transactionPoint']: filter.branch?._id,
        },
      }),
    };

    await dbConnect();
    const query = AccountModel.find(searchFilter);
    let employees = await query.lean().exec();

    employees = employees.map((employee) => {
      const temp = transformIntoGetUserDTO(employee as Account);
      return temp;
    });
    // console.log(employees);

    return {
      ok: true,
      status: 200,
      message: '',
      data: employees as GetUserDTO[],
    } satisfies ActionResponse;
  }
);
