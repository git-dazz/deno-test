import { GetCacheStoreValue, PutCacheStoreValue } from "../../cache";

type RouteParams = { params: Promise<{ key: string, value: string }> };
export async function GET(_request: Request, { params }: RouteParams) {
    const { key } = await params;
    const { value } = await params;
    PutCacheStoreValue(key, value);
    return Response.json({ key: key, value: GetCacheStoreValue(key) });
}


