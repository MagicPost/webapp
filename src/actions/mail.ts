import { Roles } from '@/constants';
import nodemailer from 'nodemailer';
import { AES, HmacSHA256, SHA256 } from 'crypto-js';
import base64 from 'base-64';

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendActivationMail = async ({
  email,
  role,
  branch,
}: {
  email: string;
  role: Roles;
  branch: {
    _id: string;
    name: string;
    address: string;
  };
}) => {
  const message = {
    email,
    role,
    branch,
  };
  const encrypted = AES.encrypt(JSON.stringify(message), process.env.PRIVATE_KEY!).toString();
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'MagicPost - Kích hoạt tài khoản',
    text: `
    Xin chào,
    Bạn đã được cấp tài khoản MagicPost với email ${email}.
    Vui lòng nhấn vào link bên dưới để kích hoạt tài khoản:
    ${process.env.NEXT_PUBLIC_CLIENT_URL}/activate/${encrypted}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      ok: true,
      message: 'Email xác thực đã được gửi!',
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Email xác thực chưa được gửi!',
    };
  }
};
