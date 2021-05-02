import Layout from "container/Layout";
import { Avatar, Box, Flex, Input, Text } from "@chakra-ui/react";
import { useFetchComment, useProfile } from "hooks/useGlobalHooks";
import React from "react";
import { useHistory } from "react-router-dom";
import PostCard from "components/Cards/PostCard";
import PostSkeleton from "components/Cards/PostSkeleton";
import CommentCard from "components/Cards/CommentCard";
import FormInput from "components/Form/FormInput";
import { Formik } from "formik";
import IconButton from "../components/Button/IconButton";
import { Emoji } from "../theme/Icons";
import { Picker } from "emoji-mart";
import useComponent from "context/componentContext";
import { useMutation, useQueryClient } from "react-query";
import useAPI from "../context/apiContext";

const Feed = () => {
  const { user } = useProfile();
  const { createComment } = useAPI();
  const { location } = useHistory();
  const { showEmoji, setShowEmoji, onClose } = useComponent();
  const feed = location?.state;

  const queryClient = useQueryClient();

  const { comments, isLoading: loading } = useFetchComment(feed?.id);

  const mutateCreateComment = useMutation(
    (values) => createComment(feed?.id, values),
    {
      onSuccess: () => queryClient.invalidateQueries("comments"),
    }
  );

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await mutateCreateComment.mutateAsync(values);
      resetForm({});
      setStatus({ success: true });
      onClose();
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  return (
    <Layout px={6} pageTitle="Comments" path="/" icon>
      <Box mb={14}>
        <PostCard user={feed?.member} feed={feed} />

        <Formik initialValues={{ body: "" }} onSubmit={onSubmit}>
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {showEmoji && (
                <Box
                  as={Picker}
                  set="apple"
                  showPreview={false}
                  style={{
                    position: "absolute",
                    zIndex: 50,
                    top: 380,
                    right: 30,
                  }}
                  onSelect={(emoji) => {
                    setFieldValue("body", values.body + emoji.native);
                    setShowEmoji(false);
                  }}
                  title=""
                />
              )}

              <Flex align="center" mr={2} mb={6}>
                <Avatar
                  size="md"
                  borderWidth={2}
                  borderColor="gray.400"
                  src={user?.profile_picture}
                />

                <Flex
                  align="center"
                  justify="space-between"
                  borderWidth={2}
                  borderColor="gray.400"
                  ml={2}
                  rounded="3xl"
                >
                  <FormInput
                    placeholder="post your comment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.body}
                    name="body"
                    id="body"
                    w={110}
                    rounded="3xl"
                    border="none"
                  />

                  <Box
                    role="button"
                    type="button"
                    aria-label="Emoji Picker"
                    onClick={() => setShowEmoji(!showEmoji)}
                    as={IconButton}
                    emoji={Emoji}
                    size={6}
                    color="gray.400"
                    mr={2}
                  />
                </Flex>
              </Flex>
            </form>
          )}
        </Formik>

        {loading ? (
          <>
            <PostSkeleton />
          </>
        ) : (
          comments?.data?.data?.map((comment) => (
            <CommentCard
              key={comment.id}
              id={comment.id}
              comment={comment}
              user={comment.member}
              pId={feed?.id}
            />
          ))
        )}
      </Box>
    </Layout>
  );
};

export default Feed;
