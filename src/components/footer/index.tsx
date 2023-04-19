import {} from 'react';
import { ReactSVG } from 'react-svg';
import { css } from 'glamor';
import { socialLinks } from '@/data/mint';

const Footer = () => {
  const styles = css({
    ' svg': {
      height: 115,
      width: 115,
    },
  });

  return (
    <div className="py-12 px-[88px] bg-footer w-full flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <ReactSVG src="svgs/ambrus.svg" {...styles} />
        </a>
        <div className="grid grid-flow-col gap-x-7">
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
        </div>
      </div>
      <ReactSVG src="svgs/ambrus_brand.svg" />
      <div className="text-xs font-extralight text-white mt-[66px]">© 2021 Ambrus Studio</div>
    </div>
  );
};

export default Footer;
