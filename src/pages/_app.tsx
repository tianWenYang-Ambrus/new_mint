import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { polygonMumbai, polygon, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet, polygon, polygonMumbai],
  [
    alchemyProvider({
      apiKey: 'dghkBsQd70vM5nj1X2LF2SLmtYLv9qsm',
    }),
    publicProvider(),
  ],
  {
    targetQuorum: 2,
  }
);

const client = createClient(
  getDefaultClient({
    appName: 'ambrus-Mint',
    chains: [polygonMumbai],
    provider: provider,
    autoConnect: true,
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Component {...pageProps} />;
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
