import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from 'react';
import { useAccount, useContractRead, erc721ABI, useNetwork } from "wagmi";
import styles from "../styles/Home.module.css";
import { CheckDomain } from "../components/CheckDomain";
import { DOMAIN_TLD, DOMAIN_NETWORK_CHAIN } from '../configuration/Config'
import { useDomainValidation } from '../hooks/validate';
import useGlobal from '../hooks/global';
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
  const { showToast } = useGlobal();
  const { isConnected, connector, address } = useAccount();
  const { isValidDomain, validateDomain } = useDomainValidation();
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [showBox, setShowBox] = useState(false); // Added state to control visibility of Box

  const handleInputFocus = () => {
    setShowBox(false); // Hide Box when input field is clicked
  };

  const process_domain = (param: string) =>
  {
    let processedParam = param.toLowerCase();

    if (!processedParam.endsWith(DOMAIN_TLD)) {
      processedParam = param +'.'+ DOMAIN_TLD;
    }
    return processedParam;
  }

  const fetchData = (param: string) => {

    //console.log(param + " ...... " + value);

    // Convert param to lowercase
   // let newParam = process_domain(param);

  //console.log("New parameter: "+newParam);

    setValue(param);

     // Check if the last character typed is a dash (-)
     const lastChar = param[param.length - 1];
     if (lastChar === '-'|| lastChar === '.') {
       // Don't trigger validation and setShowBox
       return;
     }


    validateDomain(param);

   // console.log(param + " **** " + value);

    if (isValidDomain) {
     // console.log("*");
      setValue2(process_domain(param));
      setValue3(process_domain('my' + param));
      setShowBox(true); // Show Box when value is updated after 5 seconds of inactivity

    }
    else {
    //  console.log("invalid domain");

      setShowBox(false);
    }
  };

  useEffect(() => {
    if (!isValidDomain && value !== '') {
      showToast("Notice", "Invalid Domain: " + value, "warning");
      setShowBox(false);
    }
  }, [isValidDomain, value]);

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
            py={{ base: 20, md: 16 }}
          >
            <div>

              <Heading as="h2" fontSize="2xl" my={1}>
                Web3 Domain Search
              </Heading>
              <p>

                <Input
                  value={value}
                  onChange={(ev) => fetchData(ev.target.value)}
                  placeholder='Search for a name'
                  onFocus={handleInputFocus} // Handle onFocus event to hide Box
                  size='lg'
                />

                {showBox && value != '' && (

                  <Box position='relative' padding='2'>

                    <TableContainer>
                      <Table size='lg'>

                        <Tbody>
                          <Tr>
                            <Td>{value2}</Td>
                            <Td>-</Td>
                            <Td><CheckDomain domain={value2} /></Td>
                          </Tr>
                          <Tr>
                            <Td>{value3}</Td>
                            <Td>-</Td>
                            <Td><CheckDomain domain={value3} /></Td>
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
