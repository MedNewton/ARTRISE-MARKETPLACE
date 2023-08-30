import React, { createContext, useContext} from 'react';

const CollectionsContext = createContext();

export const useCollectionsContext = () => useContext(CollectionsContext);
export { CollectionsContext };
