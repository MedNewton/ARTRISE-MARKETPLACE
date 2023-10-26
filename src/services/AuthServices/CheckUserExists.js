import {get, ref, set} from "firebase/database";
import db from "../../firebase";

async function passwordlessLogin(snapshot) {
    let key = snapshot.key;
    localStorage.setItem("slug", snapshot.val().slug)
    localStorage.setItem("accountTypeChoice", snapshot.val().accountType)
    localStorage.setItem("UserKey", snapshot.key);
    localStorage.setItem("name", snapshot.val().displayName);
    localStorage.setItem("pdpLink", snapshot.val().pdpLink);
    localStorage.setItem("followingYann", snapshot.val().followingYann);
}

const CheckUserExists = async (adr, referee) => {
    const ThisUserRef = ref(db, "users/" + adr);
    try {
        const snapshot = await get(ThisUserRef);
        let dt = snapshot.val();
        if (dt == null) {
            await set(ref(db, "users/" + adr), {
                name: "UNNAMED",
                displayName: "UNNAMED",
                referralCode: (Math.random() + 1).toString(36).substring(2),
                referrefBy: referee,
                accountType: "user",
                creator: false,
                email: "No email yet ...",
                bio: "No Bio added yet ...",
                verified: false,
                slug: (
                    Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
                ).toString(),
                pdpLink:
                    "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=",
                cover_link:
                    "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                website: "No url shared yet ...",
                Facebook: "No account shared yet ...",
                Instagram: "No account shared yet",
                Twitter: "No account shared yet ...",
                Discord: "No account shared yet ...",
                Tiktok: "No account shared yet ...",
                Youtube: "No account shared yet ...",
                emailNotifications: false,
                followedArtists: {
                    0: "res",
                },
                followedCollections: {
                    0: "res",
                },
                likedListings: {
                    0: "res",
                },
                following: {
                    0: "res",
                },
                followers: {
                    0: "res",
                },
                followingYann: false,
                notifications: {
                    text: "Welcome to Artise",
                    link: "",
                    img: "",
                    seen: false,
                },
            });
            console.log(window.ire);
            let trackConversion = window.ire(
                "trackConversion",
                37268,
                {
                    orderId: Math.floor(Math.random() * 10000000),
                    customerId: adr,
                },
                {
                    verifySiteDefinitionMatch: true,
                }
            );
            console.log(trackConversion)
            await passwordlessLogin(snapshot);
        } else {
            await passwordlessLogin(snapshot);
        }
    } catch(error){
        console.log("Error in CheckUserExists:", error);
        throw error; // Rethrow the error for higher-level handling if needed
    }

};

export {CheckUserExists};