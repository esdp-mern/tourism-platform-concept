import React, { useEffect, useState } from 'react';
import './TextField.css';

interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label?: string;
  required?: boolean;
  isSubmit?: boolean;
  value: string;
  onChange: React.ChangeEventHandler;
  icon: string;
}

const TextField: React.FC<Props> = (props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (props.isSubmit !== undefined) {
      setIsError(!!(props.required && props.isSubmit && !props.value));
    }
  }, [props.required, props.isSubmit, props.value]);

  return (
    <div className="text-field">
      <label
        className={`text-field-label ${
          isFocus ? 'text-field-label-hidden' : ''
        }`}
      >
        {props.label}
      </label>
      <input
        className={`text-field-input ${
          isError ? 'text-field-input-error' : ''
        }`}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => !props.value && setIsFocus(false)}
      />
      <img className="text-field-img" src={props.icon} alt="img" />
      {isError && (
        <span className="text-field-span">The text field is required.</span>
      )}
    </div>
  );
};

export default TextField;
