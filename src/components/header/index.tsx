import { useState } from 'react';
import { socialLinks } from '@/data/mint';
import styles from './header.module.scss';
import { ReactSVG } from 'react-svg';
import ConnectButton from '@components/connectButton';
import Image from 'next/image';
import { css } from 'glamor';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Header = () => {
  const ambrusIcon = css({
    ' svg': {
      height: 36,
      width: 36,
    },
  });

  const handleChange = (v: any) => {
    console.log(v);
  };

  return (
    <div className={`${styles.header} lg:p-8 items-center`}>
      <div className="grid items-center justify-start w-2/3 grid-flow-col gap-x-10">
        <a href="https://testing.ambrus.studio/" target="_blank" rel="noopener noreferrer">
          <ReactSVG src="svgs/ambrus.svg" />
        </a>
        <a
          className={styles['tab-item']}
          href="https://testing.ambrus.studio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          HOME
        </a>
        {/* <a
          className={styles['tab-item']}
          href="https://testing.ambrus.studio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          HOME
        </a> */}
        {/* <Select onChange={handleChange}>
          <MenuItem>
            <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
              12
            </a>
          </MenuItem>
          <MenuItem>
            <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
              1222
            </a>
          </MenuItem>
        </Select> */}
        <a
          className={styles['tab-item']}
          href="https://testing.ambrus.studio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          E4C: Verse
        </a>
        <a
          className={styles['tab-item']}
          href="https://testing.ambrus.studio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Us
        </a>
      </div>
      <div className="grid items-center justify-end w-1/3 grid-flow-col gap-x-7">
        <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
          <ReactSVG src="svgs/discord.svg" />
        </a>
        <a href={socialLinks.rarible} target="_blank" rel="noopener noreferrer">
          <ReactSVG src="svgs/rarible.svg" />
        </a>
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          <ReactSVG src="svgs/twitter.svg" />
        </a>
        <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer">
          <ReactSVG src="svgs/medium.svg" />
        </a>
        <a href={socialLinks.openSea} target="_blank" rel="noopener noreferrer">
          <ReactSVG src="svgs/opensea.svg" />
        </a>
        {/* <div className="px-6 py-2 font-semibold text-white uppercase rounded-md cursor-pointer bg-primary">
          Connect Wallet
        </div> */}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
