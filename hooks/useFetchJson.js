import { useEffect, useState } from 'react';

const useFetchJson = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    setData(undefined);
    setError(false);
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then(setData)
      .catch(err => {
        console.log(err);
        setError(true);
      });
  }, [url]);

  return { data, error, loading: data === undefined && !error };
};

export default useFetchJson;
