import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork } from "wagmi";
import localforage from 'localforage';


export default function privateNotice() {
  const { address } = useAccount();
  // Get membership status
const getMembershipStatus = async (walletAddress) => {
  return await localforage.getItem(walletAddress);
};


async function getStatus() {
  const membershipStatus = await getMembershipStatus("0xbed79816b54E75eD54BF217333342C8d271b3b6f");
  return membershipStatus;
  }
  

getStatus();

  return (
    <div>
      hello

      {getStatus() == 'GOLD' &&
      (
        <>Member</>
      )
      }
    </div>
  )
}

