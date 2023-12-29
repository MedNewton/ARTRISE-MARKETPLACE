import React, {useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ConnectWallet, useAddress, useContract, useListings} from "@thirdweb-dev/react";
import {useAccount, useDisconnect} from "wagmi";
import {useArtworkContext} from '../../../Store/ArtworkContext';
import {useCollectionsContext} from "../../../Store/CollectionsContext";
import {useUserContext} from "../../../Store/UserContext";
import useLocalStorageUserKeyChange from "../../../hooks/useLocalStorageUserKeyChange";
import {useMediaQuery} from "react-responsive";

const HeaderSearch = () => {
    const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})
    const {lazyListed, userArtist} = useArtworkContext();
    const {collections} = useCollectionsContext();
    const {user} = useUserContext();
    const navigate = useNavigate();

    const {contract} = useContract(
        "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
        "marketplace"
    );
    const {address, isConnected} = useAccount();
    const [userSearchList, setUserSearchList] = useState([]);
    const [searchingArray, setSearchingArray] = useState([]);
    const [artWorks, setArtWorks] = useState([]);
    const [processedLazyListed, setProcessedLazyListed] = useState([]);
    const [processedUserArtist, setProcessedUserArtist] = useState([]);
    const [collectionList, setCollectionList] = useState([]);
    const {data: listings, isLoading, error} = useListings(contract);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentUserUserKey, setCurrentUserUserKey] = useState(localStorage.getItem("userId"));
    useLocalStorageUserKeyChange('UserKey', (newValue) => {
        if (newValue) {
            setCurrentUserUserKey(newValue);
        }
    });

    const getArtworkForSearch = () => {
        if (listings) {
            let data = listings.map((artworkItem) => {
                return {"name": artworkItem.asset.name, "id": artworkItem.id, "type": "Artwork", "isDynamic": false};
            });
            setArtWorks(data);
        }
    };

    const getLazyListedForSearch = () => {
        if (lazyListed) {
            let data = lazyListed.map((artworkItem) => {
                return {
                    "name": artworkItem?.data?.name,
                    "id": artworkItem?.artworkId,
                    "type": "Artwork",
                    "isDynamic": true
                };
            });
            setProcessedLazyListed(data);
        }
    };

    const getUserForSearch = () => {
        if (user) {
            let data = user.map((userItem) => {
                return {"name": userItem.name, "id": userItem.userId, "type": "Member", "isDynamic": false};
            });
            setUserSearchList(data);
        }
    };

    const getUserArtistForSearch = () => {
        if (userArtist) {
            let data = userArtist.map((user) => {
                return {"name": user.name, "id": user.userId, "type": "Artist", "isDynamic": true};
            });
            setProcessedUserArtist(data);
        }
    };

    const getCollectionsForSearch = () => {
        if (collections) {
            let data = collections.map((collection) => {
                return {"name": collection.name, "id": collection.id, "type": "Collection", "isDynamic": true};
            });
            setCollectionList(data);
        }
    };

    const getSearchElements = () => {
        const newArray = [...artWorks, ...processedUserArtist, ...processedLazyListed, ...collectionList, ...userSearchList];
        const uniqueArray = Array.from(new Set(newArray));
        setSearchingArray(uniqueArray);
    };

    useEffect(() => {
        getArtworkForSearch();
        getUserForSearch();
        getLazyListedForSearch();
        getUserArtistForSearch();
        getCollectionsForSearch();

    }, [listings, lazyListed, userArtist, collections, user]);

    useEffect(() => {
        getSearchElements();
    }, [artWorks, processedUserArtist, processedLazyListed, collectionList, userSearchList]);

    const handleSearch = (event) => {
        const searchValue = event?.target?.value?.toLowerCase();
        setSearchQuery(searchValue);
        if (searchValue) {
            const searchWords = searchValue?.split(' ');
            const filteredResults = searchingArray?.filter((item) =>
                searchWords?.every((word) =>
                    item?.name?.toLowerCase()?.includes(word)
                )
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    const handleItemClick = (item) => {
        if (item?.type === 'Artwork') {
            if (item?.isDynamic) {
                navigate(`/artwork-dettails?id=${item?.id}`)
            } else {
                navigate(`/item-details-01?listing=${item?.id}`)
            }
        } else if (item?.type === 'Artist') {
            if (item?.isDynamic) {
                if (item?.id === currentUserUserKey) {
                    navigate(`/displayProfile?artist=${currentUserUserKey}`);
                } else {
                    navigate(`/displayProfile?artist=${item?.id}`)
                }
            } else {
                navigate(`/authors-02?artist=${item?.id}`)
            }
        } else if (item?.type === 'Collection') {
            if (item?.isDynamic) {
                navigate(`/collection?id=${item?.id}`)
            } else {
                navigate(`/`)
            }
        } else if (item?.type === 'Member') {
            if (item.id === currentUserUserKey) {
                navigate(`/displayProfile?member=${currentUserUserKey}`);
            } else {
                navigate(`/displayProfile?member=${item?.id}`)
            }
        }
        // You can add more cases for other types if needed
        setSearchQuery(''); // Clear the search query after clicking on an item
        setSearchResults([]); // Clear the search results after clicking on an item
    };

    useEffect(() => {
        if (address) {
            // localStorage.setItem("accountTypeChoice", "artist");
            // localStorage.setItem("UserKey", address);
            setCurrentUserUserKey(address);
        }
    }, [address]);

    return (
        <>
            {isDeviceMobile &&
                <div className="question-form-mobile-version">
                    <div >
                        <input
                            // type="text"
                            className="question-form-mobile-version-input"
                            placeholder="Type to search...mv"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {searchResults.length > 0 && (
                            <div className="search-dropdown-mobile-version">
                                {searchResults.map((result) => (
                                    <div
                                        key={result.id}
                                        className="search-item"
                                        onClick={() => handleItemClick(result)}
                                    >
                                        <p>{result.name}</p>
                                        <p className="search-item-detail">{result.type}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            }
            {!isDeviceMobile &&
                <div className="question-form">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {searchResults.length > 0 && (
                            <div className="search-dropdown">
                                {searchResults.map((result) => (
                                    <div
                                        key={result.id}
                                        className="search-item"
                                        onClick={() => handleItemClick(result)}
                                    >
                                        <p>{result.name}</p>
                                        <p className="search-item-detail">{result.type}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );

};

export default HeaderSearch;
