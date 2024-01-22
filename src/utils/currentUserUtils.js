import { ref, get } from 'firebase/database';
import db from '../firebase';
import {
  setCurrentUser,
} from '../redux/actions/userActions';

export const fetchCurrentUser = async (dispatch, currentUserId) => {
  if (currentUserId) {
    const ThisUserRef = ref(db, `users/${currentUserId}`);
    await get(ThisUserRef)
      .then(async (snapshot) => {
        const currentUser = snapshot.val();
        dispatch(setCurrentUser({ currentUser }));
      });
  }
};
