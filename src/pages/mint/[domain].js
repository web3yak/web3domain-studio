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



export default function Info() {
  const { address, connector, isConnected } = useAccount()
  const router = useRouter();
  const { domain } = router.query;

  const [domainName, setDomainName] = useState(domain);
  
  const uniqueId = Math.round(Date.now() * Math.random()).toString();
  const claim_id = '8888888';
  const claim_name = domain;
  const claim_url = 'http://yahoo.com';
  const claim_transfer_to = '0x8D714B10B719c65B878F2Ed1436A964E11fA3271';
  const amount = DOMAIN_PRICE_ETH;





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
      value: ethers.utils.parseEther(DOMAIN_PRICE_ETH)
    }
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })


  const handleMint = async () => {

    console.log("hello " + domain);
    setDomainName = domain;
    claim_id = uniqueId;
    claim_transfer_to = address;

    if (!isPrepareError) {
      write();
    }
    else {
      console.log("prepare error not working");
    }

  }


  useEffect(() => {

    console.log(DOMAIN_PRICE_ETH);
    console.log(claim_name);
    console.log(claim_id);
    console.log(claim_transfer_to);


  }, [domain, address]);

  return (
    <>
      Domain from URL: {domain}
      <br />
      Claim ID {claim_id}
      <br />
      Claim name: {claim_name} = {domainName}
      <br />
      Transfer to: {claim_transfer_to}
      <hr>
      </hr>

      <button onClick={() => handleMint()}>
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
      {(isPrepareError) && (
        <div>PrepareError: {(prepareError || error)?.message}</div>
      )}

      {(isError) && (
        <div>isError: {(prepareError || error)?.message}</div>
      )}
    </>

  );
}
