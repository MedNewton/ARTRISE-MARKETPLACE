import React from 'react';
import {Button} from "react-bootstrap";

const RenderJoinLoginButtonMobileVersion = ({

                                                handleMenuModalClose,
                                                setShowLoginModal,
                                                setShowJoinModal,
                                                joinChoicesModalOpen,
                                                setJoinChoicesModalOpen,
                                                loginModalOpen,
                                                setLoginModalOpen,


                                            }) => {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <Button
                    className='mobile-version-login-join-button'
                    onClick={(e) => {
                        e.preventDefault();
                        // setShowJoinModal(true);
                        // handleMenuModalClose();
                        setJoinChoicesModalOpen(true);
                        handleMenuModalClose(false);

                    }}
                >Join
                </Button>
                <Button
                    className='mobile-version-login-join-button'
                    onClick={(e) => {
                        e.preventDefault();
                        // setShowLoginModal(true);
                        // handleMenuModalClose();
                        setLoginModalOpen(true);
                        handleMenuModalClose(false);


                    }}
                >Login
                </Button>

            </div>

        </div>
    )
}
export default RenderJoinLoginButtonMobileVersion;