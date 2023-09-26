import React, { useEffect, useState } from "react";
import { useAccount} from "wagmi";
import { isValidMember } from "../../hooks/validate";
import { ADMIN_WALLET, NOTICE_TITLE } from "../../configuration/Config";
import localforage from 'localforage';
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
  Input ,
  Textarea
} from "@chakra-ui/react";

import { DeleteIcon } from '@chakra-ui/icons'

import jData from "./PrivateNotice.json";

export default function privateNotice() {
  const { address } = useAccount();
  const [status, setStatus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noticeData, setNoticeData] = useState([]);
  const [modify, setModify] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const setMembershipStatus = (key, status) => {
    localforage.setItem(key, status);
  };

  const edit = () => {
    console.log("Modify");
    setModify(true);
  };

  const update = async () => {
    console.log("Update");
    try {
      // Send an HTTP POST request to the API route
      const response = await fetch('/api/message/update-notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-token': 'YOUR_SECRET_API_TOKEN',
        },
        body: JSON.stringify({
          title,
          notes,
        }),
      });
  
      if (response.ok) {
        console.log('Data updated successfully');
        setModify(false); // Set modify to false when the update is successful
      } else {
        console.error('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const deleteEntry = async (entryID) => {
    try {
      // Send an HTTP DELETE request to the API route
      const response = await fetch(`/api/message/delete-notice/?id=${entryID}`, {
        method: 'DELETE',
        headers: {
          'api-token': 'YOUR_SECRET_API_TOKEN',
        },
      });

      console.log(response);
  
      if (response.ok) {
        console.log(`Entry with ID ${entryID} deleted successfully`);
        // Refresh the data by calling the useEffect
        setNoticeData([...noticeData.filter((entry) => entry.ID !== entryID)]);
      } else {
        console.error(`Failed to delete entry with ID ${entryID}`);
      }
    } catch (error) {
      console.error(`Error deleting entry with ID ${entryID}:`, error);
    }
  };

  const closeModal = () => {
    console.log("Close the modal");
    setModify(false); // Set modify to false when the modal is closed
    onClose(); // Close the modal
  };

  useEffect(() => {
    if (address) {
      async function getStatus() {
        let test = await isValidMember(address);
        console.log(test);
        //console.log(address);
        //console.log(ADMIN_WALLET);
        if(address == ADMIN_WALLET)
        {
          let addr = address?.toString();
          setMembershipStatus(addr, "ADMIN");
        }
        
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

  useEffect(() => {
    // Fetch and set the JSON data (you can use an API request or import it as in this example)
    console.log(modify); // Add this line for debugging
    // setNoticeData(jData);
  }, [modify]);

  return (
    <div>
      <Button onClick={onOpen}>{NOTICE_TITLE}</Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          {NOTICE_TITLE} &nbsp;
            {!modify && status == "ADMIN" ? <Button onClick={() => edit()}>Edit</Button> : null}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status == "GOLD" || status == "ADMIN" ? (
              <>
                {!modify ? (
                  <ul>
                    {noticeData.map((notice) => (
                      <li key={notice.ID}>
                        ID is {notice.ID}, Date is {notice.Date}, Title is{" "}
                        {notice.Title}, Message is {notice.Message}
                        {status == "ADMIN" ?  (
                        <Link
                  onClick={() => deleteEntry(notice.ID)}
                  color="red"
                  cursor="pointer"
                ><DeleteIcon/></Link>
              ):null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                  <Text mb='8px'>Title:</Text>
                  <Input
                                      type="text"
                                      placeholder="Headline or Topic"
                                      size="md"
                                      value={title}
                                      onChange={(event) =>
                                        setTitle(event.currentTarget.value)
                                      }
                                    />

                  <Text mb='8px'>Message:</Text>
                  <Textarea
        value={notes}
        onChange={(event) =>
          setNotes(event.currentTarget.value)
        }
        placeholder='Private messages, Stock tips, Giveaway Link'
        size='sm'
      />
                  
                  </>
                )}
              </>
            ) : (
              <>You are not a member</>
            )}
          </ModalBody>

          <ModalFooter>
            {modify ? <Button onClick={() => update()}>Update</Button> : null}

            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>

            {status != "GOLD" || status != "ADMIN" && (
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
