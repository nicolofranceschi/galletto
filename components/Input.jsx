import { useFormContext } from 'react-hook-form';
import { useFamily } from '../components/Section';

export default function Input({ minore, name: baseName, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const f = useFamily();

  const temp = minore ? f + baseName + '_minore' : f + baseName;

  const name = temp.toLowerCase().replaceAll(' ', '_');

  return (
    <div className='flex flex-grow flex-col gap-1'>
      <input type='text' {...props} className='w-full p-2 rounded-md' {...register(name, { required: true })} />
      <span>{baseName}</span>
      {errors[name] && <span className='text-red-500 text-sm'>Questo campo è obbligatorio</span>}
    </div>
  );
}
