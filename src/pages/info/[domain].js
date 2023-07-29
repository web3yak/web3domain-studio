import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
var w3d = require("@web3yak/web3domain");
import Link from 'next/link';
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

export default function Info() {
  const router = useRouter();
  const { domain } = router.query;

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

    if (domain) {
      resolve.getAddress(domain, "ETH")
        .then(address => {
          setDomainAddr(address);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [domain]);

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

      Checking info {domain}

{isLoading ? (
  <svg /* Add your loading SVG component here */ />
) : (
  <>
    {error ? (
      <p>Error: {error}</p>
    ) : (
      <p>
        {domain} Domain = {domainAddr !== null ? <Link href={`/address/${domainAddr}`}>{domainAddr}</Link>  : "Invalid Web3 Domain"}
      </p>
    )}
  </>
)}

</Stack>
</Container>

</Box>

      </Flex>

  );
}
