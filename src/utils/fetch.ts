import { toast } from "react-toastify";
import { FetchDataType } from "@/types/api-response";

export async function fetchWithToast<T>(
    endpoint: string,
    init: RequestInit = {},
    successMessage?: string,
): Promise<FetchDataType<T>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Send cookies
    ...init,
  });

  const result = await response.json();

  if (!response.ok) {
    let message: string = "خطای غیرمنتظره رخ داد.";
    if ("error" in result) {
      message = result.error;
    }
    toast.error(message);
    return { error: message };
  }

  if (successMessage) {
    toast.success(successMessage);
  }

  return { data: result.data };
}