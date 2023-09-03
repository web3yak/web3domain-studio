// hooks/useDomainValidation.tsx
import { useState } from 'react';

function isValidDomainName(domainName: string): boolean {
  //console.log('Validating : '+domainName);
  const dotCount = domainName.split('.').length - 1;
  if (dotCount > 1) return false;

  return (
    /^[a-z\d]([a-z\d-]*[a-z\d])?(\.[a-z\d]([a-z\d-]*[a-z\d])?)*$/i.test(domainName) &&
    /^.{1,253}$/.test(domainName) &&
    /^[^.]{1,63}(\.[^.]{1,63})*$/.test(domainName)
  );
}

export function useDomainValidation() {
  const [isValidDomain, setIsValidDomain] = useState(true);

  const validateDomain = (domainName: string) => {
    const isValidDomain = isValidDomainName(domainName);
    setIsValidDomain(isValidDomain);
  };

  return {
    isValidDomain,
    validateDomain,
  };
}

// hooks/validate.tsx
export function useURLValidation() {
  const validateURL = (param: string) => {
    if(param != null && param !="")
    {
    const input = param.toLowerCase(); // Convert input to lowercase
    
<<<<<<< HEAD
    console.log("validating URL of: "+input);
=======
    //console.log("validating URL of: "+input);
>>>>>>> bed758f39c9e34b9f9840d03b94c5922be3d9b4b
    if (input.trim() === '') {
      // Reset validation if input is empty or starts with 'http'
      return true;
    }
    try {
      new URL(input);
      return true;
    } catch (error) {
      return false;
    }
  }
  else
  {
    return false;
  }
  };

  return { validateURL };
}

