import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import Button from 'components/Button';
import useComponent from 'context/componentContext';
import { useFetchUserSchools, useProfile } from 'hooks/useGlobalHooks';
import React from 'react';
import { BiPencil } from 'react-icons/bi';

const School = () => {
  const { user } = useProfile();
  const { handleModalClick } = useComponent();
  const { schools, isLoading } = useFetchUserSchools(user?.id);

  console.log('schools', schools);

  return (
    <Box>
      <Flex justify='space-between'>
        <Box>
          <Heading as='h4' size='xl'>
            Work Experience
          </Heading>
          <Text fontSize='sm' color='gray.600'>
            Update or add new work info.
          </Text>
        </Box>

        <Box>
          <Button
            title='Add new education'
            onClick={() => handleModalClick('school', null, null, null, 'init')}
          />
        </Box>
      </Flex>

      <Divider
        orientation='vertical'
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        my={10}
      />

      <Box>
        <Box>
          {isLoading ? (
            <Grid gap={4}>
              <Skeleton height='100px' />
              <Skeleton height='100px' />
              <Skeleton height='100px' />
            </Grid>
          ) : (
            schools?.map((school) => (
              <Flex
                justify='space-between'
                align='flex-start'
                mb={6}
                borderBottomWidth={1}
                borderBottomColor='gray.200'
                pb={6}
              >
                <Flex>
                  <Avatar src='https://media-exp1.licdn.com/dms/image/C4E0BAQG4VuKlFTe4oA/company-logo_100_100/0/1596756704518?e=1617840000&v=beta&t=FfxsMq48LjLlaHdqi-7MBxrqqq_8IfaQpCPh93kFbhg' />
                  <Box ml={4}>
                    <Text>{school?.school_name}</Text>
                    <Text fontSize='sm' color='gray.600' mt={-1}>
                      Full-time
                    </Text>
                    <Text fontSize='sm' mt={-1} color='gray.700'>
                      {school?.year_admitted} - {school?.year_completed} -{' '}
                      <Text as='span'></Text>9 mon
                    </Text>
                    <Flex>
                      <Text fontSize='sm' color='gray.700' mr={2}>
                        Computer Science
                      </Text>
                      -
                      <Text fontSize='sm' color='gray.700' ml={2}>
                        Bachelor's Degree
                      </Text>
                    </Flex>
                    <Text>
                      I implement visual elements that users see and interact
                      with a web application.
                    </Text>
                  </Box>
                </Flex>
                <Box
                  as='button'
                  role='button'
                  w={8}
                  h={8}
                  color='gray.500'
                  _hover={{
                    rounded: '100%',
                    bg: 'gray.200',
                    transitionDuration: '200ms',
                    color: 'gray.600',
                  }}
                  onClick={() =>
                    handleModalClick('school', school, school.id, null, 'edit')
                  }
                >
                  <Icon as={BiPencil} boxSize={6} />
                </Box>
              </Flex>
            ))
          )}
        </Box>
      </Box>

      {/* <Formik
        enableReinitialize
        initialValues={{ schools }}
        // onSubmit={}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormFieldArray
              fieldName='schools'
              fieldObj={{
                school_name: '',
                year_admitted: '',
                year_completed: '',
              }}
              values={values.schools}
              label='School'
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              title='Schools'
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </Formik> */}
    </Box>
  );
};

export default School;
