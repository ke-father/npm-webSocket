//@ts-ignore
import { MyServer, Connection } from '../src/index.ts'
// @ts-ignore
import EventEmitter from "stream";

console.log('join server')

// 创建服务器
const server: EventEmitter & MyServer = new MyServer({
    port: 9999
})

server.on('connection', (ws: Connection) => {
    console.log('connection')
})

server.on('disconnection', (ws: Connection) => {
    console.log('disconnection')
})

server.setApi('testServer', (connection: Connection, data: any) => {
    console.log(data)
    connection.sendMsg('testServer', {
        success: true
    })
})

server.start()

console.log('server start')
