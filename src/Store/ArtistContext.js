import React, { createContext, useContext } from 'react';

const ArtistContext = createContext();

export const useArtistContext = () => useContext(ArtistContext);
export { ArtistContext };
