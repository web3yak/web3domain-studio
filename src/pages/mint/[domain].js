import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import { generateJson, getIpfsCid } from '../../hooks/ipfs';
import { useDomainValidation } from '../../hooks/validate';

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


//const CONTRACT_ADDRESS = '0x7D853F9A29b3c317773A461ed87F54cdDa44B0e0'; //Polygon
const CONTRACT_ADDRESS = '0xf89F5492094b5169C82dfE1cD9C7Ce1C070ca902'; // Mumbai



export default function Info() {

  const { isValid, validateDomain } = useDomainValidation(); // Use the correct variable names

  const uniqueId = Math.round(Date.now() * Math.random()).toString();
  const { address, connector, isConnected } = useAccount()
  const router = useRouter();
  const { domain } = router.query;

  const [domainName, setDomainName] = useState('theinitialdomaintest.yak');
  const [claimId, setClaimId] = useState(uniqueId); // Using claimId state instead of claim_id variable
  const [claimTransferTo, setClaimTransferTo] = useState('0x8D714B10B719c65B878F2Ed1436A964E11fA3271');


  const claim_id = '8888888';
  const claim_name = domain;
  const claim_url = 'http://yahoo.com';
  const claim_transfer_to = '0x8D714B10B719c65B878F2Ed1436A964E11fA3271';
  const amount = DOMAIN_PRICE_ETH;


  const handleValidation = (domaintest) => {
    validateDomain(domaintest); // Call the validation function here
  };


  // var domain_claim = await claim(claim_id, claim_name, claim_url, claim_transfer_to, amount);


  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abiFile.abi,
    functionName: 'claim',
    args: [claimId, domainName, claim_url, claimTransferTo],
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
      handleValidation(domain);
    if (isValid) {

      setDomainName(domain);
      setClaimId(uniqueId); // Update claimId state
      setClaimTransferTo(address); // Update claimTransferTo state

      if (!isPrepareError) {
        write();
      }
      else {
        console.log("prepare error not working");
      }
    }
    else {
      console.log("Invalid Domain Name " + domain);
    }

  }


  useEffect(() => {

    async function fetchData() {
      const array = [1, 2, 3];
      const name = 'example';
      console.log('fetch data running');
      const success = await generateJson(array, name);
      if (success) {
        const ipfsCid = await getIpfsCid(name);
        console.log('IPFS CID:', ipfsCid);
      }
      else
      {
        console.log("Error receiving ipfs cid");
      }

    }
    fetchData();

  }, [domain, address]);

  return (
    <>
      Domain from URL: {domain}
      <br />
      Claim ID {claim_id} = {claimId}
      <br />
      Claim name: {claim_name} = {domainName}
      <br />
      Transfer to: {claim_transfer_to} = {claimTransferTo}
      <hr>
      </hr>

      <button onClick={() => handleMint()}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://polygonscan.com/tx/${data?.hash}`}>Etherscan</a>
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
