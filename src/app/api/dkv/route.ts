import { NextRequest } from "next/server";
import { ifAllow } from "../../../lib/allow";
import { KV } from "../../../lib/store";
import { sha256 } from "../../../lib/sha256";

export async function GET(req: NextRequest) {

    const entries: any[] = await Array.fromAsync(KV.list({ prefix: [] }));

    // 遍历并打印所有条目
    let arr = []
    for (const entry of entries) {
        arr.push({ key: entry.key.join("|"), value: entry.value });
    }
    let flag = await ifAllow(req);
    let isDev = (await sha256(process.env.WHERE_RUN) === "6387af14bc70e6d146f6f0eaa2931b9fe793d2469bd4f40bf118ddd7fe9fb6fb");
    // console.log("haha", flag, isDev)
    // isDev = false;
    if (!flag && !isDev) {
        console.log(arr);
        arr = [];
    }
    return Response.json(arr);
}
