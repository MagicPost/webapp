import { NextRequest } from 'next/server';
import { z } from 'zod';
import { handleZodCredentials } from './utils';
import { Types } from 'mongoose';

export const getParsedId = (id: string) => {
  return handleZodCredentials(
    z
      .string()
      .refine((val) => Types.ObjectId.isValid(val))
      .safeParse(id)
  );
};
