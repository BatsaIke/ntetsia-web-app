import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { PaymentCard, valid } from 'baseui/payment-card';
import { MaskedInput, Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';

function getFormOverrides(width, marginRight) {
  return {
    ControlContainer: {
      style: {
        width,
        marginRight,
      },
    },
  };
}

const PayWithCard = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={{ md: 10 }}>
          <Box textAlign='center' mb={{ md: 6 }}>
            <Heading as='h5' fontSize={{ md: 'md' }}>
              Enter your payment details
            </Heading>
          </Box>
          <Formik
            initialValues={{ name: '', number: '', expiration: '', code: '' }}
          >
            {({ values, handleChange, handleSubmit, isSubmitting }) => {
              const { card } = valid.number(values.number);
              let codeLength;
              if (card && card.code && card.code.size) {
                codeLength = card.code.size;
              }

              return (
                <form onSubmit={handleSubmit}>
                  <Input
                    value={values.name}
                    name='name'
                    onChange={handleChange}
                    placeholder='Name on the card'
                    clearOnEscape
                  />

                  <Box pt={5}>
                    <FormControl overrides={getFormOverrides('100%')}>
                      <PaymentCard
                        value={values.number}
                        onChange={handleChange}
                        name='number'
                        placeholder='Card number'
                      />
                    </FormControl>
                  </Box>

                  <Flex align='center'>
                    <FormControl
                      overrides={getFormOverrides('70%', '10px')}
                      caption='Expiration date'
                    >
                      <MaskedInput
                        error={Boolean(
                          values.expiration &&
                            values.expiration.length &&
                            !valid.expirationDate(values.expiration)
                              .isPotentiallyValid
                        )}
                        value={values.expiration}
                        name='expiration'
                        onChange={handleChange}
                        placeholder='MM/YY'
                        mask='99/99'
                      />
                    </FormControl>

                    <FormControl
                      overrides={getFormOverrides('30%')}
                      caption='CVC'
                    >
                      <MaskedInput
                        error={Boolean(
                          values.code &&
                            values.code.trim().length &&
                            !valid.cvv(values.code, codeLength)
                              .isPotentiallyValid
                        )}
                        value={values.code}
                        name='code'
                        onChange={handleChange}
                        placeholder='CVC'
                        mask={codeLength ? '9'.repeat(codeLength) : '999'}
                      />
                    </FormControl>
                  </Flex>

                  <Box>
                    <Button
                      type='submit'
                      isLoading={isSubmitting}
                      overrides={{
                        BaseButton: {
                          style: {
                            width: '100%',
                          },
                        },
                      }}
                    >
                      Pay
                    </Button>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PayWithCard;
