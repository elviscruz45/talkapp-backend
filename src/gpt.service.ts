import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import axios from 'axios';

@Injectable()
export class ChatService {
  private openai: OpenAI;
  private conversationHistory: {
    role: 'function' | 'user' | 'system' | 'assistant';
    content: string;
  }[] = [];

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chatWithGPT(content: string) {
    this.conversationHistory.push({
      role: 'user',
      content: content,
    });
    const chatCompletition = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Eres una asistente llamado Roby, el Husky',
        },
        ...(this.conversationHistory as any),
      ],
      model: 'gpt-3.5-turbo',
    });

    this.conversationHistory.push({
      role: 'assistant',
      content: chatCompletition.choices[0].message.content,
    });
    console.log(chatCompletition.choices[0].message.content);
    return chatCompletition.choices[0].message.content;
  }

  async chatPDF(content: string, sourceId: string) {
    try {
      const response = await axios.post(
        'https://api.chatpdf.com/v1/chats/message',
        {
          sourceId,
          messages: [
            {
              role: 'user',
              content: content,
            },
          ],
        },
        {
          headers: {
            'x-api-key': 'sec_CGNMZENbOBE46FZvWlGfmGCLoqy9vgiI', // Replace with your actual API key
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Roby, el Husky:', response.data.content);

      // setSchemaMarcoTeorico(response.data.content);
      //   console.log('sourceIdbbbb', sourceId);
      return response.data.content;
    } catch (error) {
      console.error('Error sending chat message:', error);
    }
  }
}
