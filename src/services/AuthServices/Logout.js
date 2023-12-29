import {useDisconnect} from "wagmi";
import {useNavigate} from "react-router-dom";
import {setCurrentUser, setCurrentUserId, setLazyOwned} from "../../redux/actions/userActions";

const Logout = async (disconnect, nav, dispatch) => {
    try {
        disconnect();
        dispatch(setCurrentUserId({}));
        dispatch(setCurrentUser({}));
        dispatch(setLazyOwned({}));

        localStorage.clear();
        localStorage.setItem("theme", "light")
        nav("/");

    } catch (error) {
        // Handle errors if necessary
        console.error("Logout failed:", error);
    }
};

export { Logout };