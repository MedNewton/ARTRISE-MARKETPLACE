import { ref, get } from 'firebase/database';
import db from '../firebase';
import {
  setAllUsers,
  setArtists,
  setMembers,
  setSearchingArray,
} from '../redux/actions/userActions';

export const fetchUsers = async (dispatch) => {
  const userRef = ref(db, 'users/');
  try {
    const snapshot = await get(userRef);
    const dt = snapshot.val();

    const artists = Object.keys(dt)
      .filter((userId) => dt[userId]?.socialMediaVerified && dt[userId]?.profileType === 'artist')
      .map((userId) => ({ userId, ...dt[userId] }));

    const members = Object.keys(dt)
      .filter((userId) => !dt[userId]?.socialMediaVerified)
      .map((userId) => ({ userId, ...dt[userId] }));

    const allUsers = Object.keys(dt)
      .map((userId) => ({ userId, ...dt[userId] }));

    dispatch(setAllUsers({ allUsers }));
    dispatch(setMembers({ members }));
    dispatch(setArtists({ artists }));

    if (allUsers && allUsers.length > 0) {
      const searchingArray = allUsers.map((userItem) => ({
        name: userItem.name,
        id: userItem.userId,
        type: userItem.profileType || 'member',
      }));
      dispatch(setSearchingArray({ searchingArray }));
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
