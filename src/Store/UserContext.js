import React, { createContext, useContext } from 'react';
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);
export { UserContext };
