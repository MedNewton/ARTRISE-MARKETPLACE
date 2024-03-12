export const FollowButtonTextProvider = (artistData, currentUser, currentUserId) => {
  let followedText = 'Follow';
  if (artistData?.userId === currentUserId) {
    followedText = 'Edit';
  } else if ((artistData?.userId !== currentUserId) && currentUser) {
    if (currentUser?.following && currentUser?.following?.includes(artistData?.userId)) {
      followedText = 'Unfollow';
    } else {
      followedText = 'Follow';
    }
  } else {
    followedText = 'Login';
  }
  return (
    followedText
  );
};

export const FollowersArrayProvider = (followersArray, allUsersState) => {
  const updatedList = [];
  if (followersArray) {
    followersArray.forEach((val) => {
      const found = allUsersState?.find((user) => user?.userId === val);
      if (found && (updatedList?.findIndex((obj) => obj?.userId === found?.userId) === -1)) {
        updatedList?.push(found);
      }
    });
  }
  return updatedList;
};

export const ArrayProvider = (followersArray, allUsers) => {
  const updatedList = [];
  if (followersArray && allUsers) {
    followersArray.forEach((val) => {
      const found = allUsers?.find((user) => user?.userId === val);
      if (found && (updatedList.findIndex((obj) => obj?.userId === found?.userId) === -1)) {
        updatedList.push(found);
      }
    });
    return updatedList;
  }
  return [];
};

export const ArrayIdsProvider = (followersArray, allUsers) => {
  const updatedList = [];
  if (followersArray && allUsers) {
    followersArray.forEach((val) => {
      const found = allUsers?.find((user) => user?.userId === val);
      if (found && (updatedList.findIndex((obj) => obj === found?.userId) === -1)) {
        updatedList.push(found?.userId);
      }
    });
    return updatedList;
  }
  return [];
};
