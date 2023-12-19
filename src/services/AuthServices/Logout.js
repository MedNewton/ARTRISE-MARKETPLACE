import { setCurrentUser, setCurrentUserId, setLazyOwned } from '../../redux/actions/userActions';

const Logout = async (disconnect, nav, dispatch) => {
  try {
    disconnect();
    dispatch(setCurrentUserId({}));
    dispatch(setCurrentUser({}));
    dispatch(setLazyOwned({}));

    localStorage.clear();
    localStorage.setItem('theme', 'light');
    nav('/');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Logout failed:', error);
  }
};

export { Logout };
