import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";
import {Server, Socket} from "socket.io";

@WebSocketGateway(3001, {path: '/ws', namespace: '/metaSearch'})
export class MetaSearchGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private logger: Logger = new Logger('TravelApiGate');

    @WebSocketServer() wss: Server;

    afterInit(server: Server): any {
        this.logger.log('initialized ! OoO')
    }

    handleConnection(client: Socket, ...args: any[]): any {
        this.logger.log('Connected! client: ' + client.id)
    }

    handleDisconnect(client: Socket): any {
        this.logger.log('Disconnected! client: -' + client.id)
    }

    /*msg To everyt one*/
    @SubscribeMessage('msgToEveryOne')
    handleAllMessage(client: Socket, text: string) {
        this.wss.emit('msgToClient', text); //if we want to send the response to every one
    }

    @SubscribeMessage('msgToServer')
    // handleMessage(client: Socket, text: string,) {
    handleMessage(client: Socket, text: string): WsResponse<string> {
        // client.emit('msgToClient', text)
        return {event: 'msgToClient', data: text};
    }


}
