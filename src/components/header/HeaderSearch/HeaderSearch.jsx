import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useContract} from "@thirdweb-dev/react";
import {useMediaQuery} from "react-responsive";
import {useSelector} from "react-redux";

const HeaderSearch = () => {
    const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})
    const searchingArray = useSelector((state) => state.usersReducer.searchingArray);

    const navigate = useNavigate();

    const {contract} = useContract(
        "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
        "marketplace"
    );

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
        if (item?.type === 'artwork') {
            navigate(`/artwork-details?id=${item?.id}`)

        } else if (item?.type === 'artist') {
            if (item?.isDynamic) {
                navigate(`/displayProfile?artist=${item?.id}`)

            } else {
                navigate(`/displayProfile?member=${item?.id}`)
            }
        } else if (item?.type === 'collection') {
            navigate(`/collection?id=${item?.id}`)

        } else if (item?.type === 'member') {
            navigate(`/displayProfile?member=${item?.id}`)
        }else{
            navigate(`/`)
        }
        // You can add more cases for other types if needed
        setSearchQuery(''); // Clear the search query after clicking on an item
        setSearchResults([]); // Clear the search results after clicking on an item
    };

    console.log("ss 5 searchingArray:",searchingArray)

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
                        {searchResults?.length > 0 && (
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
                        {searchResults?.length > 0 && (
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
