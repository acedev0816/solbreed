import { Button, Dropdown, Menu } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React, { useCallback , useEffect} from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '../../contexts';

export interface ConnectButtonProps
  extends ButtonProps,
    React.RefAttributes<HTMLElement> {
  allowWalletChange?: boolean;
}

export const ConnectButton = (props: ConnectButtonProps) => {
  const { onClick, children, disabled, allowWalletChange, ...rest } = props;

  const { wallet, connect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const open = useCallback(() => setVisible(true), [setVisible]);

  const handleClick = useCallback(() => {
    console.log('connect button click');

    wallet ? connect().catch(() => {}) : open();
  }, [wallet, connect, open]);

  useEffect(() => {
    console.log('wallet', props);
  })
  // only show if wallet selected or user connected

  if (!wallet || !allowWalletChange) {
    return (
      <Button {...rest} onClick={handleClick} disabled={connected && disabled}>
        {connected ? props.children : 'Connect'}
      </Button>
    );
  }

  return (
    <Dropdown.Button
      onClick={handleClick}
      disabled={connected && disabled}
      overlay={
        <Menu>
          <Menu.Item onClick={open}>Change Wallet</Menu.Item>
        </Menu>
      }
    >
      Connect
    </Dropdown.Button>
  );
};
