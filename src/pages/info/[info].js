import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import abiFile from '../../abiFile.json';
var w3d = require("@web3yak/web3domain");
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Flex,
  SkeletonText,
  Skeleton,
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
  const { info } = router.query;
  const [jsonData, setJsonData] = useState(null); // Initialize jsonData as null
  const [domainAddr, setDomainAddr] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const CONTRACT_ADDRESS = '0x7D853F9A29b3c317773A461ed87F54cdDa44B0e0';
  /*
  const contractConfig = {
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: abiFile.abi,
  };
 // console.log(abiFile.abi);

  const { data: isAllow } = useContractRead({
    ...contractConfig,
    functionName: 'totalSupply'
  }); // calling the 'commonTokenURI' function in our contract

  */

  const { data1 } = useContractRead({
    address: '0x7D853F9A29b3c317773A461ed87F54cdDa44B0e0',
    abi: [
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
    ],
    functionName: 'totalSupply',
  });
  
  console.log(data1 );

  var claim_id = '11111';
  var claim_name = 'xxxx.yak';
  var claim_url ='http://yahoo.com';
  var claim_transfer_to = '0x8D714B10B719c65B878F2Ed1436A964E11fA3271';
  var amount = "1";
 // var domain_claim = await claim(claim_id, claim_name, claim_url, claim_transfer_to, amount);



  useEffect(() => {

    setIsLoading(true); // Set isLoading to true whenever the effect runs

    //console.log({ isAllow });
    console.log({ data1 })

    const settings = {
      matic_rpc_url: process.env.NEXT_PUBLIC_MATIC ,
      eth_rpc_url: process.env.NEXT_PUBLIC_ETH ,
      fvm_rpc_url: process.env.NEXT_PUBLIC_FILECOIN
    };

    const resolve = new w3d.Web3Domain(settings);

   // console.log(resolve.SmartContractAddress); //Polygon Mainnet contract address
   // console.log(resolve.fvm_SmartContractAddress);  //Filecoin 


    if (info) {
    const url = "https://w3d.name/api/v1/index.php?domain="+info;
    console.log(url);
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


      resolve.getAddress(info, "ETH")
        .then(address => {
          setDomainAddr(address);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [info,data1]);

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
              spacing={{ base: 8, md: 5 }}
              py={{ base: 20, md: 36 }}
            >

{isLoading ? (
  <Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='3' />
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
          
            maxW={{ base: '100%', sm: '200px' }}
            src={jsonData?.image && jsonData.image.startsWith("ipfs://") ? jsonData.image.replace("ipfs://", "https://ipfs.io/ipfs/") : jsonData?.image}
            alt={jsonData?.name}
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
       Visit
      </Button>
    </CardFooter>
  </Stack>
</Card>
    : 
    
    <Card align='center'>
  <CardHeader>
    <Heading size='md'>{info}</Heading>
  </CardHeader>
  <CardBody>
    <Text>Not available</Text>
  </CardBody>
  <CardFooter>
      <div>
.....
    </div>


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
