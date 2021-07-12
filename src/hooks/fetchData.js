import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "utilities/Config";

export function useFetchData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}${url}`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  }, [url]);

  return { data, loading, error };
}
