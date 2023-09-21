import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
var w3d = require("@web3yak/web3domain");
import Link from "next/link";
import { FaEthereum, FaGreaterThan } from "react-icons/fa";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abiFile from "../../../abiFile.json";
import useDomainInfo from "../../../hooks/domainInfo";
import {
  useNetworkValidation,
  checkContract,
} from "../../../hooks/useNetworkValidation";
import { ethers } from "ethers";
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
  useToast,
  Input
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Divider, Kbd } from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";
import {
  NETWORK_ERROR,
  DOMAIN_TYPE,
  DOMAIN_TLD,
} from "../../../configuration/Config";

export default function Info() {
  const { isConnected, connector, address } = useAccount();
  const router = useRouter();
  const { transfer } = router.query;
  const domain = transfer ? String(transfer).toLowerCase() : "";
  const [addrDomain, setAddrDomain] = useState(null); // Initialize jsonData as null
  const [domainAddr, setDomainAddr] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const contractAddress = checkContract();
  const isNetworkValid = useNetworkValidation();
  const [eth, setEth] = useState("");

  var CONTRACT_ADDRESS = ""; // No contract found
  if (contractAddress) {
    CONTRACT_ADDRESS = contractAddress;
  }
  const { domainId, ownerAddress } = useDomainInfo(domain);
  const toast = useToast();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reverseButtonClicked, setReverseButtonClicked] = useState(false); // Track whether the reverse button has been clicked

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abiFile.abi,
    functionName: 'setReverse',
    args: [domainId],
  });

  const { data, werror, isError, write } = useContractWrite(config)
  // console.log(config);

  const { isWriteLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })



  useEffect(() => {

    if (domainId) { 
        setIsLoading(false);
       // console.log(domainId.toNumber());
    }
  }, [domain, domainId]);

  const startAction = async (did) => {

    console.log(did.toNumber());

  }

  const handleTransfer = async () => {

    console.log("gooo");
    startAction(domainId);

  }

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="md"
      color={useColorModeValue("gray.700", "whiteAlpha.900")}
      shadow="base"
    >
      <Container
        maxW={"3xl"}
        alignContent={"center"}
        textAlign="center"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Kbd>
          <Link href={`/domain/info/${domain}`}>{domain}</Link>
        </Kbd>

        <Box
          textAlign="center"
          alignContent={"center"}
          borderRadius="lg"
          p={{ base: 2, lg: 1 }}
          bgSize={"lg"}
          maxH={"80vh"}
        >
          {isNetworkValid && domain.endsWith("." + DOMAIN_TLD) ? (
            <Stack
              as={Box}
              textAlign={"center"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={{ base: 2, md: 2 }}
              py={{ base: 10, md: 6 }}
            >
              {isLoading ? (
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="3"
                  />
                </Box>
              ) : (
                <>
                  {error ? (
                    <p>Error: {error}</p>
                  ) : (
                    <p>
                      <Card
                        direction={{ base: "column", sm: "row" }}
                        overflow="hidden"
                        variant="outline"
                      >
                        <Stack>
                          <Heading size="md">Transfer Domain Name</Heading>

                          {address == ownerAddress ? (
                            <div>
                              <CardBody>
                                <br />
                                <Card>
                                  <CardBody>
                                    <Flex>
                                      <FaEthereum />
                                      <Box ml="3">
                                        <Text fontWeight="bold">{domain}</Text>
                                        <Text fontSize="sm">
                                          {ownerAddress}
                                        </Text>
                                      </Box>
                                    </Flex>
                                  </CardBody>
                                </Card>
                                <br />
                                <Divider />
                                <br />
                                <Card>
                                  <CardBody>
                                    <Flex>
                                      <FaEthereum />
                                      <Box ml="3">
                                      <Input variant='outline' placeholder='Outline' size="lg"    
                                      value={eth}                                        
                                        onChange={(event) =>
                                          setEth(event.currentTarget.value)
                                        }/>
                                      </Box>
                                    </Flex>
                                  </CardBody>
                                </Card>
                              </CardBody>

                              <CardFooter>
                                <Button
                                  rightIcon={<FaEthereum />}
                                  colorScheme="yellow"
                                  mt={4}
                                  disabled={isLoading}
                                  onClick={() => write && write()} // Ensure write function is available before calling
                                  >
                                    {isLoading ? 'Transferring ...' : (<>Transfer Domain</>)}
                              
                                </Button>
                              </CardFooter>
                            </div>
                          ) : (
                            <Alert status="error">
                              <AlertIcon />
                              <AlertTitle>You are not authorized.</AlertTitle>
                            </Alert>
                          )}
                        </Stack>
                      </Card>
                    </p>
                  )}
                </>
              )}
            </Stack>
          ) : (
            <>{NETWORK_ERROR}</>
          )}
        </Box>
      </Container>
    </Flex>
  );
}
