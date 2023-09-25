import React, { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { isValidMember } from "../../hooks/validate";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import {
  Text,
  Flex,
  useColorModeValue,
  Spacer,
  Box,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
  useBreakpointValue,
  Button,
  Lorem,
} from "@chakra-ui/react";

import jsonData from '../../PrivateNotice.json';

export default function privateNotice() {
  const { address } = useAccount();
  const [status, setStatus] = useState("none");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jsonData, setJsonData] = useState("");
  const [noticeData, setNoticeData] = useState([]);
  console.log(jsonData);

  useEffect(() => {
    if (address) {
      async function getStatus() {
        let test = await isValidMember(address);
        console.log(test);
        setStatus(test);
      }
      getStatus();
    }
  }, [address, status]);

  useEffect(() => {
    // Fetch and set the JSON data (you can use an API request or import it as in this example)
    console.log(jsonData); // Add this line for debugging
    setNoticeData(jsonData);
  }, []); 
  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
  ggg

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {status == "GOLD" && <> Member</>}
    </div>
  );
}
