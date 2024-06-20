import { Controller, Post, Body, Res } from '@nestjs/common';
import { TextToSpeechService } from './text-to-speech.service';
import { Response } from 'express';
import { ChatService } from './gpt.service';

@Controller('text-to-speech')
export class TextToSpeechController {
  constructor(
    private readonly textToSpeechService: TextToSpeechService,
    private readonly chatService: ChatService,
  ) {}

  @Post('synthesize')
  async synthesize(
    @Body() body: { text: string; sourceId: string },
    @Res() res: Response,
  ) {
    try {
      const { text, sourceId } = body;
      console.log('Pregunta:', text);
      console.log('----o------');

      //   const gptResponse = await this.chatService.chatWithGPT(text);
      const gptPDF = await this.chatService.chatPDF(text, sourceId);
      //   console.log('backend gptResponse', gptResponse);

      //   const audioContent =
      //     await this.textToSpeechService.synthesizeSpeech(gptResponse);
      const audioContent =
        await this.textToSpeechService.synthesizeSpeech(gptPDF);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.end(audioContent);
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  }
}
