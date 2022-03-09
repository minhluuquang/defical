import React from 'react';
import { UseFormRegister, Path, FieldError } from 'react-hook-form';
import { IFormValues } from '../..';

interface GroupInputProps {
  label: string;
  placeholder?: string;
  error?: FieldError;
  name: Path<IFormValues>;
}

const GroupInput = React.forwardRef<
  HTMLInputElement,
  GroupInputProps & ReturnType<UseFormRegister<IFormValues>>
>(({ label, error, placeholder, name, onChange, onBlur }, ref) => (
  <div className='mb-6'>
    <label htmlFor={label} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <div className='mt-1 relative rounded-md shadow-sm'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <span className='text-gray-500 sm:text-sm'>$</span>
      </div>
      <input
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        type='number'
        step='any'
        className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'
        placeholder={placeholder}
      />
      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
        <span className='text-gray-500 sm:text-sm' id='price-currency'>
          USD
        </span>
      </div>
    </div>
    {error && (
      <p className='mt-2 text-sm text-red-600' id='email-error'>
        {error.message}
      </p>
    )}
  </div>
));
GroupInput.displayName = 'GroupInput';

export default GroupInput;
