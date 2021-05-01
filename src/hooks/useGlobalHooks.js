import useAPI from "context/apiContext";
import useAuth from "context/userContext";
import { useInfiniteQuery, useQuery } from "react-query";

export const useProfile = () => {
  const { getProfile } = useAPI();
  const { user: id } = useAuth();

  const { data: user, isLoading: loading } = useQuery(
    ["profile", id],
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
    ["profile", id],
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
    ["following", id],
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
    ["followers", id],
    () => followers(id),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );
  return { userFollowers, loading };
};

export const usePaginatedFeeds = () => {
  const { fetchPaginatedFeeds } = useAPI();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("feed", fetchPaginatedFeeds, {
    getNextPageParam: (lastPage, allPages) => lastPage,
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export const useFeeds = () => {
  const { fetchFeeds } = useAPI();
  const { isLoading, error, data: feeds, isError } = useQuery(
    "feeds",
    fetchFeeds,
    {
      // refetchOnWindowFocus: false,
      // initialStale: true,
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
    "people",
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
    ["comments", id],
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

export const useFetchUserSchools = (id) => {
  const { getUserSchools } = useAPI();
  const { data: schools, isLoading, isError, error } = useQuery(
    ["schools", id],
    () => getUserSchools(id),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );

  return {
    schools,
    isLoading,
    isError,
    error,
  };
};

export const useFetchUserWorks = (id) => {
  const { getUserWorks } = useAPI();
  const { data: works, isLoading, isError, error } = useQuery(
    ["works", id],
    () => getUserWorks(id),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );

  return {
    works,
    isLoading,
    isError,
    error,
  };
};

export const useNotifications = () => {
  const { getNotifications } = useAPI();
  const { data: notifications, isLoading, isError, error } = useQuery(
    "notifications",
    () => getNotifications(),
    {
      refetchOnWindowFocus: false,
      initialStale: true,
    }
  );

  return {
    notifications,
    isLoading,
    isError,
    error,
  };
};
