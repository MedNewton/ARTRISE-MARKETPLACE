import React, {useState, useEffect} from 'react';
import {get, ref} from "firebase/database";
import db from "../firebase";

import {UserContext} from './UserContext';

export const UserProvider = ({children}) => {
    const [user, setUser] = useState([]);
    const [allMemberArtists, setAllMemberArtists] = useState([])

    function mapVerifiedValue(verifiedValue) {
        if (verifiedValue) {
            if (verifiedValue === "yes" || verifiedValue === "true") {
                return true;
            }
        }
        return false;
    };

    async function fetchUser() {
        const userRef = ref(db, 'users/');
        await get(userRef).then(async (snapshot) => {
            let dt = snapshot.val();
            for (let UserKey in dt) {
                let a = dt[UserKey];
                if(a.verified === "no" || a.verified === false || a.verified === ""){
                    let userItem = {
                        userId: UserKey,
                        name: a?.name,
                        bio: a?.bio,
                        pdpLink: a?.pdpLink,
                        cover_link: a?.cover_link,
                        Facebook: a?.Facebook,
                        Instagram: a?.Instagram,
                        Twitter:a?.Twitter,
                        website: a?.website,
                        artistType:a?.artistType,
                        followedArtists: a?.followedArtists,
                        followedCollections: a?.followedCollections,
                        followers:a?.followers,
                        following:a?.following,
                        slug: a?.slug,
                        verified: false,
                        artworks: undefined
                    }
                    setUser(current => [...current, userItem]);
                }

                let memberArtist = {
                    userId: UserKey,
                    name: a?.name,
                    bio: a?.bio,
                    pdpLink: a?.pdpLink,
                    cover_link: a?.cover_link,
                    Facebook: a?.Facebook,
                    Instagram: a?.Instagram,
                    Twitter:a?.Twitter,
                    website: a?.website,
                    artistType:a?.artistType,
                    followedArtists: a?.followedArtists,
                    followedCollections: a?.followedCollections,
                    followers:a?.followers,
                    following:a?.following,
                    slug: a?.slug,
                    verified: mapVerifiedValue(a?.verified),
                    artworks: undefined
                }
                setAllMemberArtists(prevState => [...prevState, memberArtist]);
            }
        })
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, allMemberArtists}}>
            {children}
        </UserContext.Provider>
    );
};

// import React, {useState, useEffect} from 'react';
// import {get, ref} from "firebase/database";
// import db from "../firebase";
//
// import {UserContext} from './UserContext';
//
// export const UserProvider = ({children}) => {
//     const [member, setMember] = useState([]);
//     const [artist, setArtist] = useState([]);
//
//     async function fetchUser() {
//         const userRef = ref(db, 'users/');
//         await get(userRef).then(async (snapshot) => {
//             let dt = snapshot.val();
//             for (let UserKey in dt) {
//                 let a = dt[UserKey];
//                 if(a.accountType === "member"){
//                     let memberItem = {
//                         userId: UserKey,
//                         name: a?.name,
//                         bio: a?.bio,
//                         pdpLink: a?.pdpLink,
//                         cover_link: a?.cover_link,
//                         Facebook: a?.Facebook,
//                         Instagram: a?.Instagram,
//                         Twitter:a?.Twitter,
//                         website: a?.website,
//                         artistType:a?.artistType,
//                         followedCollections: a?.followedCollections,
//                         followers:a?.followers,
//                         following:a?.following,
//                         slug: a?.slug,
//                         verified: a?.verified,
//                         publicProfile: a?.publicProfile,
//                     }
//                     setMember(current => [...current, memberItem]);
//                 }else if (a.accountType === "artist"){
//
//                     let artistItem = {
//                         userId: UserKey,
//                         name: a?.name,
//                         bio: a?.bio,
//                         pdpLink: a?.pdpLink,
//                         cover_link: a?.cover_link,
//                         Facebook: a?.Facebook,
//                         Instagram: a?.Instagram,
//                         Twitter:a?.Twitter,
//                         website: a?.website,
//                         artistType:a?.artistType,
//                         followedCollections: a?.followedCollections,
//                         followers:a?.followers,
//                         following:a?.following,
//                         slug: a?.slug,
//                         verified: a?.verified,
//                         publicProfile: a?.publicProfile,
//                     }
//                     setArtist(current => [...current, artistItem]);
//                 }
//             }
//         })
//     }
//
//     useEffect(() => {
//         fetchUser();
//     }, []);
//
//     return (
//         <UserContext.Provider value={{member, artist}}>
//             {children}
//         </UserContext.Provider>
//     );
// };