import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [BaseURL, setBaseURL] = useState(localStorage.getItem("baseURL"));

  useEffect(() => {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
      BaseURL
        ? localStorage.setItem("baseURL", BaseURL)
        : localStorage.removeItem("baseURL");
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, BaseURL, setBaseURL }}>
      {props.children}
    </UserContext.Provider>
  );
}
