import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Avatar,
  Flex,
  Heading,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useProfile } from 'hooks/useGlobalHooks';
import { useMutation, useQueryClient } from 'react-query';
import useAPI from 'context/apiContext';
import useComponent from 'context/componentContext';
import FormikForm from 'components/Form/FormikForm';

const PostModal = ({ isOpen, onClose, showEmoji, setShowEmoji }) => {
  const { user } = useProfile();
  const {
    postFeed,
    updatePost,
    createComment,
    updateComment,
    commentReply,
  } = useAPI();
  const { selectedData, selectedId, mode, state } = useComponent();

  const queryClient = useQueryClient();

  const mutateCreatePost = useMutation(postFeed, {
    onSuccess: () => queryClient.invalidateQueries('feeds'),
  });

  const mutateUpdatePost = useMutation(
    (values) => updatePost(selectedId, values),
    {
      onSuccess: () => queryClient.invalidateQueries('feeds'),
    }
  );

  const mutateCreateComment = useMutation(
    (values) => createComment(selectedId, values),
    {
      onSuccess: () => queryClient.invalidateQueries('comments'),
    }
  );

  const mutateCreateReply = useMutation(
    (values) => commentReply(selectedId, values),
    {
      onSuccess: () => queryClient.invalidateQueries('reply'),
    }
  );

  const mutateUpdateComment = useMutation(
    (values) => updateComment(selectedId, values),
    {
      onSuccess: () => queryClient.invalidateQueries('comments'),
    }
  );

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      if (mode === 'edit') {
        await mutateUpdatePost.mutateAsync(values);
      } else if (mode === 'post') {
        await mutateCreatePost.mutateAsync(values);
      } else if (mode === 'comment') {
        await mutateCreateComment.mutateAsync(values);
      } else if (mode === 'editComment') {
        await mutateUpdateComment.mutateAsync(values);
      } else if (mode === 'reply') {
        await mutateCreateReply.mutateAsync(values);
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

  const getPostData = (value) => {
    switch (value) {
      case 'post':
        return (
          <FormikForm
            initialData=''
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            title='Post'
            onSubmit={onSubmit}
          />
        );
      case 'edit':
        return (
          <FormikForm
            initialData={selectedData}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            title='Update post'
            onSubmit={onSubmit}
          />
        );
      case 'comment':
        return (
          <FormikForm
            initialData=''
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            title='Post comment'
            onSubmit={onSubmit}
          />
        );
      case 'editComment':
        return (
          <FormikForm
            initialData={selectedData}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            title='Update Comment'
            onSubmit={onSubmit}
          />
        );
      case 'reply':
        return (
          <FormikForm
            initialData=''
            parentId={state}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            title='Reply to comment'
            onSubmit={onSubmit}
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
        <ModalCloseButton />
        <ModalBody my={10}>
          <Flex align='center' justify='space-between'>
            <Flex>
              <Avatar
                size='sm'
                src={user?.profile_picture}
                name={user?.first_name}
              />
            </Flex>

            <Heading as='h4' size='md'>
              {mode === 'post'
                ? 'Create a post'
                : mode === 'edit'
                ? 'Edit a post'
                : mode === 'comment'
                ? 'Post a comment'
                : mode === 'editComment'
                ? 'Edit comment'
                : mode === 'reply'
                ? 'Reply comment'
                : null}
            </Heading>
          </Flex>

          {getPostData(mode)}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
