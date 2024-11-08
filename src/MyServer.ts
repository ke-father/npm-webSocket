import {WebSocketServer} from "ws";
import {Connection} from "./Connection.ts";
import { IModel } from "./common";
import EventEmitter from "stream";

export class MyServer extends EventEmitter{
    port: number
    wss: WebSocketServer = null!
    // 链接用户
    connections: Set<Connection> = new Set()
    ApiMap: Map<string, Function> = new Map()

    constructor({ port }: { port: number }) {
        super()

        this.port = port
    }

    start () {
        return new Promise((resolve, reject) => {
            this.wss = new WebSocketServer({
                port: this.port,
            })

            this.wss.on('listening', () => {
                resolve(true)
                console.log('服务启动')
            })

            this.wss.on('close', () => {
                reject(false)
                console.log('服务关闭')
            })

            this.wss.on('error', (e) => {
                reject(e)
                console.log('服务错误')
            })

            this.wss.on('connection', (ws) => {
                const connection = new Connection(this, ws)
                this.connections.add(connection)
                this.emit('connection', connection)


                connection.on('close', () => {
                    this.connections.delete(connection)
                    this.emit('disconnection', connection)
                })
            })
        })
    }

    setApi  (name: string, cb: (connection: Connection, args: any) => void) {
        this.ApiMap.set(name, cb)
    }
}
