import { useCallback, useEffect, useState } from 'react';

const useFetchJson = (url, { retries = 1, timeoutMs = 10000 } = {}) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setData(undefined);
    setError(false);
    if (!url) return;

    // Ignore responses from a stale url/reload, and abort hung requests so a
    // flaky first request on cold start gets retried instead of silently stalling.
    let cancelled = false;
    let controller;

    const attempt = (remaining) => {
      controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      fetch(url, { signal: controller.signal })
        .then(response => {
          clearTimeout(timer);
          if (!response.ok) throw new Error(`Request failed: ${response.status}`);
          return response.json();
        })
        .then(json => {
          if (!cancelled) setData(json);
        })
        .catch(err => {
          clearTimeout(timer);
          if (cancelled) return;
          if (remaining > 0) return attempt(remaining - 1);
          console.log(err);
          setError(true);
        });
    };

    attempt(retries);
    return () => {
      cancelled = true;
      controller?.abort();
    };
  }, [url, reloadKey, retries, timeoutMs]);

  const reload = useCallback(() => setReloadKey(k => k + 1), []);

  return { data, error, loading: data === undefined && !error, reload };
};

export default useFetchJson;
