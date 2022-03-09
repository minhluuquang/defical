import Big from 'big.js';
import React from 'react';
import { UseFormRegister, Path, FieldError } from 'react-hook-form';
import { IFormValues } from '../..';

interface GroupInputProps {
  label: string;
  name: Path<IFormValues>;
  placeholder?: string;
  register: UseFormRegister<IFormValues>;
  error?: FieldError;
}

const GroupInput = ({
  label,
  placeholder,
  register,
  name,
  error,
}: GroupInputProps) => {
  return (
    <div className='mb-6'>
      <label
        htmlFor={label}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <span className='text-gray-500 sm:text-sm'>$</span>
        </div>
        <input
          {...register(name, {
            required: { value: true, message: 'this field is required' },
            validate: (value) => {
              const n = Big(value);
              if (n.lte(Big(0))) {
                return 'only positive number';
              }
              return true;
            },
          })}
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
  );
};

export default GroupInput;
