import { useMutation } from "@tanstack/react-query";
import { processGameData } from "@/api/checkIn";

function useFetchGameData() {
  return useMutation({
    mutationFn: (cookie: string) => processGameData(cookie),
  });
}

export { useFetchGameData };
