import { Injectable } from '@nestjs/common';
// import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';

@Injectable()
export class TextToSpeechService {
  //   private client: TextToSpeechClient;
  private openai: OpenAI;
  private speechFile: any;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.speechFile = path.resolve('./speech.mp3');
  }

  async synthesizeSpeech(requestBody: any) {
    const mp3 = await this.openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: requestBody,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(this.speechFile, buffer);
    const base64 = buffer.toString('base64');
    return base64;
  }
  // // Save the file in the public directory
  // const fileName = `${Date.now()}.mp3`;
  // // Return the URL of the audio file
  // const fileUrl = `http://localhost:3000/public/${fileName}`;
  // return fileUrl;
  // const base64Audio = `data:audio/mpeg;base64,${buffer.toString('base64')}`;
  // return base64Audio;

  // const request = {
  // input: { text },
  // voice: { languageCode: "en-US", ssmlGender  : "NEUTRAL" },
  // audioConfig: { audioEncoding: "MP3" },
  // };
}
