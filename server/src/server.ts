import express from 'express'
//proteger nosso back end de outros frontend
// import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMin } from './utils/convert-hour-string-to-min'
import { convertMinToHour } from './utils/convertMinToHour'
import cors from 'cors'
const app = express()
app.use(
  cors()
)

// make the express read the json body
app.use(express.json())
const prisma = new PrismaClient({
  log: ['query']
})
//HTTP methods / API RESTful / HTTP codes

// for database - Prisma and Sqlite

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
})

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
      hourStart: convertHourStringToMin(body.hourStart),
      hourEnd: convertHourStringToMin(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })
  return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(
    ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinToHour(ad.hourStart),
        hourEnd: convertMinToHour(ad.hourEnd)
      }
    })
  )
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })
  return response.json({
    discord: ad.discord
  })
})

app.listen(3000)
