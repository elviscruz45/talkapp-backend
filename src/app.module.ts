import { Module } from '@nestjs/common';

import { TextToSpeechController } from './text-to-speech.controller';
import { ChatController } from './gpt.controller';
import { TextToSpeechService } from './text-to-speech.service';
import { ChatService } from './gpt.service';

@Module({
  imports: [],
  controllers: [TextToSpeechController, ChatController],
  providers: [TextToSpeechService, ChatService],
})
export class AppModule {}
