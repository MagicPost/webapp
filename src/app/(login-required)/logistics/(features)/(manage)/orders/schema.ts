import {
  PackageTypes,
  Payer,
  PickupTime,
  SpecialProperties,
  TransitServiceTypes,
} from '@/constants';
import validator from 'validator';
import { z } from 'zod';

export const clientFormSchema = z.object({
  phone: z.string().refine(validator.isMobilePhone, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').or(z.literal('')),
  fullname: z.string().min(1, 'Không được để trống!'),
  address: z.string().min(1, 'Không được để trống!'),
  province: z.string().min(1, 'Không được để trống!'),
  district: z.string().min(1, 'Không được để trống!'),
  ward: z.string().min(1, 'Không được để trống!'),
});

export const packageFormSchema = z.object({
  type: z.nativeEnum(PackageTypes),
  specialNotes: z.object({
    [SpecialProperties.HIGHVALUE]: z.boolean(),
    [SpecialProperties.FRAGILE]: z.boolean(),
    [SpecialProperties.LIQUID]: z.boolean(),
    [SpecialProperties.PERISHABLE]: z.boolean(),
    [SpecialProperties.BULKY]: z.boolean(),
  }),
  items: z.array(
    z.object({
      name: z.string().min(1, 'Không được để trống!'),
      quantity: z.number().positive('Phải lớn hơn 0!'),
      weight: z.number().positive('Phải lớn hơn 0!'),
      price: z.number().positive('Phải lớn hơn 0!'),
    })
  ),
});

export const serviceFormSchema = z.object({
  transit: z.nativeEnum(TransitServiceTypes),
  plus: z.object({
    insurance: z.boolean(),
    refund: z.boolean(),
  }),
  note: z.string(),
  COD: z.number().min(0, 'Số tiền phải lớn hơn 0'),
  payer: z.nativeEnum(Payer),
  pickupTime: z.nativeEnum(PickupTime),
});
