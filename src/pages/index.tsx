import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount, useSignMessage, useContractRead, erc721ABI, useNetwork } from "wagmi";
import styles from "../styles/Home.module.css";
import {
  Box,
  Input,
  Text
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const { isConnected, connector, address } = useAccount();
  if (isConnected) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Web3Domain Search
        </h1>
           <Input placeholder='Enter domain name to search' />

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
