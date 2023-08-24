import React, { createContext, useContext, useState, useEffect } from 'react';

const ArtworkContext = createContext();

export const useArtworkContext = () => useContext(ArtworkContext);
export { ArtworkContext };
