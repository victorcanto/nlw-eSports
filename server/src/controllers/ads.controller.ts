import { prismaClient } from '@database/prismaClient';
import { convertHourStringToMinutes } from '@utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from '@utils/convert-minutes-to-hour-string';

import { StatusCodes } from 'http-status-codes';

import { Request, Response } from 'express';

export class AdsController {
  public async getByGameId(request: Request, response: Response) {
    const gameId = request.params.id;

    const ads = await prismaClient.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const newAds = ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    });

    return response.status(StatusCodes.OK).json(newAds);
  }

  public async getDiscordById(request: Request, response: Response) {
    const adId = request.params.id;

    const ad = await prismaClient.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });

    return response.status(StatusCodes.OK).json({
      discord: ad.discord,
    });
  }

  public async createAdByGameId(request: Request, response: Response) {
    const gameId = request.params.id;
    const body = request.body;

    const ad = await prismaClient.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,
      },
    });

    return response.status(StatusCodes.CREATED).json({ ad });
  }
}
