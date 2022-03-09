import type { NextPage } from 'next';
import { Disclosure } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import GroupInput from './components/group-input';
import Divider from './components/divider';
import { useState } from 'react';
import Big from 'big.js';
import { useForm } from 'react-hook-form';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [{ name: 'Impermanent Loss', href: '#', current: true }];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export interface IFormValues {
  initPriceA: string;
  initPriceB: string;
  futurePriceA: string;
  futurePriceB: string;
}

const Home: NextPage = () => {
  const [initValueA, setInitValueA] = useState<string>('500');
  const [initValueB, setInitValueB] = useState<string>('500');

  const [IL, setIL] = useState<string>('0');
  const [holdValue, setHoldValue] = useState<string>('0');
  const [liqValue, setLiqValue] = useState<string>('0');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      initPriceA: '1',
      initPriceB: '1',
      futurePriceA: '1',
      futurePriceB: '1',
    },
  });

  const onSubmit = (data: IFormValues) => {
    const { initPriceA, initPriceB, futurePriceA, futurePriceB } = data;
    // x * y = k
    const x = Big(initValueA).div(initPriceA);
    const y = Big(initValueB).div(initPriceB);
    const k = x.mul(y);

    const fx = k.mul(futurePriceB).div(futurePriceA).sqrt();
    const fy = k.mul(futurePriceA).div(futurePriceB).sqrt();

    const fValueA = fx.mul(futurePriceA);
    const fValueB = fy.mul(futurePriceB);

    const totalHoldValue = x.mul(futurePriceA).add(y.mul(futurePriceB));
    const totalLiqValue = Big(fValueA).add(fValueB);

    const IL = totalLiqValue
      .minus(totalHoldValue)
      .abs()
      .div(totalHoldValue)
      .mul(100)
      .toFixed(2);

    setIL(IL);
    setHoldValue(totalHoldValue.toFixed(2));
    setLiqValue(totalLiqValue.toFixed(2));
  };

  return (
    <>
      <div className='min-h-full'>
        <Disclosure as='nav' className='bg-gray-800'>
          {({ open }) => (
            <>
              <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 text-4xl'>🧮</div>
                    <div className='hidden md:block'>
                      <div className='ml-10 flex items-baseline space-x-4'>
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XIcon className='block h-6 w-6' aria-hidden='true' />
                      ) : (
                        <MenuIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='md:hidden'>
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className='pt-4 pb-3 border-t border-gray-700'>
                  <div className='flex items-center px-5'>
                    <div className='flex-shrink-0'>
                      <img
                        className='h-10 w-10 rounded-full'
                        src={user.imageUrl}
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium leading-none text-white'>
                        {user.name}
                      </div>
                      <div className='text-sm font-medium leading-none text-gray-400'>
                        {user.email}
                      </div>
                    </div>
                    <button
                      type='button'
                      className='ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                  <div className='mt-3 px-2 space-y-1'>
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as='a'
                        href={item.href}
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8'>
              {/* Left column */}
              <div className='grid grid-cols-1 gap-4'>
                <section aria-labelledby='section-1-title'>
                  <h2 className='sr-only' id='section-1-title'>
                    Section title
                  </h2>
                  <div className='rounded-lg bg-white overflow-hidden shadow'>
                    <div className='p-6 min-h-full'>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='mb-4'>Initial Price</p>
                        <GroupInput
                          label='token A'
                          {...register('initPriceA', {
                            required: {
                              value: true,
                              message: 'this field is required',
                            },
                            validate: (value) => {
                              const n = Big(value);
                              if (n.lte(Big(0))) {
                                return 'only positive number';
                              }
                              return true;
                            },
                          })}
                          name='initPriceA'
                          error={errors.initPriceA}
                        />
                        <GroupInput
                          label='token B'
                          {...register('initPriceB', {
                            required: {
                              value: true,
                              message: 'this field is required',
                            },
                            validate: (value) => {
                              const n = Big(value);
                              if (n.lte(Big(0))) {
                                return 'only positive number';
                              }
                              return true;
                            },
                          })}
                          name='initPriceB'
                          error={errors.initPriceB}
                        />
                        <Divider />

                        <p className='mb-4'>Future Price</p>
                        <GroupInput
                          label='token A'
                          {...register('futurePriceA', {
                            required: {
                              value: true,
                              message: 'this field is required',
                            },
                            validate: (value) => {
                              const n = Big(value);
                              if (n.lte(Big(0))) {
                                return 'only positive number';
                              }
                              return true;
                            },
                          })}
                          name='futurePriceA'
                          error={errors.futurePriceA}
                        />
                        <GroupInput
                          label='token B'
                          {...register('futurePriceB', {
                            required: {
                              value: true,
                              message: 'this field is required',
                            },
                            validate: (value) => {
                              const n = Big(value);
                              if (n.lte(Big(0))) {
                                return 'only positive number';
                              }
                              return true;
                            },
                          })}
                          name='futurePriceB'
                          error={errors.futurePriceB}
                        />
                        <button
                          type='submit'
                          className='w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                          Calculate
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className='grid grid-cols-1 gap-4 lg:col-span-2'>
                <section aria-labelledby='section-2-title'>
                  <h2 className='sr-only' id='section-2-title'>
                    Section title
                  </h2>
                  <div className='rounded-lg bg-white overflow-hidden shadow'>
                    <div className='p-6'>
                      <p>{`Impermanent loss: ${IL}%`}</p>
                      <Divider />
                      <p>If $500 of Token A and $500 of Token B were held</p>
                      <p>- Have 500.00 Token A and 250.00 Token B</p>
                      <p>{`- Value if held: $${holdValue}`}</p>
                      <Divider />
                      <p>
                        If $500 of Token A and $500 of Token B were provided as
                        liquidity
                      </p>
                      <p>
                        - Have 612.37 Token A and 204.12 Token B (in liquidity
                        pool)
                      </p>
                      <p>{`- Value if providing liquidity: $${liqValue}`}</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
