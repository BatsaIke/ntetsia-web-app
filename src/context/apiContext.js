import { useToast } from '@chakra-ui/react';
import Axios from 'axios';
import React from 'react';
import api from 'utils/auth/api';

const ApiContext = React.createContext({});

export const ApiProvider = ({ children }) => {
  const toast = useToast();

  const countriesList = async () => {
    return await Axios.get('https://restcountries.eu/rest/v2/all');
  };

  const postFeed = async (payload) => {
    try {
      await api.post('/posts', payload);
    } catch (error) {
      toast({
        title: 'Error occured.',
        description: error.response.data.errors.body[0],
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const getProfile = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/profile`);
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const patchUserProfile = async (payload) => {
    try {
      const { data } = await api.patch('/members/profile/update', payload);
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUserSchools = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/schools`);
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUserWorks = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/work-experiences`);
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getPeople = async () => {
    try {
      const { data } = await api.get(`/members/people`);
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const profilePicture = async (payload) => {
    try {
      const res = await api.post('/members/upload/profile-image', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const backgroundImage = async (payload) => {
    try {
      const res = await api.post('/members/upload/background-image', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const postImageUpload = async (payload) => {
    try {
      const res = await api.post('/docs/upload', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const follow = async (payload) => {
    try {
      const res = await api.post('/members/follow', payload);
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const unfollow = async (payload) => {
    try {
      const res = await api.post('/members/unfollow', payload);
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const following = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/following`);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const followers = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/followers`);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchFeeds = async () => {
    try {
      const { data } = await api.get('/feeds');
      return data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchPaginatedFeeds = async ({ page = 1 }) => {
    try {
      const { data } = await api.get(`/feeds?page=${page}`);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const postLike = async (id) => {
    try {
      const res = await api.post('/posts/like', id);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const postUnlike = async (id) => {
    try {
      const res = await api.post('/posts/unlike', id);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const updatePost = async (id, payload) => {
    try {
      await api.patch(`/posts/${id}`, payload);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await api.delete(`posts/${id}`);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const getReplies = async (id) => {
    try {
      const { data } = await api.get(`/comments/${id}/replies`);
      return data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const commentReply = async (id, payload) => {
    try {
      const { data } = await api.post(`/comments/${id}/reply`, payload);
      return data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const getComment = async (id) => {
    try {
      const res = await api.get(`/posts/${id}/comments`);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const createComment = async (id, payload) => {
    try {
      await api.post(`/posts/${id}/comments`, payload);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await api.delete(`comments/${id}`);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateComment = async (id, payload) => {
    try {
      await api.patch(`/comments/${id}`, payload);
    } catch (error) {
      console.log(error.response);
    }
  };

  //Schools
  const createSchool = async (payload) => {
    try {
      const res = await api.post('/schools', payload);
      if (res.status === 201) {
        toast({
          description: res.data.message,
          status: 'success',
          duration: 3000,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateSchoolExperiences = async (id, payload) => {
    try {
      const res = await api.patch(`/schools/${id}`, payload);
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: 'success',
          duration: 3000,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteSchoolExperiences = async (id) => {
    try {
      const res = await api.delete(`/schools/${id}`);
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: 'success',
          duration: 3000,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //Work Experiences
  const createWorkExperiences = async (payload) => {
    try {
      const res = await api.post('/work-experiences', payload);
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: 'success',
          duration: 3000,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateWorkExperiences = async (id, payload) => {
    try {
      const res = await api.patch(`/work-experiences/${id}`, payload);
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: 'success',
          duration: 3000,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteWorkExperiences = async (id) => {
    try {
      const res = await api.delete(`/work-experiences/${id}`);
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: 'success',
          duration: 3000,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //Notifications
  const getNotifications = async () => {
    try {
      const { data } = await api.get('/notifications');
      return data;
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        countriesList,
        getProfile,
        getUserSchools,
        getUserWorks,
        getPeople,
        patchUserProfile,
        profilePicture,
        backgroundImage,
        postImageUpload,
        follow,
        unfollow,
        following,
        followers,
        postFeed,
        fetchFeeds,
        fetchPaginatedFeeds,
        postLike,
        postUnlike,
        updatePost,
        deletePost,
        getReplies,
        commentReply,
        getComment,
        createComment,
        deleteComment,
        updateComment,
        createSchool,
        updateSchoolExperiences,
        deleteSchoolExperiences,
        createWorkExperiences,
        updateWorkExperiences,
        deleteWorkExperiences,
        getNotifications,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default function useAPI() {
  const context = React.useContext(ApiContext);

  return context;
}
