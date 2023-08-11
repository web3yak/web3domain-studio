// hooks/useDomainValidation.tsx
import { useState } from 'react';

function isValidDomainName(domainName: string): boolean {
  const dotCount = domainName.split('.').length - 1;
  if (dotCount > 1) return false;

  return (
    /^[a-z\d]([a-z\d-]*[a-z\d])?(\.[a-z\d]([a-z\d-]*[a-z\d])?)*$/i.test(domainName) &&
    /^.{1,253}$/.test(domainName) &&
    /^[^.]{1,63}(\.[^.]{1,63})*$/.test(domainName)
  );
}

export function useDomainValidation() {
  const [isValid, setIsValid] = useState(true);

  const validateDomain = (domainName: string) => {
    const isValidDomain = isValidDomainName(domainName);
    setIsValid(isValidDomain);
  };

  return {
    isValid,
    validateDomain,
  };
}
