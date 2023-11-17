import React, { CSSProperties, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectGuides } from '@/containers/guides/guidesSlice';
import { fetchGuides } from '@/containers/guides/guidesThunk';

interface Props {
  name: string;
  label?: string;
  selectedGuideIds: string[]; // Массив выбранных айди гидов
  onSelect: (selectedGuideIds: string[]) => void;
  isSubmit?: boolean;
}

interface IOption {
  value: string;
  label: string;
}

const TextFieldSelect: React.FC<Props> = (props) => {
  const guides = useAppSelector(selectGuides);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGuides());
  }, [dispatch]);

  const [options, setOptions] = useState<IOption[]>([]);

  useEffect(() => {
    if (guides && !options.length) {
      console.log(guides);
      setOptions(
        guides.map((guide) => ({
          value: guide._id,
          label: guide.user.displayName,
        })),
      );
    }
  }, [guides, options]);

  // @ts-ignore
  const handleSelectChange = (selectedOptions: MultiValue<IOption, true>) => {
    const selectedValues = (selectedOptions as IOption[]).map(
      (option) => option.value,
    );

    props.onSelect(selectedValues);
  };

  return (
    <Select
      className={`text-field-select text-field-input-guides`}
      options={options}
      value={options.filter((option) =>
        props.selectedGuideIds.includes(option.value),
      )}
      onChange={handleSelectChange}
      placeholder={props.label}
      name={props.name}
      required
      isMulti
    />
  );
};

export default TextFieldSelect;
