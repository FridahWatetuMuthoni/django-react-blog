import { createContext, useState } from "react";
import PropTypes from "prop-types";

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [articles, setArticles] = useState([]);

  const data = {
    articles,
    setArticles,
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
