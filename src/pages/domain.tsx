/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage, useContractRead, erc721ABI } from "wagmi";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import Link from 'next/link';
import abiFile from "../web3domain.json";
var w3d = require("@web3yak/web3domain");

//https://blog.0x3.studio/a-very-simple-to-offer-a-connect-wallet-option-for-your-website-thanks-to-rainbowkit/

export default function SignExample1() {
  const { isConnected, connector, address } = useAccount();
  const [domainAddr, setDomainAddr] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const settings = {
      matic_rpc_url: "https://polygon-mainnet.g.alchemy.com/v2/K_A1JxpxF8dGzjk6MT5AhMYqXJj4zryx",
      eth_rpc_url: "https://eth-mainnet.g.alchemy.com/v2/3xuizzW1DmQMU6Nvo0bmp297MG7BjOKl",
      fvm_rpc_url: "https://api.node.glif.io/rpc/v1"
    };
    
    
    const resolve = new w3d.Web3Domain(settings);
    if (address) {
    resolve
      .getDomainList(address)
      .then((w3d) => {
        setDomainAddr(w3d);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }   
  }, [address]);

  if (isConnected) {
    return (
      <Flex
        align="center"
        justify="center"
        bg={useColorModeValue("white", "gray.700")}
        borderRadius="md"
        color={useColorModeValue("gray.700", "whiteAlpha.900")}
        shadow="base"
      >
        <Box
          textAlign="center"
          alignContent={"center"}
          borderRadius="lg"
          p={{ base: 5, lg: 16 }}
          bgSize={"lg"}
          maxH={"80vh"}
        >
          <Container
            maxW={"3xl"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack
              as={Box}
              textAlign={"center"}
              spacing={{ base: 8, md: 14 }}
              py={{ base: 20, md: 36 }}
            >
              <div>
                <NextSeo title="My Domain list" />
                <Heading as="h2" fontSize="2xl" my={4}>
                  My Domain list
                </Heading>
                <div>Connected to {address}</div>
                <p>These are the domains I have in my wallet</p>

                {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <table>
              <tbody>
                {domainAddr.map((item, index) => (
                  <tr key={index}>
                    <td> {item[0]}</td>
                    <td><Link href={`/info/${item[1]}`}>{item[1]}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

              </div>
            </Stack>
          </Container>
        </Box>
      </Flex>
    );
  }

  return <div>Connect your wallet first to sign a message.</div>;
}
