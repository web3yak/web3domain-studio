import React, { useEffect, useState } from 'react';
import NextLink from 'next/link'
var w3d = require("@web3yak/web3domain");
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Spinner,
  useColorModeValue,
  SimpleGrid
} from "@chakra-ui/react";
interface Props {
  domain: string
}

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export function CheckDomain(props: Props) {

  const [domainAddr, setDomainAddr] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const url = "https://w3d.name/api/v1/index.php?domain=" + props.domain;
  console.log(url);

  
  useEffect(() => {
    setIsLoading(true); // Set isLoading to true whenever the effect runs
    const settings = {
      matic_rpc_url: "https://polygon-mainnet.g.alchemy.com/v2/K_A1JxpxF8dGzjk6MT5AhMYqXJj4zryx",
      eth_rpc_url: "https://eth-mainnet.g.alchemy.com/v2/3xuizzW1DmQMU6Nvo0bmp297MG7BjOKl",
      fvm_rpc_url: "https://api.node.glif.io/rpc/v1"
    };
   const resolve = new w3d.Web3Domain(settings);
    async function makeRequest() {
      console.log('before');

      await delay(3000);
     
      resolve.getAddress(props.domain, "ETH")
      .then(address => {
        setDomainAddr(props.domain+'--'+address);
        setError(''); // Clear any previous errors if successful
        setIsLoading(false); // Request completed
      })
      .catch((err: Error) => {
        if (err.message === "Too Many Requests") {
          setError("Too Many Requests. Please try again later.");
        } else {
          setError(err.message);
        }
        setDomainAddr('error'); // Clear the address if there's an error
      }) .finally(() => {
        setIsLoading(false);
      });
     
     //setDomainAddr('iii');
      console.log('after');
    }

    makeRequest();
    

  }, [props.domain]); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>
    
         {isLoading ? (
               <Spinner
               thickness='4px'
               speed='0.65s'
               emptyColor='gray.200'
               color='blue.500'
               size='s'
             />
         ): (
          <b>
          {domainAddr}</b>

         )

}
    
    
    </>
  );
}
