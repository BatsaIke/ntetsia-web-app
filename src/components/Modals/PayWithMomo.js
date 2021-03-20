import React from 'react';
import { Modal, ModalBody, SIZE, ROLE } from 'baseui/modal';
import { Box, Heading } from '@chakra-ui/react';
import { Formik } from 'formik';
import { Select } from 'baseui/select';

const PayWithMomo = ({ isOpen, onClose }) => {
  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: {
            padding: '20px',
          },
        },
      }}
    >
      <ModalBody>
        <Box textAlign='center' mb={{ md: 6 }}>
          <Heading as='h5' fontSize={{ md: 'md' }}>
            Enter your payment details
          </Heading>
        </Box>
        <Formik initialValues={{ network: '' }}>
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form>
              <Select
                options={[
                  { label: 'MTN', id: 'mtn' },
                  { label: 'Vodafone', id: 'vodafone' },
                  { label: 'Airtel Tigo', id: 'airteltigo' },
                ]}
                value={values.network}
                placeholder='Select a network'
                onChange={(params) => setFieldValue('network', params.value)}
                overrides={{
                  Dropdown: {
                    style: {
                      position: 'relative',
                      zIndex: 9999999,
                    },
                  },
                }}
              />
            </form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default PayWithMomo;
