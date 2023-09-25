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

import jData from './PrivateNotice.json';

export default function privateNotice() {
  const { address } = useAccount();
  const [status, setStatus] = useState("none");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noticeData, setNoticeData] = useState([]);

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
    console.log(jData); // Add this line for debugging
    setNoticeData(jData);
  }, [noticeData]); 


  return (
    <div>
      <Button onClick={onOpen}>Bulletin board</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bulletin board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {status == "GOLD" ?(
          <ul>
        {noticeData.map((notice) => (
          <li key={notice.ID}>
            ID is {notice.ID}, Date is {notice.Date}, Title is {notice.Title}, Message is {notice.Message}
          </li>
        ))}
      </ul>
          )
          :
          (
            <>You are not a member</>
          )

        }



          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {status != "GOLD" && (
             <Link href="/list">
             <Button colorScheme="teal" variant="solid">
               Check Domain
             </Button>
             </Link>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  );
}
