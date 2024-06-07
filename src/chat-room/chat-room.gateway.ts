import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { Server, Socket } from 'socket.io';
import { UserDto } from './dto/user.dto';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway(9001,{namespace:'/chat',cors:{origin:'*'}})
export class ChatRoomGateway {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newUser')
  handleUser(@MessageBody() data: UserDto) {
    console.log(data);
    this.server.emit('newUser', data);
  }

  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() mensajeDto: MessageDto) {
    console.log(mensajeDto);
    this.server.emit('newMessage',mensajeDto);
  }

  @SubscribeMessage('findAllChatRoom')
  findAll() {
    return this.chatRoomService.findAll();
  }

  @SubscribeMessage('findOneChatRoom')
  findOne(@MessageBody() id: number) {
    return this.chatRoomService.findOne(id);
  }

  @SubscribeMessage('updateChatRoom')
  update(@MessageBody() updateChatRoomDto: UpdateChatRoomDto) {
    return this.chatRoomService.update(updateChatRoomDto.id, updateChatRoomDto);
  }

  @SubscribeMessage('removeChatRoom')
  remove(@MessageBody() id: number) {
    return this.chatRoomService.remove(id);
  }

  handleConnection(client: Socket) {
    console.log(`cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`cliente desconectado: ${client.id}`);
  }
}
