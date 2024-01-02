'use client';

import { createEmployeeAccount } from '@/actions/user/createEmployeeAccount';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { BranchTypes, Gender, Roles } from '@/constants';
import { CreateUserDTO } from '@/dtos/user/user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import validator from 'validator';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import CustomInputField from '@/components/main/CustomInputField';
import CustomSelect from '@/components/main/CustomSelect';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CustomComboBox from '@/components/main/CustomCombobox';
import { DisplayCollectionPointDTO } from '@/dtos/branches/collection-point.dto';
import { DisplayTransactionPointDTO } from '@/dtos/branches/transaction-point.dto';

export default function NewManagerDialog(props: any) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className='flex items-center gap-2'
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus className='h-4 w-4 text-lg font-semibold' /> Thêm tài khoản trưởng điểm
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mx-auto my-4 text-center text-xl font-semibold'>
          Thêm tài khoản trưởng điểm
        </DialogHeader>
        <NewManagerForm {...props} />
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  gender: z.nativeEnum(Gender),
  firstName: z.string().min(1, 'Không được để trống'),
  lastName: z.string().min(1, 'Không được để trống'),
  phone: z.string().refine(validator.isMobilePhone, 'Số điện thoại không hợp lệ'),
  branchType: z.nativeEnum(BranchTypes),
  collectionPointId: z.string().optional(),
  transactionPointId: z.string().optional(),
});

function NewManagerForm({
  branches,
  setManagers,
}: {
  branches: {
    collectionPoints: DisplayCollectionPointDTO[];
    transactionPoints: DisplayTransactionPointDTO[];
  };
  setManagers: Dispatch<SetStateAction<DisplayCollectionPointDTO[]>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      gender: Gender.MALE,
      firstName: '',
      lastName: '',
      phone: '',
      branchType: BranchTypes.COLLECTION_POINT,
      collectionPointId: '',
      transactionPointId: '',
    },
    mode: 'onSubmit',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setValue('transactionPointId', '');
  }, [form.watch('branchType')]);

  const collectionPointOptions = useMemo(
    () =>
      branches.collectionPoints.map((cp) => ({
        label: cp.name,
        value: cp._id,
      })),
    []
  );

  const transactionPointOptions = useMemo(() => {
    const selectedBranchType = form.watch('branchType');
    if (selectedBranchType === BranchTypes.COLLECTION_POINT) return [];

    const selectedCollectionPointId = form.watch('collectionPointId');
    return branches.transactionPoints
      .filter((tp) => tp.collectionPoint === selectedCollectionPointId)
      .map((tp) => ({
        label: tp.name,
        value: tp._id,
      }));
  }, [form.watch('branchType'), form.watch('collectionPointId')]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: CreateUserDTO = {
      role: Roles.MANAGER,
      gender: data.gender,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      branch: {
        type: data.branchType,
        _id:
          data.branchType === BranchTypes.COLLECTION_POINT
            ? data.collectionPointId!
            : data.transactionPointId!,
      },
    };
    try {
      setLoading(true);
      const res = await createEmployeeAccount(payload);
      if (!res?.ok) throw res?.message as string;
      else {
        toast.success(res?.message);
        const branchName =
          data.branchType === BranchTypes.COLLECTION_POINT
            ? branches.collectionPoints.find((cp) => cp._id === data.collectionPointId)?.name
            : branches.transactionPoints.find((tp) => tp._id === data.transactionPointId)?.name;
        setManagers((prev) => [
          ...prev,
          {
            ...res?.data,
            branch: {
              ...res?.data.branch,
              name: branchName,
            },
          },
        ]);
        form.reset();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : err;
      toast.error(msg as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex flex-row items-center justify-between gap-8'>
          <CustomInputField
            form={form}
            name='firstName'
            label='Họ'
            placeholder='Nhập họ'
            type='text'
            required
          />

          <CustomInputField
            form={form}
            name='lastName'
            label='Tên'
            placeholder='Nhập tên'
            type='text'
            required
          />
        </div>

        <FormField
          control={form.control}
          name={'gender'}
          render={({ field }) => (
            <FormItem className='flex w-full flex-row items-center gap-4'>
              <FormLabel htmlFor={field.name} className='mt-1 w-1/4'>
                Giới tính
              </FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className='flex w-3/4 flex-row gap-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value={Gender.MALE} id='male' />
                    <Label htmlFor='male'>Nam</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value={Gender.FEMALE} id='female' />
                    <Label htmlFor='female'>Nữ</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <CustomInputField
          form={form}
          name='email'
          label='Email'
          placeholder='Nhập email'
          type='email'
          required
        />

        <CustomInputField
          form={form}
          name='phone'
          label='Số điện thoại'
          placeholder='Nhập số điện thoại'
          type='text'
          required
        />

        <CustomSelect
          control={form.control}
          name='branchType'
          label='Loại chi nhánh'
          cointainerClassname='w-full flex flex-row items-center justify-between gap-4'
          labelClassname='w-1/4'
          selectClassname='w-3/4'
          options={[
            { label: 'Điểm tập kết', value: BranchTypes.COLLECTION_POINT },
            { label: 'Điểm giao dịch', value: BranchTypes.TRANSACTION_POINT },
          ]}
        />

        <CustomComboBox
          control={form.control}
          name='collectionPointId'
          label='Chi nhánh'
          containerClassname='w-full flex flex-row items-center justify-between gap-4'
          labelClassname='w-1/4'
          selectClassname='w-3/4'
          options={collectionPointOptions}
          placeholder='Chọn điểm tập kết'
          required
        />

        {form.watch('branchType') === BranchTypes.TRANSACTION_POINT && (
          <CustomComboBox
            control={form.control}
            name='transactionPointId'
            label=''
            containerClassname='mt-0 w-full flex flex-row items-center justify-between gap-4'
            labelClassname='w-1/4'
            selectClassname='w-3/4'
            options={transactionPointOptions}
            placeholder='Chọn điểm giao dịch'
          />
        )}

        <div className='flex flex-row items-center justify-center gap-2'>
          <Button variant='default' disabled={loading} type='submit'>
            Thêm
          </Button>
        </div>
      </form>
    </Form>
  );
}
