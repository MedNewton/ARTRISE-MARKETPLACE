import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from "react-router-dom";
import {Logout} from "../../../services/AuthServices/Logout";
import {useDisconnect} from "wagmi";
import DisplayMenuLinks from "./MenuModalComponents/DisplayMenuLinks";
import DisplayExploreLinks from "./MenuModalComponents/DisplayExploreLinks";
import DisplayProfileLinks from "./MenuModalComponents/DisplayProfileLinks";
import RenderNavBarOverMenu from "../NavBarOverTheMenu/RenderNavBarOverMenu";

const MobileVersionMenuModal = ({
                                    showMenuModal,
                                    handleMenuModalClose,
                                    handleShowMenuModal,
                                    joinChoicesModalOpen,
                                    setJoinChoicesModalOpen,
                                    loginModalOpen,
                                    setLoginModalOpen,
                                    setShowSearchField,
                                    showSearchField
                                }) => {

    const nav = useNavigate();
    const {disconnect} = useDisconnect();

    const [showExploreOptions, setShowExploreOptions] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    const logoutHandler = async () => {
        try {
            await Logout(disconnect, nav);
        } catch (error) {
        }
    }

    return (
        <>
            <Modal
                show={showMenuModal}
                onHide={() => handleMenuModalClose()}
                dialogClassName="full-screen-modal"
            >
                <RenderNavBarOverMenu
                    setShowSearchField={setShowSearchField}
                    showSearchField={showSearchField}
                    handleMenuModalClose={handleMenuModalClose}
                />
                {!showExploreOptions &&
                    !showProfileOptions &&
                    !showLoginModal &&
                    !showJoinModal &&
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
            </Modal>
        </>
    )
}
export default MobileVersionMenuModal;