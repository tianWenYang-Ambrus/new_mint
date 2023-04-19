import { useEffect, useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import abiKaax from '@/contracts/abi/Kaax';
import axios from 'axios';

export default function Home() {
  const [list, setList] = useState([]);
  const { config } = usePrepareContractWrite({
    address: '0xD31463d0b3c3DA82D4DC0bA97B8124aCd13eECb0',
    abi: abiKaax,
    functionName: 'whitelistMint',
    args: [list, 1],
    // onError(err) {
    //   console.log('error', err);
    // },
    // onSuccess(data) {
    //   console.log('Success', data);
    // },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const doMint = async () => {
    const res = await axios.get('http://api.deom.com');
    setList(res.data);
    write?.();
  };

  // useEffect(() => {}, []);

  return <div onClick={doMint}>this is a test page !</div>;
}
