import React, { useEffect, useRef, useState } from 'react';
import './TextField.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { IChangeEvent } from '../../../containers/OneTourPage/components/OneTourOrderForm/OneTourOrderForm';
import TextFieldSelect from './components/TextFieldSelect/TextFieldSelect';

interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute | 'select';
  label?: string;
  required?: boolean;
  isSubmit?: boolean;
  value: string;
  onChange: (e: IChangeEvent) => void;
  icon: string;
}

const TextField: React.FC<Props> = (props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [prevSelectedDate, setPrevSelectedDate] = useState<Date>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (props.isSubmit !== undefined) {
      setIsError(!!(props.required && props.isSubmit && !props.value));
    }
  }, [props.required, props.isSubmit, props.value]);

  useEffect(() => {
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

  const inputClassNames = `text-field-input ${
    isError ? 'text-field-input-error' : ''
  }`;

  return (
    <div className="text-field">
      <label
        className={`text-field-label ${
          isFocus || (isDatePicker && selectedDate) || props.value
            ? 'text-field-label-hidden'
            : ''
        }`}
      >
        {props.label}
      </label>
      {isSelect ? (
        <TextFieldSelect
          name={props.name}
          label={props.label}
          value={props.value}
          onSelect={props.onChange}
          className={inputClassNames}
        />
      ) : (
        <input
          className={inputClassNames}
          type={isDatePicker ? 'text' : props.type}
          name={props.name}
          value={
            isDatePicker
              ? selectedDate
                ? getFormat(selectedDate)
                : ''
              : props.value
          }
          onChange={(e) =>
            props.onChange(
              isDatePicker
                ? {
                    target: {
                      name: 'date',
                      value: selectedDate ? selectedDate.toISOString() : '',
                    },
                  }
                : e,
            )
          }
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoComplete="off"
        />
      )}
      <img className="text-field-img" src={props.icon} alt="img" />
      {isError && (
        <span className="text-field-span">The text field is required.</span>
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
