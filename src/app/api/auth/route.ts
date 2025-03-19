import { NextResponse } from "next/server";
import { ApiResponseType } from "@/types/api-response";
import { removeAuthCookie, wrapWithTryCatch } from "@/utils/api";

export async function POST(): Promise<ApiResponseType<null>> {
  return wrapWithTryCatch(async () => {
    await removeAuthCookie();

    return NextResponse.json({ data: null }, { status: 200 });
  });
}
