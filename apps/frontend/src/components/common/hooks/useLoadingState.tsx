import React, { useState } from "react";

export default function useLoadingState() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return {
    isLoading,
    setIsLoading,
  };
}
