import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import { parseEther } from 'viem'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import {
  Box,
  Button,
  Container,
  Flex,
  SkeletonText,
  Skeleton,
  CardHeader,
  Heading,
  Stack,
  SkeletonCircle,
  useColorModeValue,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text
} from "@chakra-ui/react";
import abiFile from '../../abiFile.json';
import { DOMAIN, DOMAIN_PRICE_ETH, DOMAIN_IMAGE_URL, DOMAIN_NETWORK_CHAIN } from '../../configuration/Config'


const CONTRACT_ADDRESS = '0x7D853F9A29b3c317773A461ed87F54cdDa44B0e0';
const uniqueId =  Math.round(Date.now() * Math.random()).toString();
var claim_id = '';
var claim_name = '';
var claim_url ='http://yahoo.com';
var claim_transfer_to = '';
var amount = DOMAIN_PRICE_ETH;


export default function Info() {
  const { address, connector, isConnected } = useAccount()
  const router = useRouter();
  const { domain } = router.query;

 // var domain_claim = await claim(claim_id, claim_name, claim_url, claim_transfer_to, amount);


const {
  config,
  error: prepareError,
  isError: isPrepareError,
} = usePrepareContractWrite({
  address: CONTRACT_ADDRESS,
  abi: abiFile.abi,
  functionName: 'claim',
  args: [claim_id, claim_name, claim_url, claim_transfer_to],
  overrides: {
    value: ethers.utils.parseEther("1")
  }
})
const { data, error, isError, write } = useContractWrite(config)

const { isLoading, isSuccess } = useWaitForTransaction({
  hash: data?.hash,
})



  useEffect(() => {
    claim_name = domain;
    claim_id = uniqueId;
    claim_transfer_to = address;

    console.log(DOMAIN_PRICE_ETH);
    console.log(claim_name);
   console.log(claim_id);
   console.log(claim_transfer_to);


  }, [domain]);

  return (
<>
Hello {domain}
<hr>
</hr>

      <button disabled={!write || isLoading}  onClick={() => write()}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
</>

  );
}
