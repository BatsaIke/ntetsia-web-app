import React from "react";
import api from "utils/auth/api";
import axios from "axios";

const UseFeeds = () => {
  const [feedsData, setFeedsData] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    let cancel;
    const fetchData = async () => {
      try {
        const res = await api.get(`/feeds?page=${page}`, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setFeedsData((prevState) => [...prevState, ...res.data.data]);
      } catch (error) {
        if (axios.isCancel(error)) {
          return null;
        }
      }
    };
    fetchData();
    return () => cancel();
  }, [page]);

  return { feedsData, page, setPage };
};

export default UseFeeds;
