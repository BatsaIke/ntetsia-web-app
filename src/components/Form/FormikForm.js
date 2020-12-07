import { Box, Flex, Icon, Input, Text, Image } from '@chakra-ui/react';
import Button from 'components/Button';
import IconButton from 'components/Button/IconButton';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { Formik } from 'formik';
import React from 'react';
import { Emoji, Image as IconImage } from 'theme/Icons';
import FormTextArea from './FormTextArea';

const FormikForm = ({
  onSubmit,
  initialData,
  showEmoji,
  setShowEmoji,
  title,
  parentId,
}) => {
  const [file, setFile] = React.useState(null);

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    setFile(image);
    // const formData = new FormData();
    // formData.append('image', file, file?.name);
  };

  return (
    <Formik
      initialValues={{ body: initialData, parent_id: parentId }}
      // validationSchema={PostSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        isSubmitting,
        isValid,
        errors,
        touched,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          {showEmoji && (
            <Box
              as={Picker}
              set='apple'
              showPreview={false}
              style={{ position: 'absolute', zIndex: 50, top: 350 }}
              onSelect={(emoji) => {
                setFieldValue('body', values.body + emoji.native);
                setShowEmoji(false);
              }}
              title=''
            />
          )}

          <Box my={2}>
            <FormTextArea
              borderWidth='0px'
              placeholder="What's on your mind?"
              value={values.body}
              onChange={handleChange}
              name='body'
              px={1}
              resize='none'
              h={{ md: 48 }}
              autoFocus={true}
              // touch={touched.body}
              // error={errors.body}
            />
            <Image
              src={file ? URL.createObjectURL(file) : null}
              alt={file ? file.name : null}
            />
          </Box>

          <Flex align='center' justify='space-between' py={1} px={3}>
            <Flex align='center'>
              <Flex
                as='label'
                align='center'
                rounded='30px'
                bg='blue.300'
                _focus={{ outline: 'none' }}
                py={2}
                px={4}
                cursor='pointer'
              >
                <Input type='file' d='none' onChange={handleImageChange} />
                <Icon as={IconImage} boxSize={6} mr={1} />
                <Text>Photos</Text>
              </Flex>

              <Flex
                align='center'
                bg='red.300'
                color='white'
                rounded='30px'
                py={2}
                px={4}
                as='button'
                role='button'
                type='button'
                aria-label='Emoji Picker'
                onClick={() => setShowEmoji(!showEmoji)}
                ml={2}
              >
                <Box as={IconButton} pos='absolute' emoji={Emoji} size={6} />
                <Text ml={6}>Emoji</Text>
              </Flex>
            </Flex>

            <Box>
              <Button
                title={title}
                rounded='30px'
                isLoading={isSubmitting}
                type='submit'
                // isDisabled={
                //   !isValid ||
                //   (Object.keys(touched).length === 0 &&
                //     touched.constructor === Object)
                // }
              />
            </Box>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default FormikForm;
