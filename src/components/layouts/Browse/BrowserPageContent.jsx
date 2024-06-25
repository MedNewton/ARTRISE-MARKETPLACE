import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  Tab, TabList, TabPanel, Tabs,
} from '../tab/Tabs';
import DropsRaw from '../dropsRaw';
import DisplayArtworks from '../ProfileDisplay/DisplayArtworks';
import ArtistCard from '../craftsmen/ArtistCard';
import { ArtistsContainer } from '../craftsmen/craftsmenStyles/CraftsMen.styles';
import CollectionCard from '../Collections/CollectionCard';
import CollectionsFilter from '../Collections/CollectionsFilter';
import ArtistFilter from '../craftsmen/ArtistFilter';
import { BrowsePageTabs } from '../../constants/en';

function BrowserPageContent() {
  const collections = useSelector((state) => state.usersReducer.collections);
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);
  const artistsState = useSelector((state) => state.usersReducer.artists);
  const theme = useSelector((state) => state.themeReducer.theme);

  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  return (
    <Tabs>
      <TabList theme={theme} isDeviceMobile={isDeviceMobile}>
        {BrowsePageTabs.map((item) => (
          <Tab index={item.key} theme={theme}>
            {item.name}
          </Tab>
        ))}
      </TabList>

      <TabPanel index={0}>
        {lazyListed && <DisplayArtworks data={lazyListed} />}
      </TabPanel>
      <TabPanel index={1}>
        <>
          <CollectionsFilter />
          <ArtistsContainer isDeviceMobile={isDeviceMobile} isDeviceTablet={isDeviceTablet}>
            {collections?.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                isDeviceMobile={isDeviceMobile}
                isDeviceTablet={isDeviceTablet}
              />
            ))}
          </ArtistsContainer>
        </>
      </TabPanel>
      <TabPanel index={2}>
        <ArtistFilter />
        <ArtistsContainer isDeviceMobile={isDeviceMobile} isDeviceTablet={isDeviceTablet}>
          {artistsState?.map((artist) => (
            <ArtistCard
              key={artist.userId}
              artist={artist}
              isDeviceMobile={isDeviceMobile}
              isDeviceTablet={isDeviceTablet}
            />
          ))}
        </ArtistsContainer>
      </TabPanel>
      <TabPanel index={3}>
        <DropsRaw />
      </TabPanel>
    </Tabs>
  );
}

export default BrowserPageContent;
