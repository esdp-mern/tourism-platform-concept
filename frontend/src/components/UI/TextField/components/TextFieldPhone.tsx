import 'react-phone-number-input/style.css';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import React, { useEffect, useState } from 'react';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { E164Number } from 'libphonenumber-js';
import { T } from '@/store/translation';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  isSubmit?: boolean;
  value: string;
  onChange: (e: IChangeEvent) => void;
  icon: string;
}

export const TextFieldPhone: React.FC<Props> = (props) => {
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (props.isSubmit !== undefined) {
      setIsError(!!(props.required && props.isSubmit && !props.value));
    }
  }, [props]);

  const handleChange = (val: E164Number | undefined) => {
    props.onChange({
      target: {
        name: props.name,
        value: val ? val.toString() : '',
      },
    });
  };
  const internationalIcon: React.ElementType = () => (
    <img className="text-field-img" src={props.icon} alt="img" />
  );

  return (
    <div className="text-field">
      <PhoneInputWithCountrySelect
        placeholder={T('/oneTourPage', 'tour_order_form_phone')}
        internationalIcon={internationalIcon}
        value={props.value}
        onChange={(e) => handleChange(e)}
        autoComplete="off"
        className="input-phone-number"
        international
        required
      />

      {isError && (
        <span className="text-field-span">The phone is required.</span>
      )}
    </div>
  );
};
