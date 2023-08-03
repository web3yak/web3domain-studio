import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from 'react';
import { useAccount, useSignMessage, useContractRead, erc721ABI, useNetwork } from "wagmi";
import styles from "../styles/Home.module.css";
import {
  Box,
  Input,
  Text,
  Divider,
  AbsoluteCenter
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const { isConnected, connector, address } = useAccount();
  const [value, setValue] = useState('');
  const [showBox, setShowBox] = useState(false); // Added state to control visibility of Box

  const handleInputFocus = () => {
    setShowBox(false); // Hide Box when input field is clicked
  };

  const fetchData = (param: string) => {
    setValue(param);
    setShowBox(true); // Show Box when value is updated
    console.log(param);
  };

  if (isConnected) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Web3Domain Search
        </h1>
        {showBox && (
            <Box position='relative' padding='10'>
              <Divider />
              <AbsoluteCenter bg='white' px='4'>
                {value}
              </AbsoluteCenter>
            </Box>
          )}
      <Input
        value={value}
        onChange={(ev) => fetchData(ev.target.value)}
        placeholder='Here is a sample placeholder'
        onFocus={handleInputFocus} // Handle onFocus event to hide Box
        size='sm'
      />

      </main>
    </div>
  );
  }
  else
  {
    return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Web3Domain Search
        </h1>
        <p className={styles.description}>
          Connect your wallet and start playing around
        </p>

      </main>
    </div>
    )
  }
};

export default Home;
