import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from 'react';
import { useAccount, useContractRead, erc721ABI, useNetwork } from "wagmi";
import styles from "../styles/Home.module.css";
import { CheckDomain } from "../components/CheckDomain";
// Import debounce from lodash

type DomainTuple = [string, string];
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
  Input,
  Text,
  Divider,
  AbsoluteCenter,
  Fade, ScaleFade, Slide, SlideFade, Collapse,
} from "@chakra-ui/react";


import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
const Home: NextPage = () => {
  const { isConnected, connector, address } = useAccount();
  const [value, setValue] = useState('');
  const [showBox, setShowBox] = useState(false); // Added state to control visibility of Box

  const [error, setError] = useState(''); // Specify the type for error state 

  const handleInputFocus = () => {
    setShowBox(false); // Hide Box when input field is clicked
  };

  const fetchData = (param: string) => {
    setValue(param);
    setShowBox(true); // Show Box when value is updated after 5 seconds of inactivity

    console.log(param);
  };

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
            maxW={"5xl"}
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

                <Heading as="h2" fontSize="2xl" my={4}>
                  Web3 Domain Search
                </Heading>
                <p>

                  <Input
                    value={value}
                    onChange={(ev) => fetchData(ev.target.value)}
                    placeholder='Here is a sample placeholder'
                    onFocus={handleInputFocus} // Handle onFocus event to hide Box
                    size='sm'
                  />

                  {showBox && (




                    <Box position='relative' padding='2'>

                      <TableContainer>
                        <Table size='sm'>

                          <Tbody>
                            <Tr>
                              <Td>jack.demo</Td>
                              <Td>-</Td>
                              <Td><CheckDomain domain='jack.demo' /></Td>
                            </Tr>
                            <Tr>
                              <Td>{value}</Td>
                              <Td>-</Td>
                              <Td><CheckDomain domain={value} /></Td>
                            </Tr>

                          </Tbody>

                        </Table>
                      </TableContainer>

                      <Divider />

                    </Box>
                  )}
                </p>


              </div>
            </Stack>
          </Container>
        </Box>
      </Flex>

)

};

export default Home;
