import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { useJsonValue } from "../../../hooks/jsonData";
import { useURLValidation } from '../../../hooks/validate';
import useDomainInfo from '../../../hooks/domainInfo';
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
    useDisclosure,
  
  
  } from "@chakra-ui/react";

  import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'


const UserProfilePage = () => {

    const [web3Url, setWeb3Url] = useState("");
    const [web2Url, setWeb2Url] = useState("");
    const [visitUrl, setVisitUrl] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [jsonData, setJsonData] = useState(null);
    const { validateURL } = useURLValidation();
    const { getValue } = useJsonValue(jsonData);
    const router = useRouter();
    const { visit } = router.query;
    const domain = visit ? String(visit).toLowerCase() : '';
    const { oldUri } = useDomainInfo(domain);
    const [isLoading, setIsLoading] = useState(true);

    const getJson = async (url) => {
        if (url) {
            console.log("****** " + url);
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setJsonData(json); // Store the json response in the component's state
                    setIsLoading(false);
                    console.log(json);
                } catch (error) {
                    console.log("error", error);
                    setIsLoading(false);
                }
            };
            await fetchData();
        }
        else
        {
            console.log("Domain not minted");
            setIsLoading(false);
        }
    }


    useEffect(() => {
        // Handle the username as needed  
        console.log("Username:", domain);

    }, [domain]);

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
                if (jsonData.records['50'].value.startsWith("https://")) {
                    web_url = jsonData.records['50'].value;
                }
                else {
                    web_url = 'https://ipfs.io/ipfs/' + jsonData.records['50'].value;
                }
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

    useEffect(() => {
       // console.log(webUrl);
    
       if(webUrl)
       {
        window.location.assign(webUrl);
       }
    }, [webUrl]);

    useEffect(() => {
        //console.log(oldUri);
           getJson(oldUri);
    }, [oldUri]);

    return (
        <div>
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
 {isLoading ? (
              <Box padding='6' boxShadow='lg' bg='white'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='3' />
              </Box>
            ) : (
<> 
{webUrl}
{!oldUri && (
            <Alert status='error'>
  <AlertIcon />
  <AlertTitle>{domain}</AlertTitle>
  <AlertDescription>Invalid domain name</AlertDescription>
</Alert>
)}



</>
            )}

       

            </Box>
            </Flex>
        </div>
    );
};

export default UserProfilePage;
