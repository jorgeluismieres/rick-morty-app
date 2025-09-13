import { useCallback, useEffect, useState } from 'react';

export function useFetch(initialUrl = null) {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(initialUrl));
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (inputUrl) => {
    const target = inputUrl ?? url;
    if (!target) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(target);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'Error desconocido');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error, setUrl, refetch: fetchData };
}
