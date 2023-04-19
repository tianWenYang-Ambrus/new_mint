import { FC, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { mint, socialLinks, mintAccessModal, errorMsgOver } from '../../data/mint';
import styles from './body.module.scss';
import Dialog from '@mui/material/Dialog';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import { ReactSVG } from 'react-svg';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import abiKaax from '@/contracts/abi/Kaax';
import { saleStatus, hasRole, holding, getMetaData } from '@/api';
import { contractAddress, scan } from '@/contracts/config';
import { omitString } from '@/utils/handleString';
import { toBase64 } from '@/utils/handleImage';
import { Shimmer } from '@/components/shimmer';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  opacity: 0.8,
  textAlign: 'center',
  p: 4,
};

const errModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
};

const maxMint = 2;

const Body = () => {
  const [showMintSuccess, setshowMintSuccess] = useState<boolean>(false);
  const [sold, setSold] = useState<any>(null);
  const { address } = useAccount();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [have, setHave] = useState<boolean>(false);
  // need a prepare data contract so need a demo data to avoid an contract error
  const [proof, setProof] = useState<string[]>([]);
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [mintSuccessMsg, setMintSuccessMsg] = useState<_MintSuccessItemProps[]>([]);
  const [holdList, setHoldList] = useState<[]>([]);
  const [overErr, setOverErr] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    address: contractAddress.KaaxTest,
    abi: abiKaax,
    functionName: 'whitelistMint',
    args: [proof, mintAmount],
    onError(err: any) {
      console.log('error', err);
    },
    // onSuccess(data) {
    //   console.log('Success', data);
    // },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    saleStatus.then((res) => {
      setSold(res.data.toLocaleString());
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setshowMintSuccess(true);
      checkHoldNum();
    }
    if (data) {
      const hash = data.hash;
      _getMetaData(hash);
    }
  }, [isSuccess, data]);

  const _getMetaData = async (hash: string) => {
    const res = await holding(address);
    const _newHostList = res.data;
    let _mintSuccessMsg: any[] = [];
    // case 1: first mint: mint amount is 2 or mint amount is 1
    if (_newHostList.length === mintAmount) {
      const reqMetaList = _newHostList.map((e: any) => getMetaData(e.tokenId));
      const imageRes = await Promise.all(reqMetaList);
      _mintSuccessMsg = _newHostList.map((e: any) => ({
        ...e,
        address: e.tokenAddress,
        // id: e.tokenId
      }));
      _mintSuccessMsg = imageRes.map((e: any, index: number) => ({
        ..._mintSuccessMsg[index],
        id: e.data.name,
        image: e.data.image,
      }));
    } else {
      // case 2: second mint amount
      const secondMint = _newHostList.slice(-1);
      const reqMetaList = secondMint.map((e: any) => getMetaData(e.tokenId));
      const imageRes = await Promise.all(reqMetaList);
      _mintSuccessMsg = _newHostList.map((e: any) => ({
        ...e,
        address: e.tokenAddress,
        // id: e.tokenId
      }));
      _mintSuccessMsg = imageRes.map((e: any, index: number) => ({
        ..._mintSuccessMsg[index],
        id: e.data.name,
        image: e.data.image,
      }));
    }
    _mintSuccessMsg = _mintSuccessMsg.map((e) => ({ ...e, hash: hash }));
    setMintSuccessMsg(_mintSuccessMsg);
  };

  useEffect(() => {
    if (address) {
      checkWhiteList();
      checkHoldNum();
    }
  }, [address]);

  useEffect(() => {
    // mint
    if (proof?.length > 0) {
      write?.();
    }
  }, [proof]);

  const checkWhiteList = async () => {
    if (address) {
      const res = await hasRole(address);
      if (res.data.data.length > 0) {
        setHave(true);
      } else {
        setHave(false);
      }
    }
  };

  const checkHoldNum = () => {
    holding(address).then((res: any) => {
      setHoldList(res.data);
    });
  };

  const doMint = async () => {
    if (mintAmount > maxMint - holdList.length) {
      setOverErr(true);
      return;
    }
    const res = await hasRole(address ?? '');
    setProof(res.data.data);
  };

  const amountChange = (amount: number) => {
    setMintAmount(amount);
  };

  return (
    <main className={`${styles.body} pt-[100px]`}>
      <div className="py-[60px] max-w-[1264px] mx-auto relative">
        <Image
          placeholder="blur"
          src={mint.information.banner}
          alt="banner"
          width={1264}
          height={480}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(Shimmer(1264, 480))}`}
        />
        <div className="absolute top-[96px] right-9">
          <div className={`${styles['introduce-card']}`}>
            <div className="text-sm font-semibold text-primary">{mint.information.type}</div>
            <div className="text-xl font-semibold text-white">{mint.information.name}</div>
            <div
              className={`${styles.content} text-sm leading-6 text-white mt-1`}
              dangerouslySetInnerHTML={{ __html: mint.information.content }}
            />
            {/* <DisableBtn text="coming soon" /> */}
            {holdList.length >= maxMint ? (
              <DisableBtn text="No Mint Access" />
            ) : (
              <MintMessage
                mintName="E4C Rangers AJAW"
                mintType="Free Mint"
                availableFrom="Apr 18"
                sold={sold}
                soldMax={mint.NFT.amount}
                address={address}
                onChange={amountChange}
                doMint={doMint}
              />
            )}
            <div
              onClick={() => {
                if (address) {
                  setShowDialog(true);
                } else {
                  showWalletConnect();
                }
              }}
              className="mt-3 font-bold underline cursor-pointer text-primary"
            >
              Check if my wallet is whitelisted
            </div>
          </div>
          <div className={`${styles['information-card']} mt-9`}>
            <div className="text-sm font-bold text-primary">{mint.NFT.name}</div>
            <div className="mt-3 text-white">Amount: {mint.NFT.amount.toLocaleString()}</div>
            <div className="mt-2 leading-6 text-white" dangerouslySetInnerHTML={{ __html: mint.NFT.describe }} />
            <div className="font-bold text-primary mt-9">{mint.NFT.tips_title}</div>
            <div
              className={`mt-2 text-sm leading-6 text-white ${styles.tips}`}
              dangerouslySetInnerHTML={{ __html: mint.NFT.tips_content }}
            />
          </div>
        </div>
        <SliderImage />
      </div>

      <MintSuccess show={showMintSuccess} close={() => setshowMintSuccess(false)} itemList={mintSuccessMsg} />
      <AccessDialog
        close={() => {
          setShowDialog(false);
        }}
        show={showDialog}
        have={have}
      />
      <Modal open={isLoading} onClose={() => {}}>
        <Box sx={modalStyle}>Minting...</Box>
      </Modal>

      <Modal
        open={overErr}
        onClose={() => {
          setOverErr(false);
        }}
      >
        <Box sx={errModalStyle}>
          <div className="flex justify-between px-6 py-4 text-4xl font-bold text-white bg-gray-o-20">
            <div>FAIL</div>
            <ReactSVG
              className="cursor-pointer"
              onClick={() => {
                setOverErr(false);
              }}
              src="svgs/close.svg"
            />
          </div>
          <div className="p-6 font-medium bg-white text-primary">{errorMsgOver}</div>
        </Box>
      </Modal>
    </main>
  );
};

const showWalletConnect = () => {
  const btn = document.querySelector('#walletBtn') as HTMLElement;
  btn?.click();
};

interface DisableBtnProps {
  text: string;
}
const DisableBtn: FC<DisableBtnProps> = ({ text }) => {
  return <div className="w-full py-5 mt-6 text-xl font-semibold text-center text-white uppercase bg-gray">{text}</div>;
};

interface MintMessageProps {
  mintName: string;
  mintType: string;
  availableFrom: string;
  sold: string;
  soldMax: number;
  address: string | undefined;
  onChange: (number: number) => void;
  doMint: Function;
}
const MintMessage: FC<MintMessageProps> = ({
  mintName,
  mintType,
  availableFrom,
  sold = '~',
  soldMax,
  address,
  onChange,
  doMint,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div>
      <div
        className={`px-6 flex justify-between w-full py-5 mt-6 text-xl font-semibold text-center text-white ${styles['mint-btn']} cursor-pointer`}
      >
        <div>{mintName}</div>
        <div>{mintType}</div>
      </div>
      <div className="flex justify-between mt-3 mb-6 text-sm font-normal text-gray">
        <div>Available from {availableFrom}</div>
        <div>{`${sold} / ${soldMax.toLocaleString()}`} Sold</div>
      </div>
      <div className="flex">
        <div className="flex mr-3 cursor-pointer switch">
          <div
            onClick={() => {
              setActive(1);
              onChange(1);
            }}
            className={`w-[60px] h-[72px] ${
              active === 1 ? 'bg-white text-black' : 'bg-black-20 text-black-o-50'
            } text-center leading-[72px] font-semibold text-2xl`}
          >
            1
          </div>
          <div
            onClick={() => {
              setActive(2);
              onChange(2);
            }}
            className={`w-[60px] h-[72px] ${
              active === 2 ? 'bg-white text-black' : 'bg-black-20 text-black-o-50'
            } text-center leading-[72px] font-semibold text-2xl`}
          >
            2
          </div>
        </div>
        <div
          onClick={() => {
            if (address) {
              doMint();
            } else {
              showWalletConnect();
            }
          }}
          className="flex-1 h-[72px] font-semibold text-white text-2xl uppercase text-center bg-primary leading-[72px] cursor-pointer"
        >
          Mint Now
        </div>
      </div>
    </div>
  );
};

const SliderImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: `slick-dots ${styles.dots}`,
  };
  return (
    <div className="mt-9" style={{ height: 652, width: 652 }}>
      <Slider {...settings}>
        {mint.disclaimer.images.map((e) => (
          <Image
            placeholder="blur"
            key={e}
            src={e}
            width={652}
            height={652}
            alt=""
            blurDataURL={`data:image/svg+xml;base64,${toBase64(Shimmer(652, 652))}`}
          />
        ))}
      </Slider>
    </div>
  );
};

interface AccessDialogProps {
  have: boolean;
  show: boolean;
  close: Function;
}

const AccessDialog: FC<AccessDialogProps> = ({ have = false, show, close }) => {
  return (
    <Dialog
      onClose={() => close()}
      open={show}
      maxWidth={'xl'}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <div className="py-4 pl-6 text-4xl font-bold text-white bg-gray-o-20 w-[720px]">
        {have ? mintAccessModal.whitelist.title : mintAccessModal.public.title}
      </div>
      <div className={`${styles['dialog-body']} flex flex-col items-center px-[96px] pt-12 pb-9`}>
        {have ? (
          <>
            <ReactSVG src="svgs/yes.svg" />
            <div className="mt-12 text-black uppercase font-semibold leading-[30px]">
              {mintAccessModal.whitelist.subtitle}
            </div>
            <div className="leading-[30px]">{mintAccessModal.whitelist.time}</div>
          </>
        ) : (
          <>
            <ReactSVG src="svgs/not.svg" />
            <div className="mt-12 text-black leading-[30px]">
              Get whitelisted in our{' '}
              <a
                className="font-semibold underline cursor-pointer"
                href={socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Discord Server
              </a>
            </div>
          </>
        )}

        <div
          onClick={() => {
            close();
          }}
          className="bg-primary text-white w-full text-center leading-[60px] h-[60px] uppercase font-semibold cursor-pointer mt-6"
        >
          Gotcha!
        </div>
      </div>
    </Dialog>
    // <div className={show ? 'absolute z-50 top-[192px] left-0 right-0 bottom-0 mx-auto w-[720px]' : 'hidden'}>

    // </div>
  );
};

interface MintSuccessProps {
  itemList: _MintSuccessItemProps[];
  show: boolean;
  close: Function;
}
interface _MintSuccessItemProps {
  image: string;
  address: string;
  hash: string;
  id: string;
}

const MintSuccess: FC<MintSuccessProps> = ({ itemList, show = true, close }) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (show) {
      body?.setAttribute('style', 'overflow: hidden;');
    } else {
      body?.setAttribute('style', 'overflow: auto;');
    }
  }, [show]);

  return (
    <div className={show ? 'absolute top-0 right-0 left-0 bottom-0 bg-gray-o-20' : 'hidden'}>
      <div className="absolute z-50 top-[192px] left-0 right-0 bottom-0 mx-auto w-fit">
        <div className="flex items-center justify-between px-6 py-4 text-4xl font-bold text-white bg-gray-o-20">
          <div className="uppercase">SUCCESS</div>
          <ReactSVG className="cursor-pointer" onClick={() => close()} src="svgs/close.svg" />
        </div>
        <div className={`${styles['dialog-body']} flex items-center p-6`}>
          {itemList.map((e, i) => (
            <div className={i === 0 ? '' : 'ml-6'} key={e.id}>
              <div className="bg-white p-[5px]">
                {e.image.includes('.mp4') ? (
                  <video autoPlay src={e.image} width={350} height={350} />
                ) : (
                  <Image
                    placeholder="blur"
                    alt=""
                    src={e.image}
                    width={350}
                    height={350}
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(Shimmer(350, 350))}`}
                  />
                )}
              </div>
              <div className="mt-6">
                <div className="mb-1 text-xs">NFT ID</div>
                <div className="font-bold text-black">{e.id}</div>
              </div>
              <div className="mt-6">
                <div className="mb-1 text-xs uppercase">Smart Contract Address</div>
                <a
                  href={`${scan.polygonTest}/address/${e.address}`}
                  className="font-bold text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {omitString(6, ' ... ', 6, e.address)}
                </a>
              </div>
              <div className="mt-6">
                <div className="mb-1 text-xs uppercase">Transaction Hash</div>
                <a
                  href={`${scan.polygonTest}/tx/${e.hash}`}
                  className="font-bold text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {omitString(6, ' ... ', 6, e.hash)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
