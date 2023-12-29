import {get, ref, set} from "firebase/database";
import db from "../../firebase";
import Swal from "sweetalert2";
import {setCurrentUserId} from "../../redux/actions/userActions";

async function passwordlessLogin(snapshot, dispatch) {
    let currentUserId = snapshot.key;
    dispatch(setCurrentUserId({currentUserId}));
    localStorage.setItem("profileType", snapshot?.val()?.profileType)
    localStorage.setItem("userId", snapshot?.key);
    localStorage.setItem("name", snapshot?.val()?.name);
    localStorage.setItem("pdpLink", snapshot?.val()?.pdpLink);
    localStorage.setItem("walletAddress", snapshot?.val()?.walletAddress);
}

const CheckUserExists = async (adr, referee, disconnect, dispatch) => {
    const connectWithWalletOperation = localStorage.getItem("connectWithWalletOperation");
    const ThisUserRef = ref(db, "users/" + adr);
        const snapshot = await get(ThisUserRef);
        let dt = snapshot.val();
        if (dt === null &&  connectWithWalletOperation === "join") {
            await disconnect();
            await set(ref(db, "users/" + adr), {
                name: "UNNAMED",
                email: "No Email added yet ...",
                walletAddress: adr? adr: "",
                bio: "No Bio added yet ...",
                pdpLink:
                    "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=",
                cover_link:
                    "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                Facebook: "No Facebook added yet ...",
                Instagram: "No Instagram added yet ...",
                Twitter: "No Twitter added yet ...",
                website: "No Website added yet ...",
                profileType: "member",
                artistType: "member",
                followedCollections: [],
                followers: [],
                following: [],
                slug:  (
                    Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
                ).toString(),
                referralCode: (Math.random() + 1).toString(36).substring(2),
                referralBy: referee,
                socialMediaVerified: false,
                artRiseAdminVerified: false,
                artworks: [],
                artworkThumbNails: ["cardItem1","cardItem1","cardItem1","cardItem1"]
            });
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
            await Swal.fire({
                icon: "success",
                title: "Account created successfully !",
                text: "Your account has been created successfully! Log in to access your profile.",
            });
            await disconnect();
        }
        else if (dt === null &&  connectWithWalletOperation === "login") {
            await Swal.fire({
                icon: "warning",
                title: "Account does not exists !",
                text: "This wallet address is not connected to any account on ARTRISE. Try Join .",
            });
        }
        else if (dt !== null &&  connectWithWalletOperation === "join") {
            await Swal.fire({
                icon: "warning",
                title: "Account already exists !",
                text: "This wallet address is already connected to any account on ARTRISE. Try Login .",
            });
            await disconnect();
        }
        else if (dt !== null &&  connectWithWalletOperation === "login") {
            await passwordlessLogin(snapshot, dispatch);
        }
};

export {CheckUserExists};