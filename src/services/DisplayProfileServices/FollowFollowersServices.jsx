import React from "react";

export const FollowButtonTextProvider = (artistData, currentUserData, currentUserKey) => {
    let followedText = "Follow";
    if (artistData.userId === currentUserKey) {
        followedText = "Edit";
    } else if ((artistData.userId !== currentUserKey) && currentUserData) {
        if (currentUserData?.following?.includes(artistData?.userId)) {
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

export const FollowersArrayProvider = (followersArray, allMemberArtists) => {
    let updatedList = [];
    if (followersArray) {
        for (let val of followersArray) {
            const found = allMemberArtists.find((user) => user.userId === val);
            if (found && (updatedList.findIndex((obj) => obj.userId === found.userId) === -1)) {
                updatedList.push(found);
            }
        }
    }
    return updatedList;

};

