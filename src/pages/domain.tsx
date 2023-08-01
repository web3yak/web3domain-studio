/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage, useContractRead, erc721ABI, useNetwork } from "wagmi";
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
import { NextSeo } from "next-seo";
import Link from 'next/link';
var w3d = require("@web3yak/web3domain");
type DomainTuple = [string, string];

//https://blog.0x3.studio/a-very-simple-to-offer-a-connect-wallet-option-for-your-website-thanks-to-rainbowkit/

export default function DomainList() {
  const { isConnected, connector, address } = useAccount();
  const { chain } = useNetwork();
  const [domainAddr, setDomainAddr] = useState<DomainTuple[]>([]);
  const [error, setError] = useState(''); // Specify the type for error state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {


    const fetchData = () => {

      const settings = {
        matic_rpc_url: "https://polygon-mainnet.g.alchemy.com/v2/K_A1JxpxF8dGzjk6MT5AhMYqXJj4zryx",
        eth_rpc_url: "https://eth-mainnet.g.alchemy.com/v2/3xuizzW1DmQMU6Nvo0bmp297MG7BjOKl",
        fvm_rpc_url: "https://api.node.glif.io/rpc/v1"
      };
      const resolve = new w3d.Web3Domain(settings);




      let provider = ''
      if (chain) {
        if (chain.network == 'filecoin-mainnet') {
          provider = 'fvm';
          console.log(provider);
        }
      }

      if (address) {
        resolve
          .getDomainList(address, provider)
          .then((data: DomainTuple[]) => {
            setDomainAddr(data);
          })
          .catch((err: Error) => {
            setError(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }

    }


    fetchData();

  }, [address, chain]);

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
          p={{ base: 5, lg: 2 }}
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
              py={{ base: 10, md: 5 }}
            >
              <div>
                <NextSeo title="My Domain list" />
                <Heading as="h2" fontSize="2xl" my={4}>
                  My Domain list
                </Heading>


                {isLoading ? (
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                ) : (
                  <>
                    {error ? (
                      <p>Error: {error}</p>
                    ) : (

                      <SimpleGrid
                        bg='gray.50'
                        columns={{ sm: 2, md: 4 }}
                        spacing='8'
                        p='1'
                        textAlign='center'
                        rounded='lg'
                        color='gray.400'
                      >

                        {domainAddr.map((item, index) => (

                          <Box boxShadow='lg' p='6' rounded='md' bg='white' key={index}>

                            <Link href={`/info/${item[1]}`}>{item[1]}</Link>
                          </Box>
                        ))}

                      </SimpleGrid>
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
