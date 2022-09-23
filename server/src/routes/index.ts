import { AdsController } from '@controllers/ads.controller';
import { GamesController } from '@controllers/games.controller';
import { Router } from 'express';

const router = Router();

const adsController = new AdsController();
const gamesController = new GamesController();

router.get('/ads/:id/discord', adsController.getDiscordById);
router.get('/games/:id/ads', adsController.getByGameId);
router.post('/games/:id/ads', adsController.createAdByGameId);
router.get('/games', gamesController.getAll);

export default router;
