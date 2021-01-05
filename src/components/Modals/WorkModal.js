import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import WorkForm from 'components/Form/WorkForm';
import useComponent from 'context/componentContext';
import { useMutation, useQueryClient } from 'react-query';
import useAPI from 'context/apiContext';

const WorkModal = ({ isOpen, onClose }) => {
  const { selectedData, selectedId, mode } = useComponent();
  const {
    createWorkExperiences,
    updateWorkExperiences,
    deleteWorkExperiences,
  } = useAPI();

  const queryClient = useQueryClient();

  const mutateCreateWorks = useMutation(
    (values) => createWorkExperiences(values),
    {
      onSuccess: () => queryClient.invalidateQueries('works'),
    }
  );

  const mutateUpdateWorks = useMutation(
    (values) => updateWorkExperiences(selectedId, values),
    {
      onSuccess: () => queryClient.invalidateQueries('works'),
    }
  );

  const mutateDeleteWorks = useMutation(deleteWorkExperiences, {
    onSuccess: () => queryClient.invalidateQueries('works'),
  });

  const initialValues = {
    company_name: '',
    position: '',
    from: '',
    to: '',
  };

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      if (mode === 'init') {
        await mutateCreateWorks.mutateAsync(values);
      } else if (mode === 'edit') {
        await mutateUpdateWorks.mutateAsync(values);
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
        return <WorkForm initialValues={initialValues} onSubmit={onSubmit} />;
      case 'edit':
        return (
          <WorkForm
            initialValues={selectedData}
            onSubmit={onSubmit}
            onDelete={mutateDeleteWorks}
            id={selectedId}
            onClose={onClose}
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
        <ModalHeader>Add new Work Experience</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{getData(mode)}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WorkModal;
