import React, {useEffect, useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Dropdown from "react-bootstrap/Dropdown";
import DisplayArtworks from "./DisplayArtworks";
import DisplayCollections from "./DisplayCollections";
import {GetArtWorks, GetCollections}
    from '../../../services/DisplayProfileServices/GetUserArtworksCollectionsServices';
import {useContract, useOwnedNFTs} from "@thirdweb-dev/react";
import {useAccount} from "wagmi";
import DisplayLazyOwnedNfts from "./DisplayLazyOwnedNfts";
import LikedItems from "../../../pages/LikedItems";
import Tokenized from "../../../pages/tokenized";
import MyCollections from "../../../pages/myCollections";


const artistViewMenuTabs = [
    {
        class: "active",
        name: "Artworks",
    },
    {
        class: "",
        name: "Collections",
    },
    {
        class: "",
        name: "Drops",
    },
    {
        class: "",
        name: "About",
    },
];
const memberViewMenuTabs = [
    {
        class: "active",
        name: "Owned",
    },
    {
        class: "",
        name: "Tokenized",
    },
    {
        class: "",
        name: "Liked Items",
    },
    {
        class: "",
        name: "Collections",
    },
];

const DisplayArtistTabSection = ({artistData, lazyListed, collections, currentUserKey}) => {

    const [userArtworks, setUserArtworks] = useState([]);
    const [userCollections, setUserCollections] = useState([]);

    const {address, isConnected} = useAccount();

    const {contract} = useContract(
        "0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC",
        "nft-collection"
    );

    useEffect(() => {
        const tempArtworksList = GetArtWorks(artistData.userId, lazyListed);
        setUserArtworks(tempArtworksList);
        const tempCollectionsList = GetCollections(artistData.userId, collections);
        setUserCollections(tempCollectionsList);
    }, [artistData, lazyListed, collections]);
    return (
        <>
            <Tabs>
                <TabList>
                    {artistData.verified
                        ? artistViewMenuTabs.map((item, index) => (
                            <Tab key={index}>
                                {item.name}
                            </Tab>
                        ))
                        : memberViewMenuTabs.map((item, index) => (
                            <Tab key={index}>
                                {item.name}
                            </Tab>
                        ))}

                    <Tab key={4}>
                        <div className="tagLink">
                            <Dropdown>
                                <Dropdown.Toggle id="profileTabDropdown">
                                    <i
                                        className="fa fa-ellipsis-h"
                                        aria-hidden="true"
                                    ></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {artistData.verified &&
                                        <Dropdown.Item href="/">
                                            <p className="tagLinkDropdownItemText">
                                                Owned
                                            </p>
                                        </Dropdown.Item>
                                    }
                                    {artistData.verified &&
                                        <Dropdown.Item href="/">
                                            <p className="tagLinkDropdownItemText">
                                                Liked Items
                                            </p>
                                        </Dropdown.Item>
                                    }
                                    <Dropdown.Item href="/">
                                        <p className="tagLinkDropdownItemText">
                                            Offers Made
                                        </p>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/">
                                        <p className="tagLinkDropdownItemText">
                                            Offers Received
                                        </p>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Tab>
                </TabList>
                {artistData.verified ?
                    <>
                        <TabPanel key={0}>
                            {artistData.userId === currentUserKey ?
                                <DisplayLazyOwnedNfts/> : <DisplayArtworks data={userArtworks}/>
                            }
                        </TabPanel>
                        <TabPanel key={1}>
                            <DisplayCollections data={userCollections}/>
                        </TabPanel>
                        <TabPanel key={2}>
                            <div></div>
                        </TabPanel>
                        <TabPanel key={3}>
                            <h5 className="bioTabText">{artistData?.bio}</h5>
                        </TabPanel>
                    </>
                    :
                    <>
                        <TabPanel key={0}>
                            <DisplayArtworks data={userArtworks}/>
                        </TabPanel>
                        <TabPanel key={1}>
                            <div
                                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                                <div>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                        <img style={{width: '50%'}}
                                             src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                                             alt=""
                                        />
                                    </div>
                                    <div className="row sorry">
                                        <div className="col-12">
                                            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                                Sorry, We Couldn’t Find Any Artworks that you have tokenized.
                                            </h2>
                                            <h5 className="sub-title help-center mg-bt-32 ">
                                                Maybe your wallet is not connected, or you don't have any owned NFTs.
                                                The content of this page will updated as soon as you
                                                purchase one or more <br/> of our unique and amazing
                                                artworks.
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel key={2}>
                            <div
                                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>

                                <div>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                        <img style={{width: '50%'}}
                                             src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                                             alt=""

                                        />
                                    </div>
                                    <div className="row sorry">
                                        <div className="col-12">
                                            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                                Sorry, We Couldn’t Find Any Artworks that you liked.
                                            </h2>
                                            <h5 className="sub-title help-center mg-bt-32 ">
                                                Maybe your wallet is not connected, or you don't have any owned NFTs.
                                                The content of this page will updated as soon as you
                                                purchase one or more <br/> of our unique and amazing
                                                artworks.
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel key={3}>
                            <div
                                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>

                                <div>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                        <img style={{width: '50%'}}
                                             src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                                             alt=""
                                        />
                                    </div>
                                    <div className="row sorry">
                                        <div className="col-12">
                                            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                                Sorry, We Couldn’t Find Any Artworks that you own.
                                            </h2>
                                            <h5 className="sub-title help-center mg-bt-32 ">
                                                Maybe your wallet is not connected, or you don't have any
                                                owned NFTs. The content of this page will updated as soon
                                                as you purchase one or more <br/> of our unique and
                                                amazing artworks.
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </>
                }
            </Tabs>
        </>
    );
}
export default DisplayArtistTabSection;