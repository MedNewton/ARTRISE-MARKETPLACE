import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from "react-router-dom";
import {Logout} from "../../../services/AuthServices/Logout";
import {useDisconnect} from "wagmi";
import DisplayMenuLinks from "./MenuModalComponents/DisplayMainLinks";
import DisplayExploreLinks from "./MenuModalComponents/DisplayExploreLinks";
import DisplayProfileLinks from "./MenuModalComponents/DisplayProfileLinks";
import JoinChoicesModal from "../../layouts/joinChoicesModal";
import LoginModal from "../../layouts/loginModal";


const MobileVersionMenuModal = ({
                                    showMenuModal, 
                                    handleMenuModalClose, 
                                    handleShowMenuModal,
                                    joinChoicesModalOpen,
                                    setJoinChoicesModalOpen,
                                    loginModalOpen,
                                    setLoginModalOpen
}) => {

    const nav = useNavigate();
    const {disconnect} = useDisconnect();

    const [ showExploreOptions, setShowExploreOptions] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    // const [showWalletMobileVersion,setShowWalletMobileVersion] = useState(false);

    const logoutHandler = async () => {
        try {
            await Logout(disconnect, nav);
        } catch (error) {
        }
    }

    return (
        <>
            <Modal show={showMenuModal} onHide={() => handleMenuModalClose()}>
                {!showExploreOptions && !showProfileOptions && !showLoginModal && !showJoinModal &&
                    <DisplayMenuLinks
                        handleMenuModalClose={handleMenuModalClose}
                        setShowExploreOptions={setShowExploreOptions}
                        showExploreOptions={showExploreOptions}
                        setShowProfileOptions={setShowProfileOptions}
                        showProfileOptions={showProfileOptions}
                        showLoginModal={showLoginModal}
                        setShowLoginModal={setShowLoginModal}
                        showJoinModal={showJoinModal}
                        setShowJoinModal={setShowJoinModal}
                        joinChoicesModalOpen={joinChoicesModalOpen}
                        setJoinChoicesModalOpen={setJoinChoicesModalOpen}
                        loginModalOpen={loginModalOpen}
                        setLoginModalOpen={setLoginModalOpen}
                        // setShowWalletMobileVersion={setShowWalletMobileVersion}
                        // showWalletMobileVersion={showWalletMobileVersion}
                    />
                }

                {showExploreOptions &&
                    <DisplayExploreLinks
                        setShowExploreOptions={setShowExploreOptions}
                        showExploreOptions={showExploreOptions}
                        handleMenuModalClose={handleMenuModalClose}
                    />
                }

                {showProfileOptions &&
                    <DisplayProfileLinks
                        setShowProfileOptions={setShowProfileOptions}
                        showProfileOptions={showProfileOptions}
                        handleMenuModalClose={handleMenuModalClose}
                        logoutHandler={logoutHandler}
                    />

                }



                {/*{showJoinModal &&*/}
                {/*    <JoinChoicesModal*/}
                {/*        show={showJoinModal}*/}
                {/*        onHide={() => setShowJoinModal(false)}*/}
                {/*    />*/}
                {/*}*/}

                {/*{showLoginModal &&*/}
                {/*    <LoginModal*/}
                {/*        show={showLoginModal}*/}
                {/*        onHide={() => setShowLoginModal(false)}*/}
                {/*        // handleMenuModalClose={handleMenuModalClose}*/}
                {/*    />*/}
                {/*}*/}

            </Modal>

        </>
    )
}
export default MobileVersionMenuModal;