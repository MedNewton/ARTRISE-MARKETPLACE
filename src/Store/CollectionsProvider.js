import React, {useState, useEffect} from 'react';
import {get, ref} from "firebase/database";
import db from "../firebase";
import {CollectionsContext} from './CollectionsContext';



export const CollectionsProvider = ({children}) => {
    const [collections, setCollections] = useState([]);

    async function getCollections() {
        const collectionRef = ref(db, "collections/");
        await get(collectionRef).then(async (snapshot) => {
            let collections = snapshot.val();
            for (let i in collections) {
                let dt = collections[i];
                let ownerID = dt.owner;
                let ownerName = "";
                let ownerImage = "";
                const ownerRef = ref(db, "users/" + ownerID);
                await get(ownerRef).then((snap) => {
                    let ownerDt = snap.val();
                    ownerName = ownerDt.displayName;
                    ownerImage = ownerDt.pdpLink;
                });
                let collection = {
                    image: dt.image,
                    cover: dt.cover,
                    name: dt.name,
                    description: dt.description,
                    owner: dt.owner,
                    createdAt: dt.createdAt,
                    owner_name: ownerName,
                    owner_image: ownerImage,
                    id: i,
                    artworks: dt?.artworks
                };
                setCollections((prevState) => [...prevState, collection]);
            }
        });
    }

    useEffect(() => {
        getCollections();
    }, []);

    return (
        <CollectionsContext.Provider value={{collections}}>
            {children}
        </CollectionsContext.Provider>
    );
};
