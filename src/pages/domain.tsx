/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
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
import { useState } from "react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import abiFile from '../web3domain.json';

const CONTRACT_ADDRESS = '0x7D853F9A29b3c317773A461ed87F54cdDa44B0e0';

const JellyBotsChecker = ({ address }: { address: string }) => {
  const { data } = useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: erc721ABI,
    functionName: "balanceOf",
    args: address,
  });

  const [hasJellyBot, setHasJellyBot] = useState(false);

  useEffect(() => {
    if (data) {
      setHasJellyBot(data.toNumber() > 0);
    }
  }, [data]);

  return (
    <div>
      {hasJellyBot ? (
        <p>You own a JellyBot! Well done!</p>
      ) : (
        <p>You don&apos;t own a JellyBot yet :(</p>
      )}
    </div>
  );
};

//https://blog.0x3.studio/a-very-simple-to-offer-a-connect-wallet-option-for-your-website-thanks-to-rainbowkit/
function DomainList() {

  return (
    <div>
  
I will list my domains here <hr/>

    </div>
  );
}

export default function SignExample1() {
  const { isConnected, connector, address } = useAccount();

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
          alignContent={'center'}
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
                <p>
                  These are the domains I have in my wallet
                </p>

                <DomainList />
              </div>
            </Stack>
          </Container>
        </Box>
      </Flex>
    );
  }

  return <div>Connect your wallet first to sign a message.</div>;
}
