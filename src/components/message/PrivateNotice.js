import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork } from "wagmi";
import { isValidMember } from "../../hooks/validate";


export default function privateNotice() {
  const { address } = useAccount();
  const [status, setStatus] = useState("none");

  useEffect(() => {

    if(address)
    {
      
      async function getStatus()
      {
        let test = await isValidMember(address);
        console.log(test);
        setStatus(test);
      
      }
getStatus();

    }


  }, [address,status]);




  return (
    <div>
      hello

      {status == 'GOLD' &&
      (
        <> Member</>
      )
      }
    </div>
  )
}

