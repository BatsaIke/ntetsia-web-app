
import React from 'react';
import { PhoneInput, COUNTRIES } from 'baseui/phone-input';
import { FormControl} from '@chakra-ui/react';
import {useStyletron} from 'baseui';

const FormPhone = ({
  name,
  isRequired,
  error,
  touch,
  setFieldValue,
  setCountryCode,
  value,
  ...rest
}) => {
  const [country, setCountry] = React.useState(COUNTRIES.GH);
  const [text, setText] = React.useState('');
  const [css,theme] = useStyletron();

  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={error && touch}>
      <PhoneInput


className={css({
  display: 'flex',
  fontSize: '14px',
  lineHeight: '1.25',
})}
        name={name}
        value={value}
        country={country}
        onCountryChange={({ option }) => {
          //console.log("OPTIONS",option)
          setCountryCode(option.dialCode)
          setCountry(option)
        }}
        text={text}
        onTextChange={(e) => {
        setText(`${country.dialCode +e.currentTarget.value}`);
          console.log(e);
          setFieldValue(name, `${country.dialCode}${e.currentTarget.value}`);
        }}
        placeholder='0200000099'
        overrides={{
          Root: {
            style: {              
              height: '30px',
            },
          },
          Input: {
            style: {
              height: '30px',
            },
          },
        }}
        {...rest}
      />
    </FormControl>
  );
};

export default FormPhone;
