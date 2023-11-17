import React from 'react';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import Select from 'react-select';

interface Props {
  name: string;
  label?: string;
  value: string;
  onSelect: (e: IChangeEvent) => void;
  className?: string;
}

const TextFieldSelect: React.FC<Props> = (props) => {
  const tour = useAppSelector(selectOneTour);

  return (
    <Select
      className={`text-field-select ${props.className}`}
      options={tour?.guides}
      value={tour?.guides.find((option) => option._id === props.value)}
      onChange={(newValue) =>
        newValue &&
        props.onSelect({ target: { name: props.name, value: newValue._id } })
      }
      placeholder={props.label}
      name={props.name}
    />
  );
};

export default TextFieldSelect;
