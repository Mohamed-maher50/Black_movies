import React, { createContext, useState } from "react";
const LoadingAnimate = createContext(false);
function ContextProvider(props) {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("us");
  return (
    <LoadingAnimate.Provider
      value={{ loading, setLoading, language, setLanguage }}
    >
      {props.children}
    </LoadingAnimate.Provider>
  );
}

export default LoadingAnimate;
export { ContextProvider };
