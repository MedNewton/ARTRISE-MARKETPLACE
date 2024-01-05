import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

function HeaderSearch() {
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const searchingArray = useSelector((state) => state.usersReducer.searchingArray);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const searchValue = event?.target?.value?.toLowerCase();
    setSearchQuery(searchValue);
    if (searchValue) {
      const searchWords = searchValue?.split(' ');
      const filteredResults = searchingArray?.filter(
        (item) => searchWords?.every(
          (word) => item?.name?.toLowerCase()?.includes(word),
        ),
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleItemClick = (item) => {
    if (item?.type === 'artwork') {
      navigate(`/artwork-details?id=${item?.id}`);
    } else if (item?.type === 'artist') {
      if (item?.isDynamic) {
        navigate(`/displayProfile?artist=${item?.id}`);
      } else {
        navigate(`/displayProfile?member=${item?.id}`);
      }
    } else if (item?.type === 'collection') {
      navigate(`/collection?id=${item?.id}`);
    } else if (item?.type === 'member') {
      navigate(`/displayProfile?member=${item?.id}`);
    } else {
      navigate('/');
    }
    // You can add more cases for other types if needed
    setSearchQuery(''); // Clear the search query after clicking on an item
    setSearchResults([]); // Clear the search results after clicking on an item
  };

  return (
    <>
      {isDeviceMobile
                && (
                <div className="question-form-mobile-version">
                  <div>
                    <input
                      className="question-form-mobile-version-input"
                      placeholder="Type to search...mv"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    {searchResults?.length > 0 && (
                    <div className="search-dropdown-mobile-version">
                      {searchResults.map((result) => (
                        <button
                          type="button"
                          key={result.id}
                          className="search-item"
                          onClick={() => handleItemClick(result)}
                        >
                          <p>{result.name}</p>
                          <p className="search-item-detail">{result.type}</p>
                        </button>
                      ))}
                    </div>
                    )}
                  </div>
                </div>
                )}
      {!isDeviceMobile
                && (
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
                        <button
                          type="button"
                          key={result.id}
                          className="search-item"
                          onClick={() => handleItemClick(result)}
                        >
                          <p>{result.name}</p>
                          <p className="search-item-detail">{result.type}</p>
                        </button>
                      ))}
                    </div>
                    )}
                  </div>
                </div>
                )}
    </>
  );
}

export default HeaderSearch;
