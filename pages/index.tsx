import {
  Text,
  AppShell,
  Header,
  Box,
  Divider,
  Button,
  NumberInput,
} from '@mantine/core';
import Big from 'big.js';
import { NextPage } from 'next';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Currency } from 'tabler-icons-react';

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
    control,
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
    <AppShell
      header={
        <Header height={64} p='xs'>
          <ColorSchemeToggle />
        </Header>
      }
    >
      <div className='flex'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-1/3 mr-4'>
          <Text className='mb-4'>Initial Price</Text>
          <Controller
            name='initPriceA'
            control={control}
            render={({ field }) => (
              <NumberInput
                defaultValue={1}
                placeholder='Token A'
                label='Token A'
                icon={<Currency size={18} />}
                {...field}
                value={parseFloat(field.value)}
              ></NumberInput>
            )}
          />
          <Controller
            name='initPriceB'
            control={control}
            render={({ field }) => (
              <NumberInput
                defaultValue={1}
                placeholder='Token B'
                label='Token B'
                icon={<Currency size={18} />}
                {...field}
                value={parseFloat(field.value)}
              ></NumberInput>
            )}
          />
          <Divider />

          <Text className='my-4'>Future Price</Text>
          <Controller
            name='futurePriceA'
            control={control}
            render={({ field }) => (
              <NumberInput
                defaultValue={1}
                placeholder='Token A'
                label='Token A'
                icon={<Currency size={18} />}
                {...field}
                value={parseFloat(field.value)}
              ></NumberInput>
            )}
          />
          <Controller
            name='futurePriceB'
            control={control}
            render={({ field }) => (
              <NumberInput
                defaultValue={1}
                placeholder='Token B'
                label='Token B'
                icon={<Currency size={18} />}
                {...field}
                value={parseFloat(field.value)}
              ></NumberInput>
            )}
          />
          <Button type='submit' className='w-full mt-4'>
            Calculate
          </Button>
        </form>

        <div className='w-2/3 items-stretch'>
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              height: '100%',
              borderRadius: theme.radius.md,
              cursor: 'pointer',

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              },
            })}
          >
            <div className='p-6'>
              <Text>{`Impermanent loss: ${IL}%`}</Text>
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
                - Have 612.37 Token A and 204.12 Token B (in liquidity pool)
              </p>
              <p>{`- Value if providing liquidity: $${liqValue}`}</p>
            </div>
          </Box>
        </div>
      </div>
    </AppShell>
  );
};

export default Home;
