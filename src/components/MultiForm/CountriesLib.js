import { useState } from "react";
//import {  MenuItem } from "@material-ui/core";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button
} from '@chakra-ui/react'

import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

export default function CountriesLib({props,label,
  name,
  variant,
  error,
  touch,
  setFieldTouched,
  ref,
  isRequired,
  ...rest}) {
  
  const [selectedCountry, setSelectedCountry] = useState("");

  const selectCountryHandler = (event) => {setSelectedCountry(event.target.value);props.setCountry(event)}

  // Have to register the languages you want to use
  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key
    };
  });

  return (
    <div>
      <FormControl id={name} isRequired={isRequired} isInvalid={error && touch}>
      <Select
        placeholder="Select a country"
        defaultValue="Select a Country"
        style={{ height: "50px" ,borderColor:"#000"}}
        value={selectedCountry}
        onChange={(e) => selectCountryHandler(e)}
        variant="outlined"
        fullWidth
        rounded="lg"
        name="country"
        variant="outline"
        _hover={{ borderColor: "none" }}
        _focus={{ borderColor: "none" }}
        {...rest}
      >
        
        <hr/>
        {!!countryArr?.length &&
          countryArr.map(({ label, value }) => (
            <option selected  value={label}> {label}</option> 
           
  //             <Menu>

  // <MenuButton as={Button} >
  // <MenuItem key={value} value={value}>
  // {label}
  // </MenuItem>
  // </MenuButton>
  // </Menu>
  //             //{label}
           
          ))}
      </Select>
      <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>
    </FormControl>
    </div>
  );
}
