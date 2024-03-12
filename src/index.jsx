import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
// eslint-disable-next-line import/no-unresolved
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { arbitrum, mainnet } from 'viem/chains';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '45193581ccfa87dbe7f7b29ff4ee303e';
const clientId = 'df89feb02d2661087b8992b3c1561b89';

// 2. Create wagmiConfig
const metadata = {
  name: 'ArtRise',
  description: 'ArtRise Marketplace',
  url: 'https://marketplace.artrise.io/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
});

const root = createRoot(document.getElementById('root'));

root.render(
  <WagmiConfig config={wagmiConfig}>
    <ThirdwebProvider activeChain="ethereum" clientId={clientId}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThirdwebProvider>
  </WagmiConfig>,
);
