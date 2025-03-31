import { useMutation } from "@tanstack/react-query";
import { getAccountInfo, processGameData } from "@/api/auth";
import { ErrorResponse, Result, SignResult } from "@/types";

function useGetAccountInfo() {
  return useMutation({
    mutationFn: (cookie: string) => processGameData(cookie),
  });
}

export { useGetAccountInfo };
