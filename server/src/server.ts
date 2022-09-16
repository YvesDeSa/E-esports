import express, { json } from "express";
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHoursStringToMinutes } from "./utils/covert-hours-string-to-minutes";
import { convertMinutesStringToHours } from "./utils/covert-minutes-string-to-hours";

const app = express();
const prisma = new PrismaClient();
app.use(express.json())
app.use(cors())

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games)
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const body = request.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hoursStart: convertHoursStringToMinutes(body.hoursStart),
      hoursEnd: convertHoursStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  return response.status(201).json(ad)
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hoursStart: true,
      hoursEnd: true,
      useVoiceChannel: true
    },
    where: {
      gameId,
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesStringToHours(ad.hoursStart),
      hoursEnd: convertMinutesStringToHours(ad.hoursEnd)
    }
  }))
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId,
    }
  })

  return response.json({
    discord: ad.discord
  })
});

app.listen(3333, () => {
  console.log('🚀 Started server in port 3333');
});