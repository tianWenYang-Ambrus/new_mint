import axios from 'axios';

const host_kaax = 'https://api.ambrus.studio/nft-kaax-testing';
const host_mint = 'https://api.ambrus.studio/nft-minting-testing';
const host_kaax_metadata = 'https://api.ambrus.studio/e4c-ranger/kaax/metadata';

const request_kaax = axios.create({
  baseURL: host_kaax,
});
const request_mint = axios.create({
  baseURL: host_mint,
});

export const saleStatus = request_kaax.get(`/saleStatus`);
export const hasRole = (address: string) => {
  return request_mint.get(`/hasRole`, {
    params: {
      address: address,
      saleKind: 'whitelist',
    },
  });
};

export const holding = (address: `0x${string}` | undefined) => {
  return request_kaax.get('/holding', {
    params: {
      address: address,
    },
  });
};
export const getMetaData = (tokenId: string) => {
  return axios.get(`${host_kaax_metadata}/${tokenId}`);
};
