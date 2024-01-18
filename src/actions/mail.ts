'use server';

import { BranchTypes, Roles } from '@/constants';
import nodemailer from 'nodemailer';
import { AES } from 'crypto-js';
import base64 from 'base-64';
import dbConnect from '@/db/dbConnect';
import { CollectionPointModel, TransactionPointModel } from '@/db/models';
import { getFullAddress } from '@/lib/address';

type BranchInfo = {
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
};

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  port: 2003,
  secure: false,
  tls: { rejectUnauthorized: false },
  debug: true,
});

export const sendActivationMail = async ({
  email,
  role,
  branch,
}: {
  email: string;
  role: Roles;
  branch: {
    type: BranchTypes;
    _id: string;
  };
}) => {
  const message = {
    email,
    role,
    branch,
  };
  const encrypted = AES.encrypt(JSON.stringify(message), process.env.PRIVATE_KEY!).toString();
  const base64Encoded = base64.encode(encrypted);

  try {
    await dbConnect();

    let query =
      branch.type === BranchTypes.COLLECTION_POINT
        ? CollectionPointModel.findOne({ _id: branch._id })
        : TransactionPointModel.findOne({ _id: branch._id });

    query = query.select('name address province district ward');

    const { name, address, province, district, ward } = (await query.exec()) as BranchInfo;
    const fullAddress = getFullAddress({ address, province, district, ward });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'MagicPost - Kích hoạt tài khoản',
      html: `<div style="font-size: 16px;">
            Xin chào,
            <br />
            Bạn đã được cấp tài khoản <b>MagicPost</b> với email ${email}.
            <br />
            Thông tin chi tiết:
            <div>
              <p>- Tên đăng nhập: <b>${email}</b></p>
              <p>- Loại tài khoản: <b>${
                role === Roles.STAFF ? 'Giao dịch viên' : 'Trưởng điểm'
              }</b></p>
              <p>- Chi nhánh: ${name}</p>
              <p>- Địa chỉ: ${fullAddress}</p>
            </div>
            <br />
            Vui lòng nhấn vào <a href="${
              process.env.NEXT_PUBLIC_CLIENT_URL
            }/activate/${base64Encoded}">liên kết này</a>
            để kích hoạt tài khoản và đổi mật khẩu!
            </div>
            `,
    };

    const result = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) reject(err);
        else resolve(info);
      });
    });

    return {
      ok: true,
      message: 'Email xác thực đã được gửi!',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Email xác thực chưa được gửi!',
    };
  }
};
