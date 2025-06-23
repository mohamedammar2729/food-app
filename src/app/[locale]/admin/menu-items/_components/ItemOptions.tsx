/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Extra, ProductExtras, ProductSize, Size } from '@prisma/client';
import { Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams } from 'next/navigation';
import { Languages } from '@/constants/enums';
import { Translations } from '@/Types/translations';

export enum ItemOptionsKeys {
  SIZES,
  EXTRAS,
}

const sizesNames = [ProductSize.SMALL, ProductSize.MEDIUM, ProductSize.LARGE];

const extrasNames = [
  ProductExtras.CHEESE,
  ProductExtras.BACON,
  ProductExtras.ONION,
  ProductExtras.PEPPER,
  ProductExtras.SAUCE,
];

function handleOptions(
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>
) {
  // This function handles adding, changing, and removing options for sizes or extras.
  // It returns an object with methods to add an option, change an option's name or price, and remove an option.
  // The state is expected to be an array of Partial<Size> or Partial<Extra>[].
  // Each option is an object with a name and a price.
  // The addOption method adds a new option with an empty name and a price of 0.
  const addOption = () => {
    setState((prev: any) => {
      return [...prev, { name: '', price: 0 }];
    });
  };
  // The onChange method updates the name or price of an option at a specific index.
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    // The index parameter specifies which option to update.
    index: number,
    // The fieldName parameter specifies which field to update ('name' or 'price').
    fieldName: string
  ) => {
    const newValue = e.target.value;
    setState((prev: any) => {
      // Create a new array of options, updating the specified field for the option at the given index.
      // This ensures that the state is updated immutably.
      // The fieldName can be 'name' or 'price', and the newValue is the value from the input field.
      const newSizes = [...prev];
      // newSizes is an array of objects {name, price}, where each object represents an option.
      // fieldName is either 'name' or 'price', and newValue is the value from the input field.
      newSizes[index][fieldName] = newValue;
      return newSizes;
    });
  };
  const removeOption = (indexToRemove: number) => {
    setState((prev: any) => {
      // remove based on index
      return prev.filter((_: any, index: number) => index !== indexToRemove);
    });
  };
  return { addOption, onChange, removeOption };
}

function ItemOptions({
  state,
  setState,
  translations,
  optionKey,
}: {
  state: Partial<Size>[] | Partial<Extra>[];
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
  translations: Translations;
  optionKey: ItemOptionsKeys;
}) {
  const { addOption, onChange, removeOption } = handleOptions(setState);

  const isThereAvailableOptions = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        return sizesNames.length > state.length;
      case ItemOptionsKeys.EXTRAS:
        return extrasNames.length > state.length;
    }
  };
  return (
    <>
      {state.length > 0 && (
        <ul>
          {state.map((item, index) => {
            return (
              <li key={index} className='flex gap-2 mb-2'>
                <div className='space-y-1 basis-1/2'>
                  <Label>name</Label>
                  <SelectName
                    item={item}
                    onChange={onChange}
                    index={index}
                    currentState={state}
                    optionKey={optionKey}
                  />
                </div>
                <div className='space-y-1 basis-1/2'>
                  <Label>Extra Price</Label>
                  <Input
                    type='number'
                    placeholder='0'
                    min={0}
                    name='price'
                    value={item.Price}
                    onChange={(e) => onChange(e, index, 'price')}
                    className='bg-white focus:!ring-0'
                  />
                </div>
                <div className='flex items-center'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {isThereAvailableOptions() && (
        <Button
          type='button'
          variant='outline'
          className='w-full'
          onClick={addOption}
        >
          <Plus />
          {optionKey === ItemOptionsKeys.SIZES
            ? translations.admin['menu-items'].addItemSize
            : translations.admin['menu-items'].addExtraItem}
        </Button>
      )}
    </>
  );
}

export default ItemOptions;

const SelectName = ({
  onChange,
  index,
  item,
  currentState,
  optionKey,
}: {
  index: number;
  item: Partial<Size> | Partial<Extra>;
  currentState: Partial<Size>[] | Partial<Extra>[];
  optionKey: ItemOptionsKeys;
  onChange: (e: any, index: any, fieldName: any) => void;
}) => {
  const { locale } = useParams();

  const getNames = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        const filteredSizes = sizesNames.filter(
          // !currentState means we are checking if the current state does not already contain the size
          // we filter out sizes that are already in the current state
          (size) => !currentState.some((s) => s.name === size)
        );
        return filteredSizes;
      case ItemOptionsKeys.EXTRAS:
        const filteredExtras = extrasNames.filter(
          (extra) => !currentState.some((e) => e.name === extra)
        );
        return filteredExtras;
    }
  };

  const names = getNames();

  return (
    <Select
      onValueChange={(value) => {
        onChange({ target: { value } }, index, 'name');
      }}
      defaultValue={item.name ? item.name : 'select...'}
    >
      <SelectTrigger
        className={` bg-white border-none mb-4 focus:ring-0 ${
          locale === Languages.ARABIC ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <SelectValue>{item.name ? item.name : 'select...'}</SelectValue>
      </SelectTrigger>
      <SelectContent className='border-none z-50 bg-white'>
        <SelectGroup className='bg-background text-accent z-50'>
          {names.map((name, index) => (
            <SelectItem
              key={index}
              value={name}
              className='hover:!bg-primary hover:!text-white !text-accent !bg-transparent'
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
