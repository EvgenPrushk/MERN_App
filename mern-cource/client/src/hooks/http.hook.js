import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        // if send body put to string
        if (body) {
          console.log(body);
          body = JSON.stringify(body);
          //indicate json format
          console.log(headers);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, {method, body, headers})
        console.log(response);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        setLoading(false);

        return data;
      } catch (e) {
        console.log("Cath", e.message);
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
