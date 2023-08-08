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

export default function Info() {
  const router = useRouter();
  const { domain } = router.query;


  const CONTRACT_ADDRESS = '0x7D853F9A29b3c317773A461ed87F54cdDa44B0e0';

  var claim_id = '1111155543667';
  var claim_name = 'xxxxyyyyyyy.yak';
  var claim_url ='http://yahoo.com';
  var claim_transfer_to = '0x8D714B10B719c65B878F2Ed1436A964E11fA3271';
  var amount = "1";
 // var domain_claim = await claim(claim_id, claim_name, claim_url, claim_transfer_to, amount);



 const {
  data: balanceOf,
} = useContractRead({
  address: CONTRACT_ADDRESS,
  abi: abiFile.abi,
  functionName: "balanceOf",
  args: ['0x8D714B10B719c65B878F2Ed1436A964E11fA3271'],
  watch: true,
});


const { data, isLoading, isSuccess, write } = useContractWrite({
  address: CONTRACT_ADDRESS,
  abi: abiFile.abi,
  functionName: 'claim',
  args: [claim_id, claim_name, claim_url, claim_transfer_to],
  overrides: {
    value: ethers.utils.parseEther("1")
  }
})


  useEffect(() => {

    console.log('balance of '+balanceOf);

  }, [balanceOf]);

  return (
<>
Hello {domain}
<hr>
</hr>

<button
        disabled={!write}
        onClick={() =>
          write()
        }
      >
        Claim
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
</>

  );
}
