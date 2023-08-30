import React from 'react';
import {createRoot} from "react-dom/client";
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";

import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum'
import {Web3Modal} from '@web3modal/react'
import {configureChains, createClient, WagmiConfig} from 'wagmi'
import {arbitrum, mainnet, polygon} from 'wagmi/chains'
import {Gnosis, Ethereum} from "@thirdweb-dev/chains";

import {ArtworkProvider} from './Store/ArtworkProvider';
import {ArtistProvider} from './Store/ArtistProvider';
import {ProfileProvider} from './Store/ProfileProvider';
import {CollectionsProvider} from './Store/CollectionsProvider';
import {UserProvider} from './Store/UserProvider';


const chains = [arbitrum, mainnet, polygon];

const projectId = "45193581ccfa87dbe7f7b29ff4ee303e";

const {provider} = configureChains(chains, [w3mProvider({projectId})])
// Wagmi client

const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({projectId, version: 1, chains}),
    provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

const root = createRoot(document.getElementById('root'));
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

root.render(
    <BrowserRouter>
        <ArtworkProvider>
            <ArtistProvider>
                <ProfileProvider>
                    <CollectionsProvider>
                        <UserProvider>
                            <WagmiConfig client={wagmiClient}>
                                <ThirdwebProvider
                                    activeChain={"ethereum"}
                                    clientId="df89feb02d2661087b8992b3c1561b89"
                                >
                                    <App/>
                                </ThirdwebProvider>
                            </WagmiConfig>
                            <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
                        </UserProvider>
                    </CollectionsProvider>
                </ProfileProvider>
            </ArtistProvider>
        </ArtworkProvider>
    </BrowserRouter>
);
