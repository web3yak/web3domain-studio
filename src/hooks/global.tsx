import { useToast , UseToastOptions } from "@chakra-ui/react";

function useGlobal() {
  const toast = useToast();

  function showToast(title: string, description: string, status: UseToastOptions["status"]) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: false,
    });
  }

  return { showToast };
}

export default useGlobal;
