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

    setIsLoading(true); // Set isLoading to true whenever the effect runs


    const fetchData = () => {

      const settings = {
        matic_rpc_url: process.env.NEXT_PUBLIC_MATIC ,
        eth_rpc_url: process.env.NEXT_PUBLIC_ETH ,
        fvm_rpc_url: process.env.NEXT_PUBLIC_FILECOIN
      };
      const resolve = new w3d.Web3Domain(settings);




      let provider = ''
      if (chain) {
        if (chain?.network === 'filecoin-mainnet') {
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
                  My Domain list @ {chain?.name ?? "Unknown Chain"}
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
                      domainAddr.length === 0 ? ( // Check if the domainAddr array is empty
                      <p>No Record Found</p> // Display the message when the array is empty
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

                            <Link href={`/domain/info/${item[1]}`}>{item[1]}</Link>
                          </Box>
                        ))}

                      </SimpleGrid>
                    )
                    )}
                  </>
                )}

              </div>





            </Stack>
          </Container>
        </Box>
      </Flex>
    
    )
}
