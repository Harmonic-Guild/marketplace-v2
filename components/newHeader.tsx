import { useWallet } from '@mintbase-js/react';

function Header(): JSX.Element {
  const {
    isConnected, connect, disconnect, activeAccountId,
  } = useWallet();

  const buttonLabel = isConnected
    ? `Sign Out ${activeAccountId}`
    : ' Connect NEAR Wallet';

  const buttonAction = isConnected ? disconnect : connect;

  return (
    <nav className="flex justify-between w-full bg-white sticky top-0 z-40 lg:border-b border-solid border-gray-150">
      <div className="flex justify-between items-center">
        <h1 className="font-light p-2 sm:p-4 border-gray-100">Market</h1>
      </div>
      {/** login/logout with wallet */}
      <div className="flex items-center sm:mr-2">
        <button onClick={buttonAction}>{buttonLabel} </button>
      </div>
    </nav>
  );
}

export default Header;