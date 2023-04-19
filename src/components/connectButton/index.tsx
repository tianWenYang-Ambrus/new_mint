import {} from 'react';
import { ConnectKitButton } from 'connectkit';

const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <div
            id="walletBtn"
            onClick={show}
            className="px-6 py-2 font-semibold text-white uppercase rounded-md cursor-pointer bg-primary"
          >
            {isConnected
              ? `${address?.slice(0, 7)}...${address?.slice(address.length - 5, address.length - 1)}`
              : 'Connect Wallet'}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButton;
