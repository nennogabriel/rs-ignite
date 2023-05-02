import fastify from 'fastify'

import fastifyCookie from '@fastify/cookie'
import { eatersRoutes } from '@/routes/eaters'
import { getEaterFromSessionId } from './middleware/get-eater-from-session-id'
import { mealsRoutes } from './routes/meals'

const app = fastify()

app.register(fastifyCookie)
app.addHook('preHandler', getEaterFromSessionId)
app.register(eatersRoutes, { prefix: '/eaters' })
app.register(mealsRoutes, { prefix: '/meals' })

export { app }
