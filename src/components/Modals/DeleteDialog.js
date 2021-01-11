import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react';
import useComponent from 'context/componentContext';
import { useMutation, useQueryClient } from 'react-query';
import useAPI from 'context/apiContext';

const DeleteDialog = ({ isOpen, onClose }) => {
  const { modal, selectedId } = useComponent();
  const cancelRef = React.useRef();

  const { deleteSchoolExperiences, deleteWorkExperiences } = useAPI();
  const queryClient = useQueryClient();

  console.log('selectedId', selectedId);

  const mutateDeleteSchools = useMutation(deleteSchoolExperiences, {
    onSuccess: () => queryClient.invalidateQueries('schools'),
  });

  const mutateDeleteWorks = useMutation(deleteWorkExperiences, {
    onSuccess: () => queryClient.invalidateQueries('works'),
  });

  const deleteDialog = () => {
    if (modal === 'school') {
      return mutateDeleteSchools.mutateAsync(selectedId);
    } else {
      return mutateDeleteWorks.mutateAsync(selectedId);
    }
  };

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete your {modal}? You cannot undo this
          change.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme='red'
            ml={3}
            onClick={() => {
              deleteDialog();
              onClose();
            }}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
