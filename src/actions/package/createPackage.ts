'use server';

import dbConnect from '@/db/dbConnect';
import {
  AccountModel,
  CollectionPointModel,
  PackageModel,
  TransactionPointModel,
} from '@/db/models';
import { transformObjectIdFromLeanedDoc } from '@/lib/mongo';
import { catchAsync } from '../_helpers/catchAsync';
import { ActionResponse } from '../_helpers/types';
import { auth } from '@/lib/auth';
import { CreatePackageDTO, GetPackageDTO } from '@/dtos/package/package.dto';
import { GetUserDTO } from '@/dtos/user/user.dto';
import { getTransportRoutes } from '@/lib/transport-route';
import { BranchTypes, PackageStates, PackageTrackingActions } from '@/constants';
import { BranchInfo } from '@/db/models/Package';

export const createPackage = catchAsync(async (createPackageDTO: CreatePackageDTO) => {
  await dbConnect();

  const session = await auth();
  if (!session || !session.user) throw new Error('Bạn chưa đăng nhập!');
  const user = session.user;
  let account = await AccountModel.findOne({ email: user.email }).select('_id').lean().exec();
  account = transformObjectIdFromLeanedDoc(account) as GetUserDTO;
  if (!account) throw new Error('Tài khoản không tồn tại!');

  let routes = getTransportRoutes(
    {
      province: createPackageDTO.branch.province,
      district: createPackageDTO.branch.district,
    },
    {
      province: createPackageDTO.receiver.province,
      district: createPackageDTO.receiver.district,
    }
  );
  routes.shift();

  const tracking = await getEmptyLogs(routes, createPackageDTO);

  const payload = {
    type: createPackageDTO.package.type,
    creator: account._id,
    sentAt: createPackageDTO.branch._id,
    receivedAt: tracking[tracking.length - 1].branch.ref,
    sender: {
      fullname: createPackageDTO.sender.fullname,
      email: createPackageDTO.sender.email,
      phone: createPackageDTO.sender.phone,
      address: getFullAddress(createPackageDTO.sender),
    },
    receiver: {
      fullname: createPackageDTO.receiver.fullname,
      email: createPackageDTO.receiver.email,
      phone: createPackageDTO.receiver.phone,
      address: getFullAddress(createPackageDTO.receiver),
    },
    postages: {
      payer: createPackageDTO.service?.payer,
      main: createPackageDTO.postages.main,
      plus: createPackageDTO.postages.plus,
    },
    services: {
      transit: createPackageDTO.service?.transit,
      note: createPackageDTO.service?.note,
      COD: createPackageDTO.service?.COD,
      payer: createPackageDTO.service?.payer,
      pickupTime: createPackageDTO.service?.pickupTime,
    },
    items: createPackageDTO.package?.items,
    state:
      tracking.length === 1
        ? PackageStates.PENDING__READY_TO_DELIVER
        : PackageStates.PENDING__READY_TO_TRANSER,
    tracking,
  };

  let newPackage = await PackageModel.create(payload);
  newPackage = transformObjectIdFromLeanedDoc(newPackage.toObject()) as GetPackageDTO;

  return {
    ok: true,
    message: 'Tạo đơn hàng thành công',
    data: {
      _id: newPackage._id,
    },
  } satisfies ActionResponse;
});

function getFullAddress(client: CreatePackageDTO['sender' | 'receiver']) {
  return `${client.address}, ${client.ward}, ${client.district}, ${client.province}`;
}

async function getEmptyLogs(routes: any[], createPackageDTO: CreatePackageDTO) {
  const mapping = routes.map(async (route) => {
    const type = !route?.district ? BranchTypes.COLLECTION_POINT : BranchTypes.TRANSACTION_POINT;
    const model = !route?.district ? CollectionPointModel : TransactionPointModel;
    return Promise.all([
      Promise.resolve(type),
      model
        .findOne({ ...route })
        .select('_id name')
        .lean(),
    ]);
  });
  let results = await Promise.all(mapping);

  let branches = results
    .map((branch) => {
      const temp = transformObjectIdFromLeanedDoc(branch);
      return temp;
    })
    .filter(([_, branch]) => !!branch)
    .map(([type, branch]) => ({ type, ref: branch._id, name: branch.name })) as BranchInfo[];

  const logs = [
    {
      branch: {
        type: createPackageDTO.branch.type,
        name: createPackageDTO.branch.name,
        ref: createPackageDTO.branch._id,
      },
      actions: [
        {
          type: PackageTrackingActions.CREATED,
          createdAt: new Date(),
        },
      ],
    },
  ];

  logs.push(...branches.map((branch) => ({ branch, actions: [] })));
  return logs;
}
