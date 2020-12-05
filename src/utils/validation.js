import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  // referer: Yup.string().required('Referer is required!'),
  first_name: Yup.string().required('First name is required!'),
  last_name: Yup.string().required('Last name is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  dob: Yup.string().required('Date of birth is Required!'),
  country: Yup.string().required('Country is Required!'),
  phone: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, {
      message: 'Invalid phone number, exclude country code!',
    })
    .required('Phone number is required!'),
  password: Yup.string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        ' Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    })
    .required('Password is Required!'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
    .required('Password confirm is required!'),
});

export const SignupTrustForSchema = Yup.object().shape({
  referer: Yup.string().required('Referer is required!'),
  guarantor_id: Yup.string().required('Quarantor code is required!'),
  first_name: Yup.string().required('First name is required!'),
  last_name: Yup.string().required('Last name is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  dob: Yup.string().required('Date of birth is Required!'),
  country: Yup.string().required('Country is Required!'),
  phone: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, {
      message: 'Invalid phone number, exclude country code!',
    })
    .required('Phone number is required!'),
  password: Yup.string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        ' Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    })
    .required('Password is Required!'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
    .required('Password confirm is required!'),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string().required('Password is required!'),
});

export const PostSchema = Yup.object().shape({
  body: Yup.string().required('Body is required!'),
});
