// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { ThirdwebProvider } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';
// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
// import { Web3Modal } from '@web3modal/react';
// import { configureChains, createClient, WagmiConfig } from 'wagmi';
// import { arbitrum, mainnet, polygon } from 'wagmi/chains';
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './redux/store';
//
// const chains = [arbitrum, mainnet, polygon];
//
// const projectId = '45193581ccfa87dbe7f7b29ff4ee303e';
//
// const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
//
// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, version: 1, chains }),
//   provider,
// });
//
// const ethereumClient = new EthereumClient(wagmiClient, chains);
//
// const root = createRoot(document.getElementById('root'));
//
// const getSigner = async () => {
//   let Signer = null;
//   if (window.ethereum == null) {
//     Signer = ethers.getDefaultProvider().getSigner();
//     return Signer;
//   }
//   Signer = new ethers.providers(window.ethereum).getSigner();
//   return Signer;
// };
//
// root.render(
//   <useStrict>
//     <Provider store={store}>
//       <BrowserRouter>
//         <WagmiConfig client={wagmiClient}>
//           <ThirdwebProvider
//             activeChain="ethereum"
//             signer={getSigner}
//             clientId="df89feb02d2661087b8992b3c1561b89"
//           >
//             <App />
//           </ThirdwebProvider>
//         </WagmiConfig>
//         <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
//       </BrowserRouter>
//     </Provider>
//   </useStrict>,
// );

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const chains = [arbitrum, mainnet, polygon];
const projectId = '45193581ccfa87dbe7f7b29ff4ee303e';

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function RootApp() {
  useEffect(() => {
    const Initialize = async () => {
      try {
        // Try using useWagmi if available
        const { useWagmi } = await import('@thirdweb-dev/react');
        const useWagmiHook = useWagmi && useWagmi();

        if (useWagmiHook) {
          // Use useWagmi hook logic
          await useWagmiHook.setupSigner();
        } else {
          // Default logic if useWagmi is not available
          // Perform any other default logic
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading @thirdweb-dev/react:', error);
        // Handle the error, you might want to fall back to default logic
        // even if useWagmi is not available due to an error
      }
    };

    Initialize();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
          <ThirdwebProvider
            activeChain="ethereum"
            signer={ethers.getDefaultProvider().getSigner}
            clientId="df89feb02d2661087b8992b3c1561b89"
          >
            <App />
          </ThirdwebProvider>
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </BrowserRouter>
    </Provider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<useStrict><RootApp /></useStrict>);
