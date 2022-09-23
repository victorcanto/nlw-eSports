import { prismaClient } from '@database/prismaClient';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class GamesController {
  public async getAll(_request: Request, response: Response) {
    const games = await prismaClient.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });
    return response.status(StatusCodes.OK).json(games);
  }
}
