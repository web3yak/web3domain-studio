import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
var w3d = require("@web3yak/web3domain");
import Link from 'next/link';
import useDomainInfo from '../../../hooks/domainInfo';
import { useURLValidation } from '../../../hooks/validate';
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
  Text,
  Kbd,
  ButtonGroup,
  IconButton,
  useClipboard

} from "@chakra-ui/react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { useAccount, useNetwork } from "wagmi";
import { DOMAIN, DOMAIN_PRICE_ETH, DOMAIN_IMAGE_URL, DOMAIN_NETWORK_CHAIN, DOMAIN_DESCRIPTION } from '../../../configuration/Config'


export default function Info() {
  const { isConnected, connector, address } = useAccount();
  const { validateURL } = useURLValidation();
  const router = useRouter();
  const { info } = router.query;
  const { ownerAddress } = useDomainInfo(info);
  const [jsonData, setJsonData] = useState(null); // Initialize jsonData as null
  const [domainAddr, setDomainAddr] = useState(null);
  const [error, setError] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  useEffect(() => {

    setIsLoading(true); // Set isLoading to true whenever the effect runs
    const settings = {
      matic_rpc_url: process.env.NEXT_PUBLIC_MATIC,
      eth_rpc_url: process.env.NEXT_PUBLIC_ETH,
      fvm_rpc_url: process.env.NEXT_PUBLIC_FILECOIN
    };

    const resolve = new w3d.Web3Domain(settings);

    // console.log(resolve.SmartContractAddress); //Polygon Mainnet contract address
    // console.log(resolve.fvm_SmartContractAddress);  //Filecoin 


    if (info) {
      const randomNumber = Math.random();
      const url = "https://w3d.name/api/v1/index.php?domain=" + info + "&" + randomNumber;
      // console.log(url);
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setJsonData(json); // Store the json response in the component's state
          // console.log(json);
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchData();

      resolve.getAddress(info, "ETH")
        .then(address => {
          setDomainAddr(address);
          setValue(address);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [info]);

  // Use another useEffect to set webUrl
  useEffect(() => {
    var web_url = '';
    var web3_url = '';

    if (jsonData?.records?.hasOwnProperty('51') && jsonData.records['51'].value !== '') {
      // If the '51' property exists in jsonData.records and its value is not empty
      // Set web3_url
      web3_url = jsonData.records['51'].value;
    }

    if (jsonData?.records?.hasOwnProperty('50') && jsonData.records['50'].value !== '') {
      // If the '50' property exists in jsonData.records and its value is not empty
      // Set web_url
      // console.log(jsonData);
      if (jsonData.records['50'].value != 'https://ipfs.io/ipfs/null') {
        web_url = 'https://ipfs.io/ipfs/' + jsonData.records['50'].value;
      }
    }


    if (web3_url !== '') {
      setWebUrl(web3_url);
      // console.log(web3_url);
    } else if (web_url !== '') {
      setWebUrl(web_url);
      // console.log(web_url);
    }
  }, [jsonData]);

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
        p={{ base: 2, lg: 1 }}
        bgSize={"lg"}
        maxH={"80vh"}
      >
        <Container
          maxW={"3xl"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Kbd>{info}</Kbd>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 2, md: 2 }}
            py={{ base: 10, md: 6 }}
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

                    {domainAddr !== null ?

                      <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        align='center'
                      >

                        <Image
                          ml={2}
                          boxSize='150px'
                          src={jsonData?.image && jsonData.image.startsWith("ipfs://") ? jsonData.image.replace("ipfs://", "https://ipfs.io/ipfs/") : jsonData?.image}
                          alt={jsonData?.name}
                        />

                        <Stack>
                          <CardBody>
                            <Heading size='md'>{jsonData?.name}</Heading>

                            <Text py='2'>
                              {jsonData?.description}
                            </Text><br />

                            <ButtonGroup size='sm' isAttached variant='outline'>
                              <Button onClick={onCopy}>{domainAddr}</Button>
                              <IconButton aria-label='Copy' icon={<FaCopy />} onClick={onCopy} />
                            </ButtonGroup>


                          </CardBody>

                          <CardFooter>
<<<<<<< HEAD
                            {address == ownerAddress ? (
                              <div>
                                <Button variant='solid' colorScheme='blue'>
                                  <Link href={`/domain/reverse/${info}`}>Domain Address</Link>
                                </Button>
                                &nbsp;
                                <Button variant='solid' colorScheme='yellow'>
                                  <Link href={`/domain/manage/${info}`}>Modify Record</Link>
                                </Button>

                                &nbsp;

                                <Button variant='solid' colorScheme='teal'>
                                  <Link href={`/domain/host/${info}`}>Web Host</Link>
                                </Button>
                                
                                &nbsp;
                              </div>
                            ) : (<></>)}

                            {
                              validateURL(webUrl) && webUrl != '' && (
                                <Button variant='solid' colorScheme='green' rightIcon={<FaExternalLinkAlt />}>
                                  <Link href={`${webUrl}`} passHref>
                                    <a target="_blank" rel="noopener noreferrer">Visit</a>
                                  </Link>                     </Button>
                              )}

=======
                         
                            {address == ownerAddress ? (
                             
                             <Stack direction="row" spacing={1}>          
                                <Button variant='solid' colorScheme='blue'>
                                  <Link href={`/domain/reverse/${info}`}>Address</Link>
                                </Button>
                       
                                <Button variant='solid' colorScheme='yellow'>
                                  <Link href={`/domain/manage/${info}`}>Record</Link>
                                </Button>


                                <Button variant='solid' colorScheme='teal'>
                                  <Link href={`/domain/host/${info}`}>Host</Link>
                                </Button>
                        
                                <Button variant='solid' colorScheme='red'>
                                  <Link href={`/domain/image/${info}`}>Image</Link>
                                </Button>
                        
                        </Stack>
                            ) : (<></>)}

                            {
                              validateURL(webUrl) && webUrl != '' && (
                                <Button variant='solid' colorScheme='green' rightIcon={<FaExternalLinkAlt />}  ml="1">
                                  <Link href={`${webUrl}`} passHref>
                                    <a target="_blank" rel="noopener noreferrer">Visit</a>
                                  </Link>                     </Button>
                              )}

>>>>>>> bed758f39c9e34b9f9840d03b94c5922be3d9b4b

                          </CardFooter>
                        </Stack>
                      </Card>
                      :

                      <Card align='center'>
                        <CardHeader>
                          <Heading size='md'>Register {info}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>{DOMAIN_DESCRIPTION}</Text>
                        </CardBody>
                        <CardFooter>
                          <div>
                            <Button colorScheme='teal' size='lg'>  <Link href={`/domain/mint/${info}`}>Start</Link></Button>
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
  )
}
