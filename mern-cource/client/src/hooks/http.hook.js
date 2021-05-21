import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loaging, setLoaging] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoaging(true);
      try {
        // if send body put to string
        if (body) {
          body = JSON.stringify(body);
          //indicate json format
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        setLoaging(false);

        return data;
      } catch (e) {
        console.log("Cath", e.message);
        setLoaging(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { loaging, request, error, clearError };
};
