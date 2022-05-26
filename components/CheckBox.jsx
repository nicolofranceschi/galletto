import { useFormContext } from 'react-hook-form';

export default function CheckBox({ text, label, children, name }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='flex flex-col gap-2'>
      <span>{text}</span>
      <div className='flex gap-2 items-center'>
        <input type='checkbox' name={name} {...register(name, { required: true })} />
        <label htmlFor={name} className='flex flex-wrap gap-1'>
          {label}
          {children}
        </label>
      </div>
      {errors[name] && <span className='text-red-500 text-sm'>Questo campo è obbligatorio</span>}
    </div>
  );
}
