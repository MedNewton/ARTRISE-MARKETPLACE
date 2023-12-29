import React from "react";

export const FollowButtonTextProvider = (artistData, currentUser, currentUserId) => {
    let followedText = "Follow";
    if (artistData?.userId === currentUserId) {
        followedText = "Edit";
    } else if ((artistData?.userId !== currentUserId) && currentUser) {
        if (currentUser?.following && currentUser?.following?.includes(artistData?.userId)) {
            followedText = "Unfollow";
        } else {
            followedText = "Follow";
        }
    } else {
        followedText = "Login";
    }
    return (
        followedText
    )
};

export const FollowersArrayProvider = (followersArray, allUsersState) => {
    let updatedList = [];
    if (followersArray) {
        for (let val of followersArray) {
            const found = allUsersState?.find((user) => user?.userId === val);
            if (found && (updatedList?.findIndex((obj) => obj?.userId === found?.userId) === -1)) {
                updatedList?.push(found);
            }
        }
    }
    return updatedList;

};


export const ArrayProvider = (followersArray, allUsers) => {
    let updatedList = [];
    if (followersArray && allUsers) {
        for (let val of followersArray) {
            const found = allUsers?.find((user) => user?.userId === val);
            if (found && (updatedList?.findIndex((obj) => obj?.userId === found?.userId) === -1)) {
                updatedList?.push(found);
            }
        }
        return updatedList;
    }
    return [];
};

export const ArrayIdsProvider = (followersArray, allUsers) => {
    let updatedList = [];
    if (followersArray && allUsers) {
        for (let val of followersArray) {
            const found = allUsers?.find((user) => user?.userId === val);
            if (found && (updatedList?.findIndex((obj) => obj === found?.userId) === -1)) {
                updatedList?.push(found?.userId);
            }
        }
        return updatedList;
    }
    return [];
};

