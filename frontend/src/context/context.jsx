import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let isMounted = true;

    let fetchArticles = async () => {
      const url = "http://127.0.0.1/api/articles/";
      try {
        const data = axios.get(url);
        console.log(data);
        if (data) {
          setArticles(articles);
        }
      } catch (errors) {
        console.log(errors);
      }
    };

    if (isMounted) {
      fetchArticles();
    }

    return () => (isMounted = false);
  });

  const data = {
    articles,
  };

  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalContextProvider };
