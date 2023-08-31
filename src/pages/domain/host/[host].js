import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
var w3d = require("@web3yak/web3domain");
import Link from 'next/link';
import useDomainInfo from '../../../hooks/domainInfo';
import { useURLValidation } from '../../../hooks/validate';
import { useNetworkValidation, checkContract } from '../../../hooks/useNetworkValidation';
import { useJsonValue } from "../../../hooks/jsonData";
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
  useClipboard,
  useBoolean,
  InputGroup,
  Input,
  InputRightElement,
  FormControl,
  FormLabel,
  Switch,
  FormHelperText,
  form

} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { FaCopy, FaExternalLinkAlt, FaForward } from "react-icons/fa";
import { useAccount, useNetwork } from "wagmi";
import {  DOMAIN_TLD, NETWORK_ERROR } from '../../../configuration/Config'


export default function Info() {
  const { isConnected, connector, address } = useAccount();
  const { validateURL } = useURLValidation();
  const isNetworkValid = useNetworkValidation();
  const router = useRouter();
  const { host } = router.query;
  const domain = host ? String(host).toLowerCase() : "";
  const { ownerAddress } = useDomainInfo(domain);
  const [jsonData, setJsonData] = useState(null); // Initialize jsonData as null
  const { getValue } = useJsonValue(jsonData);
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [flag, setFlag] = useBoolean();
  const [newUrl, setNewUrl] = useState('');
  const [web2Url, setWeb2Url] = useState('');
  const [web3Url, setWeb3Url] = useState('');
  const [visitUrl, setVisitUrl] = useState('');
  const [jsonDataNew, setJsonDataNew] = useState(null); // Initialize jsonDataNew as null


  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    console.log('Saving record..');

    console.log(jsonData);

        // Update the jsonDataNew object with the new web3_url value
        const updatedJsonData = {
          ...jsonData,
          records: {
            ...jsonData.records,
            "51": {
              type: "web3_url",
              value: newUrl
            }
          }
        };
    
        setJsonDataNew(updatedJsonData); // Update the state with the modified jsonData
    
        console.log(updatedJsonData);
  };

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


    if (domain) {
      const randomNumber = Math.random();
      const url = "https://w3d.name/api/v1/index.php?domain=" + domain + "&" + randomNumber;
      // console.log(url);
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setJsonData(json); // Store the json response in the component's state
          setIsLoading(false);
          // console.log(json);
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchData();

    }
  }, [domain]);

  // Use another useEffect to set webUrl
  useEffect(() => {

    console.log(jsonData);
    if (jsonData) {
    var web2_url =getValue("web_url");
    //console.log(web2_url);

    var web3_url =getValue("web3_url");
    //console.log(web3_url);


    setWeb2Url(web2_url);
    setWeb3Url(web3_url);

    console.log(web3Url);
    console.log(web2Url);
   

    const isValid = validateURL(web3Url);
 
    if(isValid)
    {
      console.log("Valid URL "+web3Url);
      setVisitUrl(web3Url);
    }
    else
    {
      if(validateURL(web2Url))
      {
      setVisitUrl(web2Url);
      }
      else
      {
        setVisitUrl("#");
      }
    }
    console.log(visitUrl);
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
          <Kbd><Link href={`/domain/info/${domain}`}>{domain}</Link></Kbd>
          <Box
          textAlign="center"
          alignContent={"center"}
          borderRadius="lg"
          p={{ base: 5, lg: 2 }}
          bgSize={"lg"}
          maxH={"80vh"}
        >
          {isNetworkValid && domain.endsWith('.' + DOMAIN_TLD) ? (
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

                    {address == ownerAddress  ?
           <form onSubmit={handleSubmit}>
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
                         
                          <Text mb='4px'>Redirect to:</Text>
                                <InputGroup>

                                  <Input
                                    value={visitUrl}
                                    placeholder='No website defined!'
                                    size='sm'
                                    disabled="true" 
                                  />
                                  {web3Url != null && (
                                    <InputRightElement width='1rem' >

                                      <Link href={`${visitUrl}`} passHref>
                                        <a target="_blank" rel="noopener noreferrer">
                                          <FaExternalLinkAlt mx='2px' />
                                        </a>
                                      </Link>
                                    </InputRightElement>
                                  )}
                                </InputGroup>
                                <br />

                                <FormControl display='flex' alignItems='center'>
                                  <FormLabel htmlFor='change-url' mb='0'>
                                    Turn on Redirects to own link
                                  </FormLabel>
                                  <Switch id='change-url' onChange={() => {
                                    setFlag.toggle();
                                    //handleFlagChange();
                                  }} isChecked={flag} />
                                </FormControl>

                                {flag && (
                                  <FormControl mt={2}>
                                    <FormLabel>Your New Website URL</FormLabel>
                                    <Input
                                      type="url"
                                      placeholder="http://"
                                      size="md"
                                      value={newUrl}
                                      onChange={(event) =>
                                        setNewUrl(event.currentTarget.value)
                                      }
                                    />
                                    <FormHelperText>
                                      IPFS & http URL both are supported.<br/>
                                      {newUrl}
                                    </FormHelperText>
                                  </FormControl>
                                )}

                          </CardBody>

                          <CardFooter>
                            {address == ownerAddress ? (
                              <div>
                                <Button rightIcon={<FaForward />} colorScheme="teal" type="submit" width="half" mt={4}>
                              Save
                            </Button>
                                &nbsp;
                                <Button variant='solid' colorScheme='yellow'>
                                  <Link href={`/domain/manage/${domain}`}>Update Website</Link>
                                </Button>

                                &nbsp;
                              </div>
                            ) : (<>Not authorized</>)}

                 
                          </CardFooter>
                        </Stack>
                      </Card>
                      </form>
                      :

                      <Alert status='error'>
                      <AlertIcon />
                      <AlertTitle>You are not authorized.</AlertTitle>
                    </Alert>

                    }

                  </p>



                )}
              </>
            )}

          </Stack>
           ) :
           (<>{NETWORK_ERROR}</>)
         }
         </Box>
        </Container>

      </Box>

    </Flex>
  )
}
