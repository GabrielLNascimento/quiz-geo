import { useState, useEffect } from "react";

const useFetchQuestions = (url) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar perguntas");
        setLoading(false);
      });
  }, [url]);

  return { questions, loading, error };
};

export default useFetchQuestions;
