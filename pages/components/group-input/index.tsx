type GroupInputProps = {
  label: string;
  placeholder?: string;
};

const GroupInput = ({ label, placeholder }: GroupInputProps) => {
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
          type='number'
          name='number'
          id={label}
          className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'
          placeholder={placeholder}
        />
        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
          <span className='text-gray-500 sm:text-sm' id='price-currency'>
            USD
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupInput;
