import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const app = fastify()
const prisma = new PrismaClient()

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('🚀 Server is running on http://localhost:3333'))
