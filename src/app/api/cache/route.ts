import { NextRequest } from "next/server";
import { dumpCacheStore } from "./cache";

export async function GET(req: NextRequest) {
    return Response.json(dumpCacheStore());
}
