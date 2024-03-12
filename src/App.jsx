import React, { useEffect, useMemo } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserId } from './redux/actions/userActions';

import { fetchUsers } from './utils/allUsersUtils';
import { fetchCurrentUser } from './utils/currentUserUtils';
import { fetchLazyOwned } from './utils/lazyOwnedUtils';
import { fetchLazyListed } from './utils/lazyListedUtils';
import { getCollections } from './utils/collectionUtils';

import routes from './pages';
import HeaderStyle2 from './components/header/HeaderStyle2';

function App() {
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUserId({ currentUserId }));
    if (currentUserId) {
      fetchUsers(dispatch);
      fetchCurrentUser(dispatch, currentUserId);
      fetchLazyOwned(dispatch, currentUserId);
    }
  }, [currentUserId, dispatch]);

  useEffect(() => {
    async function changeTitle() {
      document.title = 'Artrise - Physical NFTs Marketplace';
    }

    changeTitle();
    fetchUsers(dispatch);
    fetchLazyListed(dispatch);
    getCollections(dispatch);
  }, [dispatch]);

  const memoizedRoutes = useMemo(() => (
    routes.map((data) => (
      <Route
        onUpdate={() => window.scrollTo(0, 0)}
        exact
        path={data.path}
        element={data.component}
        key={data.id}
      />
    ))
  ), []); // Empty dependency array ensures that useMemo runs only once

  return (
    <>
      <HeaderStyle2 />
      <Routes>
        {memoizedRoutes}
      </Routes>
    </>
  );
}

export default App;
