import ImageUpload from '../libs/atoms/ImageUpload/ImageUpload';
import Layout from '../libs/Layout';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../libs/atoms/Button/Button';
import Input from '../libs/atoms/Input/InputField';
import { UserDetails } from '../libs/data';

export type UserForm = {
  name: string;
  image: string;
  address: string;
  email: string;
};

const DashboardPage = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    image: Yup.mixed()
      .required()
      .test('test', 'You need to upload an image', (files: any) => {
        return typeof files.name === 'string';
      }),
    email: Yup.string().email().required(),
    address: Yup.string().required(),
  });

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...UserDetails,
    },
    mode: 'onChange',
  });

  const handleFormSubmit = (data: UserForm) => {
    console.log(data);
    setValue('image', '');
    reset();
  };
  return (
    <Layout>
      <form className='form-container' onSubmit={handleSubmit(handleFormSubmit)}>
        <ImageUpload name='image' error={errors.image} register={register} setValue={setValue} />
        <Input type='text' label='Name' name='name' placeholder='name' register={register} errors={errors.name} />
        <Input type='text' label='Email' name='email' placeholder='email' register={register} errors={errors.email} />
        <Input
          type='text'
          label='Address'
          name='address'
          placeholder='address'
          register={register}
          errors={errors.address}
        />

        <Button variant='primary' text='Update' type='submit' />
      </form>
    </Layout>
  );
};

export default DashboardPage;
