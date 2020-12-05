import { Box, Grid, Heading } from '@chakra-ui/react';
import Button from 'components/Button';
import FormInput from 'components/Form/FormInput';
import Select from 'components/Form/Select';
import useAPI from 'context/apiContext';
import useComponent from 'context/componentContext';
import useAuth from 'context/userContext';
import { Formik } from 'formik';
import React from 'react';
import { SignupSchema } from 'utils/validation';

const RegisterForm = () => {
  const { signup } = useAuth();
  const { countriesList } = useAPI();
  const [countries, setCountries] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const { handleStepClick } = useComponent();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await countriesList();
      setCountries(res.data);
    };
    fetchData();
  }, []);

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await signup(values);
      resetForm({});
      setStatus({ success: true });
      handleStepClick(+1);
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  return (
    <Box>
      <Heading as='h4' size='md' mb={4} textAlign='center'>
        Enter Personal Details
      </Heading>
      <Formik
        initialValues={{
          referer: '',
          first_name: '',
          last_name: '',
          email: '',
          dob: '',
          phone: '',
          country: '',
          password: '',
          password_confirmation: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          setFieldError,
          setFieldValue,
          setFieldTouched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid templateColumns='repeat(2, 1fr)' gap={4} mb={8}>
              <FormInput
                label='Referrer'
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.referer}
                error={errors.referer}
                touch={touched.referer}
                name='referer'
                placeholder='Who refered you?'
              />

              <FormInput
                label='First Name'
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                error={errors.first_name}
                touch={touched.first_name}
                name='first_name'
                placeholder='John'
              />

              <FormInput
                label='Last Name'
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                error={errors.last_name}
                touch={touched.last_name}
                name='last_name'
                placeholder='Doe'
              />

              <FormInput
                label='Email'
                placeholder='Email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touch={touched.email}
                value={values.email}
                variant='filled'
              />

              <FormInput
                label='Date of Birth'
                type='date'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
                error={errors.dob}
                touch={touched.dob}
                name='dob'
                placeholder='2020-10-08'
              />

              <Select
                label='Select a country'
                placeholder='Select an option'
                fieldName='country'
                setFieldValue={setFieldValue}
                items={countries}
                selected={selected}
                setSelected={setSelected}
                error={errors.country}
                touch={touched.country}
                setFieldTouched={setFieldTouched}
                setFieldError={setFieldError}
              />

              <FormInput
                label='Password'
                type='password'
                placeholder='Password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touch={touched.password}
                value={values.password}
                variant='filled'
              />

              <FormInput
                label='Confirm Password'
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password_confirmation}
                error={errors.password_confirmation}
                touch={touched.password_confirmation}
                name='password_confirmation'
                placeholder='*************'
              />
            </Grid>

            <Button
              type='submit'
              isLoading={isSubmitting}
              loadingText='Signing you up'
              title='Sign up'
              w='100%'
              h={12}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
