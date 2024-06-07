import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('message', data);
  }

  @SubscribeMessage('newUser')
  handleUser(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('user', data);
  }
}
