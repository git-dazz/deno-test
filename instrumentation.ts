// 全局变量存储服务启动时间戳
declare global {
    var SERVER_START_TIME: number | undefined
}

export function register() {
    // 仅在 Node.js 运行时记录，排除 Edge 环境
    //   if (process.env.NEXT_RUNTIME === 'nodejs') {
    globalThis.SERVER_START_TIME = Date.now()
    console.log(`Server started at: ${new Date(SERVER_START_TIME).toISOString()}`)
    //   }
}
