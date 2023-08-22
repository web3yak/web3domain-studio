import { useEffect, useState } from 'react';
import { useContractReads } from 'wagmi';
import abiFile from '../abiFile.json';

const CONTRACT_ADDRESS = '0xf89F5492094b5169C82dfE1cD9C7Ce1C070ca902'; // Mumbai

function useDomainInfo(domainName: string) {
  const [domainId, setDomainId] = useState<number | null>(null);
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null);
  const [oldUri, setOldUri] = useState<string | null>(null);

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: CONTRACT_ADDRESS,
        abi: abiFile.abi,
        functionName: 'getID',
        args: [domainName],
      },
      {
        address: CONTRACT_ADDRESS,
        abi: abiFile.abi,
        functionName: 'getOwner',
        args: [domainId],
      },
      {
        address: CONTRACT_ADDRESS,
        abi: abiFile.abi,
        functionName: 'tokenURI',
        args: [domainId],
      },
    ],
  });

  useEffect(() => {
    if (data && !isError) {
      const dataArray = data as [number, string, string]; // Adjust the types as needed
      setDomainId(dataArray[0]);
      setOwnerAddress(dataArray[1]);
      setOldUri(dataArray[2]);
    }
  }, [data, isError]);

  return {
    domainId,
    oldUri,
    ownerAddress,
    isLoading,
    isError,
  };
}

export default useDomainInfo;
