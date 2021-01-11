import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import useComponent from 'context/componentContext';
import { useMutation, useQueryClient } from 'react-query';
import useAPI from 'context/apiContext';
import SchoolForm from 'components/Form/SchoolForm';

const SchoolModal = ({ isOpen, onClose }) => {
  const { selectedData, selectedId, mode, toggleDialog } = useComponent();
  const { createSchool, updateSchoolExperiences } = useAPI();

  const queryClient = useQueryClient();

  const mutateCreateSchools = useMutation((values) => createSchool(values), {
    onSuccess: () => queryClient.invalidateQueries('schools'),
  });

  const mutateUpdateSchools = useMutation(
    (values) => updateSchoolExperiences(selectedId, values),
    {
      onSuccess: () => queryClient.invalidateQueries('schools'),
    }
  );

  const initialValues = {
    school_name: '',
    year_admitted: '',
    year_completed: '',
  };

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      if (mode === 'init') {
        await mutateCreateSchools.mutateAsync(values);
      } else if (mode === 'edit') {
        await mutateUpdateSchools.mutateAsync(values);
      }
      resetForm({});
      setStatus({ success: true });
      onClose();
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  const getData = (values) => {
    switch (values) {
      case 'init':
        return <SchoolForm initialValues={initialValues} onSubmit={onSubmit} />;
      case 'edit':
        return (
          <SchoolForm
            initialValues={selectedData}
            onSubmit={onSubmit}
            onClose={onClose}
            toggleDialog={toggleDialog}
            mode={mode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new or update School</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{getData(mode)}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SchoolModal;
