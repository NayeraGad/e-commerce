import { createContext } from "react";

export const CounterContext = createContext(0);

export default function CounterContextProvider(props) {
  return (
    <CounterContext.Provider value={{ counter: 0 }}>
        {props.children}
    </CounterContext.Provider>
  );
}
