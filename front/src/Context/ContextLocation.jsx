import { createContext, useContext, useState } from 'react';

const LocalContext = createContext();


export function useLocalContext() {
  return useContext(LocalContext);
}

export function LocalProvider({ children }) {
  const [locals, setLocals] = useState([]);

  return (
    <LocalContext.Provider value={{ locals, setLocals }}>
      {children}
    </LocalContext.Provider>
  );
}
