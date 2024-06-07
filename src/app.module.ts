import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ChatRoomModule } from './chat-room/chat-room.module';

@Module({
  imports: [ChatModule, UsersModule, FirebaseModule, ChatRoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
