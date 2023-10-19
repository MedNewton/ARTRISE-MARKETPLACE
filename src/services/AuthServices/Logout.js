import {useDisconnect} from "wagmi";
import {useNavigate} from "react-router-dom";

const Logout = async (disconnect, nav) => {
    try {
        disconnect();
        localStorage.removeItem("walletType");
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("accountTypeChoice");
        localStorage.removeItem("verified");
        localStorage.removeItem("firebase:host:artrise-ffe4c-default-rtdb.firebaseio.com");
        localStorage.removeItem("wagmi.cache");
        localStorage.removeItem("wagmi.store");
        localStorage.removeItem("W3M_VERSION");
        localStorage.removeItem("W3M_VERSION");
        localStorage.removeItem("__TW__/metamask/injected.shimDisconnect");
        localStorage.removeItem("__TW__/coordinatorStorage/lastConnectedWallet");
        localStorage.removeItem("wagmi.wallet");
        localStorage.removeItem("wagmi.connected");
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("slug");
        localStorage.removeItem("UserKey");
        localStorage.removeItem("name");
        localStorage.removeItem("pdpLink");
        localStorage.removeItem("followingYann");
        localStorage.removeItem("twitter");
        localStorage.removeItem("google");
        localStorage.removeItem("facebook");
        localStorage.removeItem("creator");
        nav("/");
        await window.location.reload(true);
        localStorage.clear();
    } catch (error) {
        // Handle errors if necessary
        console.error("Logout failed:", error);
    }
};

export { Logout };