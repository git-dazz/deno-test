// import { headers } from 'next/headers';
import { KV } from './store';
import { sha256 } from './sha256';
import { NextRequest } from 'next/server';
export async function ifAllow(req: NextRequest) {
    // console.log("Headers", req.headers)
    //  req.headers
    let token = req.headers.get("X-Token") || req.headers.get("x-token");
    // console.log("token", "|" + token + "|");

    let data: Record<string, string> = { auth: "", year: "", month: "", date: "" };
    data.auth = (await KV.get(["auth"]))?.value || "";
    let salt = (await KV.get(["salt"]))?.value || "";
    [data.year, data.month, data.date] = new Date().toISOString().split(/\D/);

    let result = salt;
    Object.keys(data).forEach(key => {
        result = result.replaceAll("{" + key + "}", data[key] || "");
    })

    result = await sha256(result || `不应该跑到这边;${Math.random()}`);
    if (token === result) {
        return true;
    }
    return false;
}