import useAPI from 'context/apiContext';
import useAuth from 'context/userContext';
import { useQuery } from 'react-query';

export const useProfile = () => {
  const { getProfile } = useAPI();
  const { user: id } = useAuth();

  const { data: user, isLoading: loading } = useQuery(
    ['profile', id],
    () => getProfile(id),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );
  return { user, loading };
};

export const useOthersProfile = (id) => {
  const { getProfile } = useAPI();
  const { data: user, isLoading: loading } = useQuery(
    ['profile', id],
    () => getProfile(id),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );
  return { user, loading };
};

export const useFollowing = (id) => {
  const { following } = useAPI();
  const { data: userFollowing, isLoading: loading } = useQuery(
    ['profile', id],
    () => following(id),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );
  return { userFollowing, loading };
};

export const useFollowers = (id) => {
  const { followers } = useAPI();
  const { data: userFollowers, isLoading: loading } = useQuery(
    ['profile', id],
    () => followers(id),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );
  return { userFollowers, loading };
};

export const useFeeds = () => {
  const { fetchFeeds } = useAPI();
  const { isLoading, error, data: feeds, isError } = useQuery(
    'feeds',
    () => fetchFeeds(),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );

  return {
    feeds,
    isLoading,
    error,
    isError,
  };
};

export const usePeople = () => {
  const { getPeople } = useAPI();
  const { isLoading, error, data: people, isError } = useQuery(
    'people',
    () => getPeople(),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );

  return {
    people,
    isLoading,
    error,
    isError,
  };
};

export const useFetchComment = (id) => {
  const { getComment } = useAPI();
  const { data: comments, isLoading, isError, error } = useQuery(
    ['comments', id],
    () => getComment(id),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );

  return {
    comments,
    isLoading,
    isError,
    error,
  };
};
