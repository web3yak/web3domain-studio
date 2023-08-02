import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
var w3d = require("@web3yak/web3domain");
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Flex,
  SkeletonText,
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

export default function Info() {
  const router = useRouter();
  const { domain } = router.query;
  const [jsonData, setJsonData] = useState(null); // Initialize jsonData as null
  const [domainAddr, setDomainAddr] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setIsLoading(true); // Set isLoading to true whenever the effect runs


    const settings = {
      matic_rpc_url: "https://polygon-mainnet.g.alchemy.com/v2/K_A1JxpxF8dGzjk6MT5AhMYqXJj4zryx",
      eth_rpc_url: "https://eth-mainnet.g.alchemy.com/v2/3xuizzW1DmQMU6Nvo0bmp297MG7BjOKl",
      fvm_rpc_url: "https://api.node.glif.io/rpc/v1"
    };

    const resolve = new w3d.Web3Domain(settings);

    const url = "https://w3d.name/api/v1/index.php?domain="+domain;
    const fetchData = async () => {
      try {
          const response = await fetch(url);
          const json = await response.json();
          setJsonData(json); // Store the json response in the component's state
          console.log(json);
      } catch (error) {
          console.log("error", error);
      }
  };

  fetchData();

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
  <Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
</Box>
) : (
  <>
    {error ? (
      <p>Error: {error}</p>
    ) : (
      <p>
       {domainAddr !== null ? <Link href={`/address/${domainAddr}`}>{domainAddr}</Link>  : ""}
    
        {domainAddr !== null ? 
      
        <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={jsonData?.image}
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{jsonData?.name}</Heading>

      <Text py='2'>
      {jsonData?.description}
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Buy Latte
      </Button>
    </CardFooter>
  </Stack>
</Card>
    : 
    
    <Card align='center'>
  <CardHeader>
    <Heading size='md'>{domain}</Heading>
  </CardHeader>
  <CardBody>
    <Text>Not available</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue'>Register</Button>
  </CardFooter>
</Card>
    
    
    
    }
    
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
