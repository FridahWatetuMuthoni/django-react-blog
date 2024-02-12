import { createContext } from "react";
import PropTypes from "prop-types";

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const data = {
    name: "fridah",
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
