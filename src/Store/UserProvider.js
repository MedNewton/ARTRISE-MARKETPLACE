import React, {useState, useEffect} from 'react';
import {get, ref} from "firebase/database";
import db from "../firebase";

import {UserContext} from './UserContext';

export const UserProvider = ({children}) => {
    const [user, setUser] = useState([]);

    async function fetchUser() {
        const userRef = ref(db, 'users/');
        await get(userRef).then(async (snapshot) => {
            let dt = snapshot.val();
            for (let userKey in dt) {
                let a = dt[userKey];
                console.log("useruseruseruseruser a",a)
                    let userItem = {
                        "name": a.name,
                        "type": a.accountType,
                        "pdpLink": a.pdpLink,
                        "slug": a.slug
                    }
                    setUser(current => [...current, userItem]);
            }
        })
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    );
};
