import fastify from 'fastify'

import fastifyCookie from '@fastify/cookie'
import { eatersRoutes } from '@/routes/eater'

const app = fastify()

app.register(fastifyCookie)
app.register(eatersRoutes, { prefix: '/eaters' })

export { app }
