import React, { useEffect, useRef, useState } from 'react';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import TextFieldSelect from '@/components/UI/TextField/components/TextFieldSelect/TextFieldSelect';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute | 'select';
  value: string;
  onChange: (e: IChangeEvent) => void;
  icon: string;
  className?: string;
  label?: string;
  errorMessage?: string;
  errorMessageSize?: string | number;
  required?: boolean;
  isSubmit?: boolean;
  style?: React.CSSProperties;
}

const TextField: React.FC<Props> = (props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [prevSelectedDate, setPrevSelectedDate] = useState<Date>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (props.errorMessage) setIsError(true);
    if (props.isSubmit !== undefined) {
      setIsError(!!(props.required && props.isSubmit && !props.value));
    }
    if (inputRef.current && selectedDate && prevSelectedDate !== selectedDate) {
      props.onChange({
        target: {
          name: inputRef.current.name,
          value: selectedDate.toISOString(),
        },
      });
      setPrevSelectedDate(selectedDate);
    }
  }, [inputRef, props, prevSelectedDate, selectedDate]);

  const isDatePicker = props.type === 'date';
  const isSelect = props.type === 'select';

  const getFormat = (date: Date) => format(date, 'dd/MM/yyyy');

  const inputClassNames: string[] = ['text-field-input'];

  if (isError && props.errorMessage) {
    inputClassNames.push('text-field-input-error');
  }
  if (!props.icon) inputClassNames.push('text-field-input-no-icon');

  return (
    <div className="text-field" style={props.style}>
      <label
        className={`text-field-label ${
          isFocus || (isDatePicker && selectedDate) || props.value
            ? 'text-field-label-hidden'
            : ''
        } ${!props.icon ? 'text-field-label-no-icon' : ''}`}
      >
        {props.label}
      </label>
      {isSelect ? (
        <TextFieldSelect
          name={props.name}
          label={props.label}
          value={props.value}
          onSelect={props.onChange}
          className={inputClassNames.join(' ')}
        />
      ) : (
        <input
          className={inputClassNames.join(' ') + (props.className || '')}
          type={isDatePicker ? 'text' : props.type}
          name={props.name}
          value={
            isDatePicker
              ? selectedDate
                ? getFormat(selectedDate)
                : ''
              : props.value
          }
          onChange={(e) => {
            setIsError(false);
            props.onChange(
              isDatePicker
                ? {
                    target: {
                      name: 'date',
                      value: selectedDate ? selectedDate.toISOString() : '',
                    },
                  }
                : e,
            );
          }}
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoComplete="off"
        />
      )}
      <img className="text-field-img" src={props.icon} alt="img" />
      {(isError || props.errorMessage) && (
        <span
          className="text-field-span"
          style={{ fontSize: props.errorMessageSize }}
        >
          {props.errorMessage?.includes('required')
            ? 'The text field is required.'
            : props.errorMessage}
        </span>
      )}

      {isDatePicker && (
        <div className={`day-picker ${isFocus ? '' : 'day-picker-hide'}`}>
          <DayPicker
            mode="single"
            showOutsideDays
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiersClassNames={{
              disabled: 'my-disabled',
              selected: 'my-selected',
              today: 'my-today',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TextField;
