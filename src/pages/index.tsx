import type { NextPage } from "next";
import React, { useState } from 'react';
import { useAccount } from "wagmi";

import Search from '../components/domain/Search';
// Import debounce from lodash
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
                <Search />
              </p>
            </div>
          </Stack>
        </Container>
      </Box>
    </Flex>

  )

};

export default Home;
