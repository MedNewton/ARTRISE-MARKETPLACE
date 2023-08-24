import React, { createContext, useContext } from 'react';
const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext);
export { ProfileContext };
