import { GetCacheStoreValue, PutCacheStoreValue } from "../cache";

type RouteParams = { params: Promise<{ key: string }> };
export async function GET(_request: Request, { params }: RouteParams) {
    const { key } = await params;
    return Response.json(GetCacheStoreValue(key));
}

// request: NextRequest,
export async function PUT(_request: Request, { params }: RouteParams) {
    //  更新
    const { key } = await params;
    const body = await _request.json();
    // console.log("body", body);
    PutCacheStoreValue(key, body);
    return Response.json(GetCacheStoreValue(key));
}
