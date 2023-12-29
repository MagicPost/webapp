import { Roles } from '@/constants';
import nodemailer from 'nodemailer';

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
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'MagicPost - Kích hoạt tài khoản',
    text: `${role} - ${JSON.stringify(branch)}`,
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
