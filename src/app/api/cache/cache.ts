let cacheDataStore = {}
let TimeBase = globalThis.SERVER_START_TIME;
export function PutCacheStoreValue(key, value) {
    if (`${value}`.length > 500) return;
    let t = ((Date.now() - TimeBase));
    cacheDataStore[key] = { v: value, t: t };
    let len = JSON.stringify(cacheDataStore).length;
    if (len < 10000) return;
    console.log("------------------------Clear Cache--------------------------");
    let arr = Object.keys(cacheDataStore).map(k => ({ k: k, t: cacheDataStore[k].t })).sort((a, b) => a.t - b.t);
    let aLen = arr.length;
    let aLenHalf = (aLen / 2) >> 0;
    console.log("arr", aLen, "->", aLenHalf, "\n",
        "    删除", arr[0].k, arr[aLenHalf - 1].k, "\n",
        "    保留", arr[aLenHalf].k, arr[aLen - 1]?.k
    )
    arr.length = aLenHalf
    arr.forEach(item => {
        delete cacheDataStore[item.k];
    });
}
export function GetCacheStoreValue(key) {
    return cacheDataStore[key]?.v ?? null;
}

export function dumpCacheStore() {
    return JSON.parse(JSON.stringify(cacheDataStore));
}
