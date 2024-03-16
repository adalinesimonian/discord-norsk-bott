import { Injectable } from '@nestjs/common';
import {
  Command,
  Handler,
  InteractionEvent,
  Param,
  ParamType,
} from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { type ChatInputCommandInteraction } from 'discord.js';
import { Language, TranslatorProvider } from '../providers';
import { ShowEveryoneParam } from '../utils';

export class NnnbCommandParams {
  @Param({
    name: 'tekst',
    description: 'Teksten du vil omsetja / The text you want to translate',
    type: ParamType.STRING,
    required: true,
  })
  text: string;

  @ShowEveryoneParam()
  sendToEveryone?: boolean;
}

/**
 * Translates text from Nynorsk to Bokmål.
 */
@Injectable()
@Command({
  name: 'nnnb',
  description:
    'Omset frå nynorsk til bokmål / Translate from Nynorsk to Bokmål',
})
export class NnnbCommand {
  constructor(private readonly translator: TranslatorProvider) {}

  /**
   * Handles the command.
   * @param interaction The interaction event.
   * @param params The command parameters.
   */
  @Handler()
  async handle(
    @InteractionEvent() interaction: ChatInputCommandInteraction,
    @InteractionEvent(SlashCommandPipe)
    { text, sendToEveryone }: NnnbCommandParams,
  ): Promise<void> {
    await this.translator.translate({
      interaction,
      from: Language.Nynorsk,
      to: Language.Bokmål,
      text,
      ephemeral: !sendToEveryone,
    });
  }
}
