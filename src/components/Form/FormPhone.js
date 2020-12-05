import React from 'react';
import { PhoneInput, COUNTRIES } from 'baseui/phone-input';
import { FormControl, FormLabel } from '@chakra-ui/react';

const FormPhone = ({
  name,
  isRequired,
  error,
  touch,
  setFieldValue,
  value,
}) => {
  const [country, setCountry] = React.useState(COUNTRIES.GH);
  const [text, setText] = React.useState('');

  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={error && touch}>
      <FormLabel>Phone number</FormLabel>
      <PhoneInput
        country={country}
        onCountryChange={({ option }) => setCountry(option)}
        text={text}
        onTextChange={(e) => {
          setText(e.currentTarget.value);
          setFieldValue(name, `${country.dialCode}${e.currentTarget.value}`);
        }}
        placeholder='5555555555'
        overrides={{
          Root: {
            style: {
              backgroundColor: '#fff',
              height: '30px',
            },
          },
          Input: {
            style: {
              backgroundColor: '#fff',
              height: '30px',
            },
          },
        }}
      />
    </FormControl>
  );
};

export default FormPhone;
